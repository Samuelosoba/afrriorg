import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
try {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "afrii",
    serverSelectionTimeoutMS: 5000,
  });
  await mongoose.connection.db.admin().ping();
  console.log("Configured MongoDB: reachable.");
} catch {
  process.exitCode=1;
  console.log(
    "Configured MongoDB: connection could not be established. Check the URI, credentials and Atlas network access.",
  );
} finally {
  await mongoose.disconnect();
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
try {
  await cloudinary.api.ping({ timeout: 10000 });
  console.log("Configured Cloudinary: authenticated.");
} catch {
  process.exitCode=1;
  console.log(
    "Configured Cloudinary: could not authenticate or reach the service.",
  );
}
