# Africa-RII backend and admin

The root `server/` is the Node.js/Express API. MongoDB stores categories with
nested programmes, admin accounts, sessions, enquiries and donation records.
Cloudinary stores uploaded images; MongoDB GridFS stores uploaded PDFs. The admin dashboard is `/admin`.
There is no public admin registration or default password.

## Local setup (Node.js 22+)

1. Install dependencies: `npm install --prefix server` and `npm install --prefix client`.
2. Copy `server/.env.example` to `server/.env` and configure MongoDB and services.
3. Generate SESSION_SECRET with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
4. Set CLIENT_URL to `http://localhost:5173` (no trailing slash).
5. From `server`, run `npm run seed` to import the existing five categories and
   their programmes. Existing categories are never overwritten by the seed.
6. Set ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 12 characters, run
   `npm run admin:create`, then remove ADMIN_PASSWORD from the environment file.
7. Run `npm run dev` in `server`, and `npm run dev` in `client` in another terminal.
8. Open `http://localhost:5173/admin` and sign in.

No MongoDB account, Cloudinary credentials or Paystack account is created by this
code. Use your own local MongoDB or Atlas connection string.

## Content management

The editor matches the website template: category title, slug, introduction,
full description, image, display order and publishing status; nested programme
title, slug, summary, paragraphs, optional image/source, YouTube videos and PDF
reports. Uploads are authenticated and checked for supported file signatures.
Images are limited to 8 MB; PDFs are limited to 25 MB. PDFs stream through
`/api/reports/:id`, with byte-range support, without depending on Cloudinary PDF
delivery settings. Identical PDF uploads reuse the existing stored file. Removing a content reference does not delete the underlying asset.

Changes to published records appear immediately in the admin's website view;
other open website tabs refresh content every minute or on reload. The bundled
content remains a fallback if the API cannot be reached. Summer School journals are managed under Admin > Articles. Edit each year's title, introduction, sections, cover, photo gallery and captions, YouTube videos,
PDF reports, verification and publishing status. Category, programme and article media
are stored in MongoDB. The original bundled data is used only if the API is unavailable.

Editors use version checks to prevent overwriting another session's changes.
Changing a slug changes its URL; existing shared URLs are not automatically redirected.

## Donations and currency

Set PAYSTACK_SECRET_KEY to a test key first. PAYSTACK_CURRENCIES lists only the
currencies activated on that account, e.g. `NGN` or `NGN,USD` for an eligible
Nigerian account. Paystack supports NGN, USD, GHS, ZAR, KES and XOF in specific
markets; it cannot charge arbitrary currencies such as EUR or GBP on a Nigerian
account. International card issuers may convert from the donor's home currency.
No exchange rates or currency conversions are invented by the application.

The API validates amounts, stores an intended donation and uses a unique
idempotency key plus a unique provider reference. Repeated submissions reuse the
same checkout. A browser session retains its request key across reloads. A new
browser/session or changed donation details are a distinct donation request.

Configure this webhook in Paystack:

    https://YOUR-SITE/api/webhooks/paystack

The raw request body is authenticated using HMAC SHA512. For charge.success,
the server independently verifies status, reference, amount, currency, customer
email and test/live mode, then atomically updates the matching donation. Replays
and concurrent callbacks do not add another revenue entry. Unknown references
are acknowledged without creating donations. Provider or database failures return
an error so Paystack can retry. The browser return endpoint uses the same logic.

An initialization timeout is deliberately not retried with a different reference:
the request may already exist at Paystack. Keep its reference and use **Check
Paystack** in the admin revenue view, or review it in Paystack before starting a
new donation. Webhooks cannot prevent every bank/card failure or intentional
separate donation; they prevent duplicate bookkeeping and unverified success.

Revenue shows gross verified donations and reported fees per currency, with
live and test records separate. It is not a settlement/refund accounting ledger.
Refunds/disputes must be reconciled in Paystack; this version does not automate them.

## Enquiries

Contact, Volunteer and Partner forms save to MongoDB and appear in the admin
inbox. Admins can mark them new, in progress or closed. No external email service
is needed for delivery into the dashboard. The public confirmation means the
message was saved successfully, not that an email was delivered.

## Production

Build the frontend (`npm run build --prefix client`). Run the server with
NODE_ENV=production and the configured environment variables; it serves
client/dist as well as /api. Use HTTPS with CLIENT_URL set to that same public
origin. Cookies are HttpOnly, Secure in production, SameSite=Lax and sessions
expire after eight hours. Unsafe API methods check the request Origin.

The production trust-proxy setting assumes one trusted reverse proxy. Configure
it for your actual infrastructure. For multiple instances, use a shared rate-limit
store or edge rate limits; the default request limits are per process. Sessions
are already shared through MongoDB. Restrict MongoDB network access and back up data.

A static-only Vercel deployment of client is insufficient. Host this Express
server and serve the built client from it, or configure a same-origin reverse
proxy for /api. The previous client/api serverless handlers have been retired.
Do not put backend secrets in VITE_ variables. No secrets are committed.

## Tests

`npm test --prefix server` runs integration tests using an isolated temporary
MongoDB instance and mocked Paystack requests. The first run downloads MongoDB;
it does not use your production database. `npm run lint --prefix client` and
`npm run build --prefix client` check the frontend. No live payments are made.

References: https://paystack.com/docs/payments/webhooks/,
https://paystack.com/docs/api/#supported-currency,
https://cloudinary.com/documentation/node_image_and_video_upload

Use `npm run check:connections` from server to check MongoDB and Cloudinary without
printing credentials. MONGODB_DB defaults to `afrii`, so collections and sessions
use an explicit database name even when the Atlas URI omits one.

For tests, an installed mongod can be selected with MONGOMS_SYSTEM_BINARY instead
of downloading a new copy. Windows MongoDB requires its Microsoft Visual C++ runtime.

## Summer School articles

Run `npm run seed` after this update to import the existing 2019?2026
journals without overwriting edited records. Restart the API after code changes.
Open `/admin`, choose **Articles**, and edit or create an edition. Unpublished
articles are hidden from public listings and article routes. Verification is
separate from publishing: only mark year-specific claims and photographs as
verified after checking them. Photo descriptions provide accessible image text.
You can reorder photos, add/remove article sections, and upload images to Cloudinary and PDFs to MongoDB GridFS. Save article applies the changes and refreshes the public content.

## Imported 2019?2024 report

The supplied 25-page report is bundled under `client/public/reports/2019-2024/`,
alongside six year extracts and 35 original photographs. The articles include
editable figures, narrative sections, photo collages and PDF links. The preview
uses a responsive PDF.js page viewer with an Open PDF option.

`npm run import:summer-report` imports the curated source in
`scripts/report-2019-2024.content.json` into MongoDB and uploads photographs to
Cloudinary. It backs up content in ignored `.backups/` first. Rerunning replaces
2019?2024 article text and photos; existing videos and 2025?2026 records are
preserved. Use the admin editor for subsequent editorial changes.

Source pages: 2019 pp. 5?6; 2020 pp. 7?8; 2021 pp. 9?10; 2022 pp. 11?14;
2023 pp. 15?17; 2024 pp. 18?21. The 2020 chapter concerns resource centre
development, including its early-2021 opening; 2024 explicitly records a Summer
School pause. Repeated 2019 dates in later editions and inconsistent euro
equivalents are not reproduced as facts. The 2022 workshop duration discrepancy
is identified in its article. Funding goals are distinguished from donations;
exam participation is not described as a pass rate. Student beneficiary names
are omitted in favour of aggregate figures. No video links occur in the PDF;
add confirmed year-specific YouTube links under Admin > Articles.

## CRC source import

The CRC programme uses the text and 30 photographs from
https://africarii.org/community-centre/ (the destination of the supplied Google
share link). Source image URLs are recorded in
`client/public/programmes/crc/source.json`. The gallery is not assigned to
individual years because the source does not provide year-specific captions.
Programme wording and figures are retained; internal instructions about partner
logos and the unfinished donor-list note are omitted.

Edit the content in Admin > Programmes > Community Resource Centre > CRC.
Article sections, list items and gallery images/descriptions are editable.
`node --env-file=server/.env server/scripts/import-crc.js` from the repository root
reimports the bundled `client/src/data/crcContent.json`, backing up the category
first and preserving other programmes, existing videos/reports and publishing status.
Reimporting replaces CRC article text and photos, so use the admin for later edits.
