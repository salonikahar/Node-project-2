let express = require('express');
let routes = express.Router();

let adminctrl = require('../controller/adminctrl');
let adminModel = require('../models/adminModel')

routes.get('/' , adminctrl.dashboard);
routes.get('/viewAdmin' , adminctrl.viewAdmin);
routes.get('/addAdmin' , adminctrl.addAdmin);
routes.post('/insertData' ,adminModel.uploadAdminImage , adminctrl.insertData);

module.exports = routes;