let express = require('express');
let routes = express.Router();
let userctrl = require('../controller/userctrl')
let userModel = require('../models/userModel')

routes.get('/',userctrl.home)
routes.get('/blogDetails/:id',userctrl.blogDetails);
routes.post('/userComment',userctrl.userComment);
routes.get('/signUp',userctrl.signUp);
routes.post('/userRegister',userctrl.userRegister)
routes.get('/signIn',userctrl.signIn)

module.exports = routes;