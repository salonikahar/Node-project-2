let express = require('express');

let routes = express.Router();

let adminctrl = require('../controller/adminctrl');

routes.get('/' , adminctrl.dashboard)
module.exports = routes;