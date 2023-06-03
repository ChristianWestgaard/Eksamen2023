const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()

const uri = `mongodb+srv://CRUDuser:jhZpvLwSaa6TIoXF@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const client = new MongoClient(uri)

//MODELS
const User = require('../models/uModel')

//Erorr Handlers 
const errEvent = (err) => {
    console.log(err.message, err.code);
    let error = {email: "", password: ""};

    if (err.message === "No email found"){
        error.email = "I am sorry, that is not a valid email"
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
    
    const { username, email, password } = req.body
        
    try {
        const user = await User.create({ username, email, password })
        res.status(201).json(user)
        const database = client.db("valdUser")
        const doc = req.body
        console.log(doc);
        database.collection("user").insertOne(doc)
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user not created')
    }
    
    res.render('signup')

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