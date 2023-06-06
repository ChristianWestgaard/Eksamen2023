const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, "noe_jeg_ikke_kan_dele_fordi_da_er_poenget_borte", (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect("/login")
            } else {
                next();
            }
        });
    }
    else{
        res.redirect("/login")
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, "noe_jeg_ikke_kan_dele_fordi_da_er_poenget_borte", async(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next()
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
}
module.exports = { requireAuth, checkUser };