import express from "express";
const router = express.Router();


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body
    // res.status(200).json("Signup Process")
    res.json({ name, email, password })
})

export default router;