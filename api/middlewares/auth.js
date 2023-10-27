import { validateToken } from "../utils/auth.js";

export const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload

        } catch (error) {
            console.log("Authentication check error", error)

        } return next();


    }
}

