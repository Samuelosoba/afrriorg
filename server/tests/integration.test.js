import { v2 as cloudinary } from "cloudinary";
import { Writable } from "node:stream";
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import request from "supertest";
import session from "express-session";
import { createApp } from "../src/app.js";
import { Admin, Category, Donation, Enquiry } from "../src/models.js";
import { hashPassword } from "../src/auth.js";
import { validSignature } from "../src/payments.js";
let mongo, app;
const originalFetch = globalThis.fetch;
const origin = "http://localhost:5173";
before(async () => {
  process.env.CLIENT_URL = origin;
  process.env.SESSION_SECRET = "test-session-secret-at-least-32-characters";
  process.env.PAYSTACK_SECRET_KEY = "sk_test_fixture";
  process.env.PAYSTACK_CURRENCIES = "NGN,USD";
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await Promise.all([Admin.init(), Category.init(), Donation.init()]);
  app = createApp({ sessionStore: new session.MemoryStore() });
});
after(async () => {
  globalThis.fetch = originalFetch;
  await mongoose.disconnect();
  await mongo?.stop();
});
test("admin authentication, programme CRUD, publishing and enquiry inbox", async () => {
  await request(app).get("/api/admin/programmes").expect(401);
  await request(app).post("/api/admin/login").send({}).expect(403);
  await Admin.create({
    email: "admin@example.com",
    passwordHash: hashPassword("a-long-test-password"),
  });
  const agent = request.agent(app);
  await agent
    .post("/api/admin/login")
    .set("Origin", origin)
    .send({ email: "admin@example.com", password: "wrong" })
    .expect(401);
  await agent
    .post("/api/admin/login")
    .set("Origin", origin)
    .send({ email: "admin@example.com", password: "a-long-test-password" })
    .expect(200);
  const input = {
    title: "Education",
    slug: "education",
    intro: "Intro",
    description: "Description",
    image: "/seed-assets/afriihero.webp",
    published: false,
    order: 0,
    programs: [
      {
        slug: "summer-school",
        title: "Summer School",
        summary: "Summary",
        paragraphs: ["Some text"],
        sections: [{ heading: "Centre history", text: "First paragraph.\n\nSecond paragraph.", items: ["Library"] }],
        photos: [{ src: "/programmes/crc/01.jpg", alt: "Centre corridor" }],
        published: true,
      },
    ],
  };
  const created = await agent
    .post("/api/admin/programmes")
    .set("Origin", origin)
    .send(input)
    .expect(201);
  assert.equal(
    (await request(app).get("/api/programmes")).body.categories.length,
    0,
  );
  const published = await agent
    .put("/api/admin/programmes/" + created.body._id)
    .set("Origin", origin)
    .send({ ...input, published: true, __v: 0 })
    .expect(200);
  const publicProgram = (await request(app).get("/api/programmes")).body.categories[0].programs[0];
  assert.equal(publicProgram.sections[0].text, input.programs[0].sections[0].text);
  assert.deepEqual(publicProgram.sections[0].items, ["Library"]);
  assert.equal(publicProgram.photos[0].src, "/programmes/crc/01.jpg");
  assert.equal(
    (await request(app).get("/api/programmes")).body.categories[0].programs[0]
      .title,
    "Summer School",
  );
  await agent
    .put("/api/admin/programmes/" + created.body._id)
    .set("Origin", origin)
    .send({ ...input, __v: 0 })
    .expect(409);
  await agent
    .post("/api/admin/uploads")
    .set("Origin", origin)
    .attach("file", Buffer.from("not an image"), "image.jpg")
    .expect(400);
  const originalUpload = cloudinary.uploader.upload_stream;
  process.env.CLOUDINARY_API_SECRET = "test-fixture";
  try {
    cloudinary.uploader.upload_stream = (options, callback) =>
      new Writable({
        write(chunk, encoding, next) {
          next();
        },
        final(done) {
          callback(null, {
            secure_url: "https://res.cloudinary.com/test/image/upload/test.png",
            public_id: "test",
          });
          done();
        },
      });
    const uploaded = await agent
      .post("/api/admin/uploads")
      .set("Origin", origin)
      .attach(
        "file",
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        "test.png",
      )
      .expect(201);
    assert.ok(uploaded.body.url.startsWith("https://res.cloudinary.com/"));
    await agent
      .post("/api/admin/uploads")
      .set("Origin", origin)
      .attach("file", Buffer.from("not a real image"), "test.png")
      .expect(400);
  } finally {
    cloudinary.uploader.upload_stream = originalUpload;
    delete process.env.CLOUDINARY_API_SECRET;
  }
  await request(app)
    .post("/api/enquiries")
    .set("Origin", origin)
    .send({
      kind: "contact",
      name: "Sender",
      email: "sender@example.com",
      message: "A saved test enquiry",
      consent: true,
    })
    .expect(201);
  assert.equal(await Enquiry.countDocuments(), 1);
  assert.equal(
    (await agent.get("/api/admin/enquiries")).body.enquiries.length,
    1,
  );
  await agent
    .delete("/api/admin/programmes/" + created.body._id)
    .set("Origin", origin)
    .send({ __v: published.body.__v })
    .expect(200);
  await agent
    .post("/api/admin/logout")
    .set("Origin", origin)
    .send({})
    .expect(200);
  await agent.get("/api/admin/revenue").expect(401);
});
test("checkout retries, signed webhook replays and currency-safe revenue", async () => {
  let initializations = 0;
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/initialize")) {
      initializations++;
      const body = JSON.parse(options.body);
      assert.equal(body.amount, 2000);
      assert.equal(body.currency, "USD");
      return {
        ok: true,
        json: async () => ({
          status: true,
          data: { authorization_url: "https://checkout.paystack.com/fixture" },
        }),
      };
    }
    const reference = url.split("/").pop();
    const d = await Donation.findOne({ reference });
    return {
      ok: true,
      json: async () => ({
        status: true,
        data: {
          id: 123,
          reference,
          amount: d.amount,
          currency: d.currency,
          domain: "test",
          status: "success",
          customer: { email: d.email },
          fees: 50,
          paid_at: new Date().toISOString(),
        },
      }),
    };
  };
  const payload = {
    action: "initialize",
    name: "Donor",
    email: "donor@example.com",
    amount: "20.00",
    currency: "USD",
    consent: true,
    idempotencyKey: randomUUID(),
  };
  const responses = await Promise.all([
    request(app).post("/api/donations").set("Origin", origin).send(payload),
    request(app).post("/api/donations").set("Origin", origin).send(payload),
  ]);
  assert.ok(responses.every((r) => [200, 409].includes(r.status)));
  assert.equal(initializations, 1);
  assert.equal(await Donation.countDocuments(), 1);
  const retry = await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send(payload)
    .expect(200);
  const reference = retry.body.reference;
  await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send({ ...payload, amount: "30" })
    .expect(409);
  const body = JSON.stringify({ event: "charge.success", data: { reference } }),
    signature = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(body)
      .digest("hex");
  assert.equal(
    validSignature(Buffer.from(body), "bad", process.env.PAYSTACK_SECRET_KEY),
    false,
  );
  await request(app)
    .post("/api/webhooks/paystack")
    .set("Content-Type", "application/json")
    .send(body)
    .expect(401);
  const hooks = await Promise.all(
    Array.from({ length: 4 }, () =>
      request(app)
        .post("/api/webhooks/paystack")
        .set("Content-Type", "application/json")
        .set("x-paystack-signature", signature)
        .send(body),
    ),
  );
  assert.ok(hooks.every((r) => r.status === 200));
  assert.equal(await Donation.countDocuments({ status: "success" }), 1);
  const verify = await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send({ action: "verify", reference })
    .expect(200);
  assert.equal(verify.body.currency, "USD");
  assert.equal(verify.body.verified, true);
  const agent = request.agent(app);
  await agent
    .post("/api/admin/login")
    .set("Origin", origin)
    .send({ email: "admin@example.com", password: "a-long-test-password" })
    .expect(200);
  const revenue = await agent.get("/api/admin/revenue?mode=test").expect(200);
  assert.equal(revenue.body.totals[0].amount, 2000);
  assert.equal(revenue.body.totals[0].count, 1);
  assert.equal(
    (await agent.get("/api/admin/revenue?mode=live")).body.totals.length,
    0,
  );
});
test("mismatched and failed payments never contribute to revenue", async () => {
  const d = await Donation.create({
    reference: "afrii-" + randomUUID(),
    idempotencyKey: randomUUID(),
    name: "Donor",
    email: "donor@example.com",
    amount: 5000,
    currency: "NGN",
    mode: "test",
    status: "pending",
  });
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      status: true,
      data: {
        reference: d.reference,
        amount: 1,
        currency: "NGN",
        domain: "test",
        status: "success",
        customer: { email: d.email },
      },
    }),
  });
  await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send({ action: "verify", reference: d.reference })
    .expect(409);
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      status: true,
      data: {
        reference: d.reference,
        amount: 5000,
        currency: "NGN",
        domain: "test",
        status: "failed",
        customer: { email: d.email },
      },
    }),
  });
  const failed = await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send({ action: "verify", reference: d.reference })
    .expect(200);
  assert.equal(failed.body.verified, false);
  assert.equal((await Donation.findById(d._id)).status, "failed");
  await request(app)
    .post("/api/donations")
    .set("Origin", origin)
    .send({
      action: "initialize",
      name: "Donor",
      email: "donor@example.com",
      amount: "2",
      currency: "EUR",
      consent: true,
      idempotencyKey: randomUUID(),
    })
    .expect(400);
});

test('article publishing, media editing and optimistic version checks',async()=>{
 const agent=request.agent(app);await agent.post('/api/admin/login').set('Origin',origin).send({email:'admin@example.com',password:'a-long-test-password'}).expect(200);
 const body={year:'2027',title:'A summer of learning',subtitle:'Article introduction',image:'/seed-assets/afriihero.webp',caption:'Photo attribution',verified:true,published:false,sections:[{heading:'Our activities',text:'A complete article section.'}],photos:[{src:'https://res.cloudinary.com/demo/image/upload/sample.jpg',alt:'Students learning together'}],videos:[{title:'Highlights',url:'https://www.youtube.com/watch?v=M7lc1UVf-VE'}],reports:[{title:'Annual report',url:'https://example.com/report.pdf',year:'2027'}]};
 await request(app).post('/api/admin/stories').set('Origin',origin).send(body).expect(401);
 const created=await agent.post('/api/admin/stories').set('Origin',origin).send(body).expect(201);
 assert.equal((await request(app).get('/api/stories')).body.stories.length,0);
 const published=await agent.put('/api/admin/stories/'+created.body._id).set('Origin',origin).send({...body,published:true,__v:0}).expect(200);
 const articles=(await request(app).get('/api/stories')).body.stories;assert.equal(articles[0].photos.length,1);assert.equal(articles[0].videos[0].title,'Highlights');assert.equal(articles[0].reports[0].year,'2027');
 await agent.put('/api/admin/stories/'+created.body._id).set('Origin',origin).send({...body,__v:0}).expect(409);
 await agent.delete('/api/admin/stories/'+created.body._id).set('Origin',origin).send({__v:published.body.__v}).expect(200);
 assert.equal((await request(app).get('/api/stories')).body.stories.length,0);
});

test('PDF uploads and same-origin range delivery work without Cloudinary',async()=>{
 const agent=request.agent(app);await agent.post('/api/admin/login').set('Origin',origin).send({email:'admin@example.com',password:'a-long-test-password'}).expect(200);
 const bytes=Buffer.from('%PDF-1.4\nA report fixture\n%%EOF');
 const uploaded=await agent.post('/api/admin/uploads').set('Origin',origin).attach('file',bytes,'annual-report.pdf').expect(201);
 assert.equal(uploaded.body.storage,'mongodb');assert.match(uploaded.body.url,/^\/api\/reports\/[a-f0-9]{24}$/);
 const again=await agent.post('/api/admin/uploads').set('Origin',origin).attach('file',bytes,'annual-report.pdf').expect(201);assert.equal(again.body.url,uploaded.body.url);
 const head=await request(app).head(uploaded.body.url).expect(200);assert.equal(head.headers['content-type'],'application/pdf');assert.equal(Number(head.headers['content-length']),bytes.length);
 const range=await request(app).get(uploaded.body.url).set('Range','bytes=0-4').expect(206);assert.equal(range.headers['content-range'],'bytes 0-4/'+bytes.length);assert.equal(range.body.toString(),'%PDF-');
 await request(app).get(uploaded.body.url).set('Range','bytes=999999-').expect(416);
 await request(app).get('/api/reports/not-an-id').expect(404);
});

