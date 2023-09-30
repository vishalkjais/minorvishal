const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_controller = require('../controller/users_controller');

router.get('/profile', user_controller.profile);

router.get('/sign-up', user_controller.signup);
router.get('/sign-in', user_controller.signin);
router.get('/verify', user_controller.verifyMail); //--> route for verify mail.
router.get('/forget', user_controller.forgetLoad);
router.post('/forget', user_controller.forgetVerify); // password reset
router.post('/create', user_controller.create);
router.get('/forget-password', user_controller.forgetPasswordLoad);

router.post('/forget-password', user_controller.resetPassword);



router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in',
        failureFlash: true
    }),(req,res)=>{
        return res.redirect('/home')
        
    });

    module.exports=router;



