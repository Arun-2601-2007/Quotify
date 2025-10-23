const express = require('express');
const router = express.Router();
const ExpressError = require('../UTILS/ExpressError.js');
const User = require('../MODELS/userSchema.js');
const passport = require('passport');
const { Quote } = require("../MODELS/quotesSchema.js");
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })

const controllerQuotes = require('../CONTROLLERS/quotes.js');

// Get quotes and Add quotes
router
    .route("/")
    .post(upload.single('image'), controllerQuotes.addQuote)
    .get(controllerQuotes.allQuotes);

// Get random quote
router
    .route("/random")
    .get(controllerQuotes.randomQuote);

// Add quote form
router
    .route("/new")
    .get(controllerQuotes.addQuoteForm);

router
    .route("/author/:authorName")
    .get(controllerQuotes.authorQuotes);  

module.exports = router;