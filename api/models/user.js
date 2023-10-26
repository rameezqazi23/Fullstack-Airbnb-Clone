import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";

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
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    profileImageUrl: {
        type: String,
        default: '/public/images/avatar.png'
    },


}, { timestamps: true })

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return

    const salt = randomBytes(16).toString(); //this actually generate a random key

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;

    next();

})

const USER = mongoose.model('users', UserSchema)

export default USER;