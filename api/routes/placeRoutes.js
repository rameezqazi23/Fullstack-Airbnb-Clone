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
            price: formData.price,
            owner: userData._id,

        })

        res.json(placeDoc)

    })

})

router.get('/places', async (req, res) => {
    try {
        const { userToken } = req.cookies;

        if (!userToken) {
            return res.status(401).json({ error: 'JWT must be provided' });
        }
        jwt.verify(userToken, secretKey, {}, async (err, userData) => {
            if (err) throw err;

            // Check if userData is defined before destructuring
            if (userData && userData._id) {
                const { _id } = userData;
                const placeDoc = await PLACE.find({ owner: _id });

                res.json(placeDoc);
            } else {
                res.status(400).json({ error: "User data or user ID not available" });
            }
        });
    } catch (error) {
        console.log(error.message)
    }


});


router.get('/place-page/:id', async (req, res) => {
    const place = await PLACE.findById(req.params.id)
        .populate("owner", ['name', 'email'])
    res.json(place)
})

router.get('/all-places', async (req, res) => {
    const allPlaces = await PLACE.find({})
    res.json(allPlaces)
})

export default router;