const User = require('../models/user');

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");
const config = require("../config/config");

module.exports.profile = function (req, res) {
    return res.send("<h1> Human Profile </h1>");
}

module.exports.signup = function (req, res) {
    return res.render('user_signup', {
        title: "Human-signup"
    });
}

module.exports.signin = function (req, res) {
    return res.render('user_signin', {
        title: "Human-signin"
    });
}

const sendVerifyMail = async (uname, email, user_id) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'For Mail Verification',
            html: '<p>Hii ' + uname + ' , please click here to <a href="http://localhost:2323/users/verify?id=' + user_id + '"> Verify </a> your mail. </p>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email has been sent:- ", info.response);
            }
        })

    }
    catch (error) {
        console.log(error.message);
    }
}
//for reset password
const sendResetPasswordMail = async (uname, email, token) => {

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'For Reset Password',
            html: '<p>Hii ' + uname + ' , please click here to <a href="http://localhost:2323/users/forget-password?token=' + token + '"> Reset Password </a> reset your password. </p>'
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email has been sent:- ", info.response);
            }
        })

    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports.create = function (req, res) {
    // if(req.body.password != req.body.confirm_pass){
    //     return res.redirect('back');
    // }
    const find = async () => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                const data = new User(req.body);
                const userData = await data.save();
                if (userData) {
                    sendVerifyMail(req.body.name, req.body.email, userData._id);
                }
                console.log('okk');
            }
            else {
            }
            return res.render('verpage');
        }
        catch (err) {
            console.log(err);
        }
    }
    find();
    // const find2 = async () => {
    //     const user = await User.findOne({ is_verified: req.body.is_verified });
    //     if (user == 1) {
    //         return res.render('user_signin');
    //     }
    // }
    // find2();
    // if()
}

module.exports.verifyMail = async (req, res) => {
    console.log("hi");

    try {
        const updateInfo = await User.updateOne({ _id: req.query.id }, { $set: { is_verified: 1 } });
        console.log(updateInfo);
        res.render("email-verified");
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

// module.exports = verifyMail;

// forget password code 

module.exports.forgetLoad = async (req, res) => {
    try {
        return res.render('forget');
    }
    catch (error) {
        console.log(error);
    }
}

// module.exports = { forgetLoad };

module.exports.forgetVerify = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
        if (userData) {
            const randomString = randomstring.generate();
            if (userData.is_verified === 0) {
                return res.render("forget", { message: "Please verify your mail." });
            }
            else {
                const randomString = randomstring.generate();
                const updatedData = await User.updateOne({ email: email }, { $set: { token: randomString } });
                sendResetPasswordMail(userData.name, userData.email, randomString);
                return res.render('forget', { message: "Please check your mail to reset your password." });
            }

        }
        else {
            return res.render('forget', { message: "User email is incorrect" });
        }

    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports.forgetPasswordLoad = async (req, res) => {

    try {
        const token = req.query.token;
        const tokenData = await User.findOne({ token: token });
        if (tokenData) {
            res.render('forget-password', { user_id: tokenData._id });
        }
        else {
            res.render('404', { message: "Token is invalid." });
        }
    }
    catch (error) {
        console.log(error.message);
    }

}

module.exports.resetPassword = async (req, res) => {

    try {

        const password = req.body.password;
        const user_id = req.body.user_id;

        const updatedData = await User.findByIdAndUpdate({ _id: user_id }, { $set: { password: password, token: '' } });

        res.redirect("/users/sign-in");

    }
    catch (error) {
        console.log(error.message);
    }
}