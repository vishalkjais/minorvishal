const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;const flash = require('connect-flash');

const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        const find = async () => {
            try {
                const user = await User.findOne({ email: email });

                if (!user || user.password != password) {
                    console.log("Wrong username password");
                    return done(null, false, { message: 'Invalid Username or Password' });
                }
                return done(null, user);
            }
            catch (err) {
                console.log(err);
            }
        }
        find();
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const find = async () => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (err) {
            console.log("err in finding user");
            return done(err);
        }
    }
    find();
});

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
    
}
module.exports = passport;