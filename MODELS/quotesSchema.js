const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    author : {
        type : String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    url : {
        type : String,
    }
})
const Quote = mongoose.model('Quote',quoteSchema);
module.exports = {Quote};