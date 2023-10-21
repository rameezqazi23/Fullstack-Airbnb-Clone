import express from "express";
import { connectToMongoDb } from "./mongodb/connect.js";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();

const PORT = 8000;

//MongoDB Connection
connectToMongoDb(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb Connected Successfully"))
    .catch(() => console.log("Mongodb Connection error"))


app.get('/', (req, res) => {
    res.status(200).send("Air bnb Backend running")
})

app.listen(PORT, () => console.log("Server running on PORT: ", PORT))