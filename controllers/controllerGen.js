const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.dataUser}:${process.env.dataPassword}@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`

module.exports.index_get = async (req,res) => {
    res.render('index')
}

module.exports.item_get = async (req,res) => {
    res.render('item')
}

module.exports.item_post = async(req,res) => {
    res.render('item')
}