const { log, error } = require('console')
const exp = require('constants')
const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({
    input1: {
        type: String,
        required: [true, "Input 1 is required"],
    },
    input2: {
        type: String,
        required: [true, "Input 2 is required"],
    },
    input3: {
        type: String,
        required: [true, "Input 3 is required"],
    }
})

const items = mongoose.exports('Items', itemSchema)
module.exports = items