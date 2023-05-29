const exp = require('constants')
const mongoose = require('mongoose')
const { stringify } = require('querystring')

const userSchema = new mongoose.Schema({
    email: {
        type: string,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        string: string,
        required: true,
        unique: true,
    },
    password: {
        required: true,
        minlenght: 6
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;