import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    profileImageUrl: {
        type: String,
        default: '/public/images/avatar.png'
    },


}, { timestamps: true })

const USER = mongoose.model('users', UserSchema)

export default USER;