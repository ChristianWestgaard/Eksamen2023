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
    return jwt.sign({ id }, 'noe_jeg_ikke_kan_dele_fordi_da_er_poenget_borte', {
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
    const { email, password } = req.body;

    console.log(req.body);

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id })
    } catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

module.exports.edit_get = async (req, res) => { 
    // userController.js


    const userController = {
    edit: {
        get: [
        async (req, res) => {
            const email = req.params.email;
            const loggedInUser = req.cookies.email;

            try {
            const user = await Account.findOne({ email });

            if (user) {
                const quotes = await Quotes.find({ user: user.email });

                if (loggedInUser === email) {
                const userId = req.user.id;
                res.render("edit", { quotes, email, userId, userLoggedIn: loggedInUser, ownQuotes: true });
                } else {
                res.render("edit", { quotes, email, userLoggedIn: loggedInUser, ownQuotes: false });
                }
            } else {
                res.send("User not found");
            }
            } catch (err) {
            console.log(err);
            res.send("Error occurred");
            }
        }
        ],

        post: [
        async (req, res) => {
            const email = req.params.email;
            const loggedInUser = req.cookies.email;
            const quote = req.body.quote;
            const action = req.body.action;

            try {
            if (req.authToken() && loggedInUser === email && action === "edit") {
                const newQuote = req.body.newQuote;
                await Quotes.updateOne({ quote, user: email }, { $set: { quote: newQuote } });
                console.log("Quote updated:", quote);
            } else if (req.authToken() && loggedInUser === email && action === "delete") {
                await Quotes.deleteOne({ quote, user: email });
                console.log("Quote deleted:", quote);
            } else {
                console.log("Unauthorized action");
                // Handle the unauthorized action appropriately, such as sending an error response or redirecting
                res.status(401).send("Unauthorized action");
                // Or redirect to an appropriate page
                // res.redirect("/unauthorized");
                return;
            }

            res.redirect(`/edit/${email}`);
            } catch (err) {
            console.log(err);
            // Handle the error appropriately, such as sending an error response
            res.status(500).send("Error occurred");
            }
        }
        ]
    }
    };

module.exports = userController;

}

module.exports.edit_post =(req,res) => {
    res.render('edit/:user')
}