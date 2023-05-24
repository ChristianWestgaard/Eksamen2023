const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()


//SIGNUP CONTOLLER

//get
module.exports.signup_get = async (req,res) => {
    res.render('signup')
}

//post
module.exports.signup_post = async (req,res) => {
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