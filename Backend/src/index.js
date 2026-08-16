import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./database/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\n Server is runinig at PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Faild", error);
  });

// import mongoose from "mongoose";
// const mongoURI =
//   "mongodb+srv://PicNote:Rupesh7327@picnote.nc20oz8.mongodb.net/PicNote?retryWrites=true&w=majority";
// const mongoURI = `mongodb://localhost:27017/picnote`;
// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// async function test() {
//   try {
//     console.log("Connecting...");

//     await mongoose.connect(mongoURI, {
//       serverSelectionTimeoutMS: 10000,
//       connectTimeoutMS: 10000,
//       socketTimeoutMS: 10000,
//       family: 4, // ✅ force IPv4 (IMPORTANT)
//     });

//     console.log("✅ Mongo Connected Successfully (Node)");

//     await mongoose.disconnect();
//     process.exit(0);
//   } catch (err) {
//     console.log("❌ Mongo Connection Failed (Node)");
//     console.log(err);
//     process.exit(1);
//   }
// }

// test();
