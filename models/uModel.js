const { log } = require('console')
const exp = require('constants')
const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlenght: [6, "Password must be at least 6 characters"]
    }
})

userSchema.post("save", function (doc, next){
    console.log("New user has been made", doc);
})


const User = mongoose.model('user', userSchema);
module.exports = User;