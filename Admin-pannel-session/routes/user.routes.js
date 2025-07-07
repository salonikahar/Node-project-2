let express = require('express');
let routes = express.Router();
let userctrl = require('../controller/userctrl')

routes.get('/',userctrl.home)
routes.get('/blogDetails',userctrl.blogDetails)

module.exports = routes;