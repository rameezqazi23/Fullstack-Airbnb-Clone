import express from "express";
import USER from "../models/user.js";
const router = express.Router();


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    // res.status(200).json("Signup Process")
    try {
        const userDoc = await USER.create({
            name,
            email,
            password
        })


        res.json(userDoc)

    } catch (error) {
        console.log("User creation errro", error.message)
        res.status(400).json(error.message)

    }
})




export default router;