import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = "&&^&*%R$WEFCFGR%^CD%$^#%&^TV";

const createTokenForUser = (user) => {
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

const validateToken = (token) => {
    if (!token) throw new Error("Unverified Token");
    // if (!token) return null

    try {
        return jwt.verify(JSON.stringify(token), secretKey)

    } catch (error) {
        console.log("my token========>", token)
        return console.log("Token validation error", error)

    }

}

export {
    createTokenForUser,
    validateToken
}

