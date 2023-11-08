import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number
}, { timestamps: true })

const PLACE = mongoose.model('places', PlaceSchema)

export default PLACE;