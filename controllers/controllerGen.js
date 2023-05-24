const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const handleErrors = ('err')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.dataUser}:${process.env.dataPassword}`

module.exports.index_get = async (req,res) => {
    res.render('index')
}