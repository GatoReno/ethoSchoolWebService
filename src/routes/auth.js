const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db');
const helpers = require('../lib/helpers');
const {
    isLoggedIn,
    isNotLoggedIn
} = require('../lib/auth');

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    
    failureRedirect: '/users/add',
    //failureRedirect: '/auth/signup',
    failureFlash: true
}));

router.get('/sign-in',(req,res)=>{
    res.render('auth/signin'); 
});

router.post('/sign-in', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/auth/profile',
        failureRedirect: '/auth/sign-in',
        failureFlash: true
    })(req, res, next);
});

router.get('/sign-up',(req,res)=>{
    res.render('auth/signup');
});

router.get('/sign-out',(req,res)=>{
    req.logOut();
    res.redirect('/');
});

router.get('/profile', (req,res) => {

    res.render('public/profile');    
});


module.exports = router;