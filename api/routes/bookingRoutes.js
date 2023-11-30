import express from 'express';
import BOOKING from '../models/booking.js';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

router.post('/bookings', async (req, res) => {
    const { bookingFormData, price, _id } = req.body
    try {
        const bookingDoc = await BOOKING.create({
            place: _id,
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
    const { userToken } = req.cookies
    jwt.verify(userToken, secretKey, {}, async(err, bookingData) => {
        const { _id } = bookingData;
        const bookingDoc = await BOOKING.find({ place: _id })
        res.json(bookingDoc)
    })

})

export default router;