import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as path from "path";

import { connectToMongoDb } from "./mongodb/connect.js";
// import { checkAuthenticationCookie } from "./middlewares/auth.js";
import userRoutes from "./routes/userRoutes.js";


//configurations
const app = express();
dotenv.config();
const PORT = 8000;
const __dirname = path.resolve()

//MongoDB Connection
connectToMongoDb(process.env.MONGODB_URL)
    .then(() => console.log("Mongodb Connected Successfully"))
    .catch(() => console.log("Mongodb Connection error"))



//Middlewares
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(checkAuthenticationCookie("userToken"))
app.use(express.static(path.resolve('./public')))
app.use('/uploads', express.static(__dirname + '/uploads'))


//Home route
app.get('/', (req, res) => {
    res.status(200).send("Airbnb backend running")
})

//external routes
app.use('/', userRoutes)

// app.get('/profile', (req, res) => {
//     res.json("profile")
// })

app.listen(PORT, () => console.log("Server running on PORT: ", PORT))