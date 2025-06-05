let express = require('express');

let routes = express.Router();

let adminctrl = require('../controller/adminctrl');

routes.get('/' , adminctrl.dashboard);
routes.get('/viewAdmin' , adminctrl.viewAdmin);
routes.get('/addAdmin' , adminctrl.addAdmin);
module.exports = routes;