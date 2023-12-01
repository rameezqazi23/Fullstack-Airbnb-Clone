import { mongoose } from 'mongoose';
const BookingScheme = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'places',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true,
    },
    noOfGuests: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cellPhone: {
        type: Number,
        required: true
    },
    price: Number
}, { timestamps: true })

const BOOKING = mongoose.model('bookings', BookingScheme)

export default BOOKING;