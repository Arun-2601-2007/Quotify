if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

// Session and Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./MODELS/userSchema.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Router routes
const authentication = require('./ROUTES/authentication.js');
const quotes = require('./ROUTES/quotes.js');

const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = 8080;
const ejsMate = require("ejs-mate");

const ExpressError = require('./UTILS/ExpressError.js');
const { Quote } = require("./MODELS/quotesSchema.js");

// Multipart data parsing
const multer = require('multer');
const { storage } = require('./cloudConfig.js');
const { allQuotes } = require('./CONTROLLERS/quotes.js');
const upload = multer({ storage });

// To start using ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "VIEWS"));
app.use(express.urlencoded({ extended: true }));

// Setting ejs mate for layouts
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "PUBLIC")));

// Connecting to database
const dbUrl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret : process.env.SECRET
  },
  touchAfter : 24*3600
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}


// Session and passport
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Using router files
app.use('/api',authentication);
app.use('/api/quotes',quotes);

app.get("/", (req, res) => {
  throw new ExpressError("Oops! The page you’re looking for can’t be found.");
});

app.get("/api", (req, res) => {
  res.render("WEBPAGES/home.ejs");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured At Backend" } = err;
  res.render('WEBPAGES/error.ejs', { status, message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
