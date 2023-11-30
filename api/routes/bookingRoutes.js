import express from 'express';
import BOOKING from '../models/booking.js';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

//Middleware Function Getting user data from token
const getUserFromToken = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.userToken, secretKey, {}, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
}


//booking routes
router.post('/bookings', async (req, res) => {
    const { bookingFormData, price, _id } = req.body
    const userData = await getUserFromToken(req)
    try {
        const bookingDoc = await BOOKING.create({
            place: _id,
            user: userData._id,
            checkIn: bookingFormData.checkIn,
            checkOut: bookingFormData.checkOut,
            noOfGuests: bookingFormData.noOfGuests,
            name: bookingFormData.name,
            cellPhone: bookingFormData.cellPhone,
            price,
        })
        res.json(bookingDoc)
    } catch (error) {
        console.log("Place booking error", error.message)
        res.status(400).json(error)

    }
})



router.get('/bookings', async (req, res) => {
    const userData = await getUserFromToken(req)
    const bookingDoc = await BOOKING.find({ user: userData._id })
    res.json(bookingDoc)
})

export default router;