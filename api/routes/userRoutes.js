import express from "express";
import USER from "../models/user.js";
const router = express.Router();


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    // res.status(200).json("Signup Process")
    const userDoc = await USER.create({
        name,
        email,
        password
    })


    res.json(userDoc)
})

export default router;