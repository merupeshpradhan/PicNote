import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();

// Frontend Connection Here
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import routes from start the website

// Error Handler

export { app };
