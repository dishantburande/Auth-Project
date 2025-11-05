import express from "express";

import ConnectDB from "./config/db.js";

ConnectDB()

const app = express()

app.use(express.json())

const PORT = 8000;
app.listen( PORT , ()=> console.log(`Server Running on ${PORT} `))