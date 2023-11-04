import express from "express";
import USER from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import * as path from "path";

const __dirname = path.resolve()


const router = express.Router();
const app = express();

app.use(cookieParser())

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
    const { email, password } = req.body;

    try {
        const user = await USER.findOne({ email });
        // console.log("User data==>", user)

        if (user) {
            const matchPassword = bcrypt.compareSync(password, user.password);

            if (matchPassword) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImageUrl: user.profileImageUrl,
                    verified: user.verified
                };

                jwt.sign(payload, secretKey, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie("userToken", token).json(user);
                });
            } else {
                // Incorrect password or email, send a generic error response
                res.status(401).json({ error: "Incorrect email or password" });
            }
        } else {
            // User not found or incorrect email, send a generic error response
            res.status(401).json({ error: "Incorrect email or password" });
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/profile", async (req, res) => {
    const { userToken } = req.cookies;
    // console.log("My token======>", userToken)

    if (userToken) {
        jwt.verify(userToken, secretKey, {}, async (err, user) => {
            if (err) throw err;
            const userDoc = await USER.findById(user._id)
                .select("name email profileImageUrl _id")
                .exec();

            console.log("user profile==>", userDoc)
            res.json(userDoc)

        })
    } else {
        res.json(null)
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("userToken").json("logged out")
})

console.log({ __dirname })

router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body
    const fileName = `image-${Date.now()}.jpg`
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + fileName
    });
    res.json(fileName)

})



export default router;