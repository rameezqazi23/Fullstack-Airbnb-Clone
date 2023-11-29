import express from 'express';
import BOOKING from '../models/booking.js';
const router = express.Router();

router.post('/booking', async (req, res) => {
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

export default router;