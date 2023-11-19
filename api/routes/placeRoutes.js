import express from "express";
import PLACE from "../models/place.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const router = express();
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

router.post('/places', (req, res) => {
    const { formData } = req.body;
    const { userToken } = req.cookies;

    jwt.verify(userToken, secretKey, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await PLACE.create({
            title: formData.title,
            address: formData.address,
            photos: formData.photos,
            description: formData.description,
            perks: formData.perks,
            extraInfo: formData.extraInfo,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            maxGuests: formData.maxGuests,
            owner: userData._id,
        })

        res.json(placeDoc)

    })

})

router.get('/places', (req, res) => {
    const { userToken } = req.cookies;
    jwt.verify(userToken, secretKey, {}, async (err, userData) => {
        const { _id } = userData;
        const placeDoc = await PLACE.find({ owner: _id })
        res.json(placeDoc)
    })
})

router.get('/place-page/:id', async (req, res) => {
    const place = await PLACE.findById(req.params.id)
    res.json(place)
})

export default router;