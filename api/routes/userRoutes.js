import express from "express";
import USER from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();
const app = express();

const salt = bcrypt.genSaltSync(10); //generate encrypted key for 10 rounds
const secretKey = "&&^&*%R$WEFCFGR%^CD%$^#%&^TV";

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    // res.status(200).json("Signup Process")
    try {
        const userDoc = await USER.create({
            name,
            email,
            salt: salt,
            password: bcrypt.hashSync(password, salt)
        })

        res.json(userDoc)

    } catch (error) {
        console.log("User creation error", error.message)
        res.status(400).json(error)

    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body

    const user = await USER.findOne({ email })

    if (user) {
        const matchPassword = bcrypt.compareSync(password, user.password)
        if (matchPassword) {
            const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                verified: user.verified
            }
            jwt.sign(payload, secretKey, {}, (err, token) => {
                if (err) throw err;
                res.cookie("userToken", token).json(user)
            })
        } else {
            res.status(422).json("Incorrect Password")
        }

    } else {
        res.json("User not found!!")
    }


})

router.get("/profile", (req, res) => {
    const { token } = req.cookies;
    res.json({ token })
})

router.post("/logout", (req, res) => {
    res.clearCookie("userToken")
})





export default router;