const { log } = require('console');
var express = require('express');
const router = require("./router/router")

var app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router)

app.listen(9000);
console.log("Server is A'go on 9000");