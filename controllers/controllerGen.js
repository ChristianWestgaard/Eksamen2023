const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { log } = require('console');
const { MongoClient } = require('mongodb');
const handleErrors = ('err')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`
// mongoose.connect(uri, { useNewUrlParser: true, useUndefinedTopology: true })
const client = new MongoClient(uri)


const storage = multer.memoryStorage();
const upload = multer({ storage: storage}).single('image')




module.exports.index_get = async (req,res) => {
    res.render('index')
}

module.exports.item_get = async (req,res) => {
    res.render('item')
}

module.exports.item_post = async(req,res) => {
    console.log(req.body);
    res.render('item')

    try{
        const database = client.db("item")
        const doc = req.body

        database.collection("input").insertOne(doc)
        console.log("Document added");
    } catch(err) {
        console.log(err);
    }
}