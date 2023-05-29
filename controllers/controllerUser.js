const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()


//MODELS
const User = require('../models/uModel')



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
module.exports.login_get = async (req,res) => {
    res.render('login')
}