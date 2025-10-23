const ExpressError = require('../UTILS/ExpressError.js');
const User = require('../MODELS/userSchema.js');
const passport = require('passport');

module.exports.signUpUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body; /// try catch
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', `Welcome ${req.user.username}!`);
            return res.redirect('/api');
        })
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/api/signup");
    }
};

module.exports.logoutUser = (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please log in to start exploring Quotify.");
        return res.redirect('/api/login');
    }
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash('success', `You’ve successfully logged out. See you soon!`);
        res.redirect('/api');
    })
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Logged In successfully!");
    res.redirect('/api');
};

module.exports.signUpUserForm = (req, res) => {
    res.render("WEBPAGES/signup.ejs");
};

module.exports.loginUserForm = (req, res) => {
    res.render("WEBPAGES/login.ejs");
};