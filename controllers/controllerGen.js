const Item = require('../models/Item')
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { log } = require('console');
const { MongoClient } = require('mongodb');
const handleErrors = ('err')


require('dotenv').config()


const uri = `mongodb+srv://CRUDuser:NxsOh8j8F4Fom4GC@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority`
//mongodb+srv://<username>:<password>@cluster0.hwavrgw.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "general" }, )
const client = new MongoClient(uri)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage}).single('image')




module.exports.index_get = async (req,res) => {

    await Item.aggregate([ { $sample: { size: 1 } } ])
    .then((result) => {
        console.log(result)
        res.render('index', {title: 'All items', Items: result}) 
    })
    .catch((err) => {
    })
}

module.exports.index_post = async (req,res) => {
    res.render('index')
}
module.exports.item_get = async (req,res) => {
    res.render('item')
}

module.exports.item_post = async(req,res) => {
    console.log(req.body);
    res.render('item')

    try{
        const database = client.db("general")
        const doc = req.body

        database.collection("items").insertOne(doc)
        console.log("Document added");
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_get = async(req,res) => {
    await Item.find({ "author": res.locals.user.email })
    .then((result) => {
        console.log(result);
        res.render('user', {title:"All items", Items: result})
    })
    .catch((err) => {
    })
}