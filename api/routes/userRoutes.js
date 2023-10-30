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
        console.log("User creation error", error.message)
        res.status(400).json(error)

    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    const userDoc = await USER.findOne({ email })


    try {
        const token = await USER.matchPassword(email, password)
        res.cookie("userToken", token).json(userDoc)


    } catch (error) {
        console.log("Login Error", error)
        res.json(error)
    }


})

router.get("/profile", (req, res) => {
    const { token } = req.cookies;
    res.json({ token })
})





export default router;