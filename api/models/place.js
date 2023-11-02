import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    title: String,
    address: String,
    photos: String,
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
}, { timestamps: true })

const PLACE = mongoose.model('places', PlaceSchema)

export default PLACE;