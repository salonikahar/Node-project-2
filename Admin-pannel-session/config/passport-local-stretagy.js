const passport = require('passport');
const adminModel = require('../models/adminModel');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const admin = require('../models/adminModel');


passport.use('admin',new localStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    let adminData = await adminModel.findOne({ email: email })
    if (adminData) {
        if(await bcrypt.compare(password , adminData.password)){
            return done(null , adminData);
        }else{
            return done(null,false)
        }
    } else {
        return done(null, false)
    }
}))

passport.serializeUser(async function (user , done){
    return done(null,user.id)
});

passport.deserializeUser(async function (id , done){
    let adminData = await adminModel.findById(id);
    if(adminData){
        return done(null,adminData)
    }else{
        return done(null,false)
    }
})

passport.AuthUser = function(req,res,next){
    if (req.isAuthenticated()){
        next();
    }else{
        return res.redirect('/admin/')
    }
}

passport.setUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;