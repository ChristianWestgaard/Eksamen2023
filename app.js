const { log } = require('console');
var express = require('express');
const router = require("./router/router")
const cookieParser = require('cookie-parser')

var app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(router)

app.listen(9000);
console.log("Server is A'go on 9000");


