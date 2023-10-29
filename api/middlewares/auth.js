import USER from "../models/user.js";
import { validateToken } from "../utils/auth.js";

export const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]

        console.log("Token cookie value====>", tokenCookieValue)

        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;

        } catch (error) {
            console.log(error.message)

        }
        return next();

    }

}
