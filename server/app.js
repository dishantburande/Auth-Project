import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

import ConnectDB from "./config/db.js";

ConnectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server Running on ${PORT} `));
