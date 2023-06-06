const { log, error } = require('console')
const exp = require('constants')
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
})

userSchema.post("save", function (doc, next){
    console.log("New user has been made", doc);
    next();
})

userSchema.pre("save", async function (next){
    const pepper = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, pepper);
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password)

            if(auth){
                return user;
            }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}

const User = mongoose.model('user', userSchema);
module.exports = User;