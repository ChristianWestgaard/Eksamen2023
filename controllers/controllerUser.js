const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()

const uri = `mongodb+srv://CRUDuser:NxsOh8j8F4Fom4GC@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`
//mongodb+srv://<username>:<password>@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "item" }, )
const client = new MongoClient(uri)

//MODELS
const User = require('../models/Users')

//Erorr Handlers 
const errEvent = (err) => {
    console.log(err.message, err.code);
    let error = {email: '', password: ''};

    if (err.message.includes('user validation failed')) {
        Object.value(err.errors).forEach(error =>{
            console.log(error.properties);
        })
    }

    if (err.code = 11000) {
        err.doppleganger = "That email is in use, log inn with email"
    }

    if (err.message === "Password didnt match") {
        err.password = "The passwords do not match."
    }
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
        const user = await User.create({ email, password })   
        res.render('index')
    } catch (err) {
    errEvent(err);

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