const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const uri = `mongodb+srv://CRUDuser:NxsOh8j8F4Fom4GC@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`
//mongodb+srv://<username>:<password>@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "general" }, )
const client = new MongoClient(uri)

//MODELS
const User = require('../models/Users')

//Erorr Handlers 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""};

    //incorrect email
    if(err.message === "incorrect email"){
        errors.email = "that email is not registered";
    }

        //incorrect password
        if(err.message === "incorrect password"){
            errors.password = "that password is not valid";
        }

    //duplicate error code
    if (err.code === 11000){
        errors.email = "that email is already registered";
        return errors;
    }

    //validation errors
    if(err.message.includes("user validation failed")){
                                        //destructuring the errors object, so we dont need to write .properties on error code
        Object.values(err.errors).forEach(({properties}) => {//errors object inside err value
            errors[properties.path] = properties.message; //upadting the error message with proper text
        });
    }

    return errors; 
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secretToken', {
        expiresIn: maxAge
    });
}


//SIGNUP CONTOLLER

//get
module.exports.signup_get = async (req,res) => {
    res.render('signup')
}

//post
module.exports.signup_post = async (req,res) => {
    
    const { email, password } = req.body
    try {

        const user = await User.create({ email, password });
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(user._id);
        res.status(201).json({ user: user._id });

    } catch (err) {

    const errors = handleErrors(err);
    res.status(400).json({ errors });
    }

   
}



//LOGIN CONTROLLER

//get
module.exports.login_get = async (req,res) => {
    res.render('login')
}

//post
module.exports.login_post = async (req,res) => {
    res.render('login')
}