import { validateToken } from "../utils/auth.js";

export const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue =  req.cookies[cookieName]

        console.log("test", tokenCookieValue)

        if (!tokenCookieValue) {
            // res.status(500).json("Token cookie value error", tokenCookieValue)
            return next();
        }

        try {
            console.log("Token cookie value==>", tokenCookieValue)
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload

        } catch (error) {
            console.log("Authentication check error", error)

        }


        return next();

    }
}

