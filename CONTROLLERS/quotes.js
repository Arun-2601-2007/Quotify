const { Quote } = require("../MODELS/quotesSchema.js");
const ExpressError = require('../UTILS/ExpressError.js');

module.exports.randomQuote = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to start exploring Quotify.");
    return res.redirect('/api/login');
  }
  const quotes = await Quote.find({});
  let len = quotes.length;
  let randNum = Math.floor(Math.random() * len);
  const quote = quotes[randNum];
  res.render("WEBPAGES/randomQuote.ejs", { quote: quote });
};

module.exports.allQuotes = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to start exploring Quotify.");
    return res.redirect('/api/login');
  }
  const quotes = await Quote.find({});
  res.render("WEBPAGES/allQuotes.ejs", { quotes: quotes });
};

module.exports.addQuote = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to start exploring Quotify.");
    return res.redirect('/api/login');
  }
  let { author, quote } = req.body;
  const quotes = await Quote.find({});
  let url = req.file.path;
  const newQuote = new Quote({ author: author, text: quote, url: url });
  await newQuote.save();
  req.flash("success", "Quote added successfully.");
  res.redirect('/api/quotes/new');
};

module.exports.addQuoteForm = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to start exploring Quotify.");
    return res.redirect('/api/login');
  }
  res.render("WEBPAGES/addQuoteForm.ejs");
};

module.exports.authorQuotes = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to start exploring Quotify.");
    return res.redirect('/api/login');
  }
  let { authorName } = req.params;
  const quotes = await Quote.find({});
  let filteredQuotes = quotes.filter((ele) => authorName === ele.author);
  if (filteredQuotes.length == 0) {
    req.flash("error", "Sorry, requested Author quotes not added yet.");
    return res.redirect('/api');
  }
  res.render("WEBPAGES/authorQuotes.ejs", { filteredQuotes });
};