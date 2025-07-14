let express = require('express');
let routes = express.Router();
let userctrl = require('../controller/userctrl')
let userModel = require('../models/userModel')
let passport = require('passport')

routes.get('/',userctrl.home)
routes.get('/blogDetails/:id',userctrl.blogDetails);
routes.post('/userComment',userctrl.userComment);
routes.get('/signUp',userctrl.signUp);
routes.post('/userRegister',userctrl.userRegister)
routes.get('/signIn',userctrl.signIn);
routes.post('/userSignin', passport.authenticate('user' , {failureRedirect : '/userSignin'}) ,userctrl.userSignin)

module.exports = routes;