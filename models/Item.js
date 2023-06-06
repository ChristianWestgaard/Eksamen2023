
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, "Input 1 is required"],
        maxLength: 100
    },
    author: {
        type: String,
        required: [true, "Input 2 is required"],
    },
})

const Item = mongoose.model('items', itemSchema)
module.exports = Item;