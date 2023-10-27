import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = "&&^&*%R$WEFCFGR%^CD%$^#%&^TV";

export const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        verified: user.verified
    }

    const token = jwt.sign(payload, secretKey)
    console.log("Token data==>", token)
    return token;

}

export const validateToken = (token) => {
    if (!token) throw new Error("Unverified Token");

    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return console.log("Token validation error", error)

    }

}

