let express = require('express');
let routes = express.Router();

let adminctrl = require('../controller/adminctrl');
let adminModel = require('../models/adminModel')

routes.get('/' , adminctrl.login);
routes.get('/logOut' , adminctrl.logOut);
routes.post('/adminLogin' , adminctrl.adminLogin);
routes.get('/changePass' , adminctrl.changePass);
routes.post('/changeAdminPass' , adminctrl.changeAdminPass);

//forgot pass
routes.get('/checkMail',adminctrl.checkMail)
routes.post('/sendOtp',adminctrl.sendOtp)


routes.get('/dashboard' , adminctrl.dashboard);
routes.get('/viewAdmin' , adminctrl.viewAdmin);
routes.get('/addAdmin' , adminctrl.addAdmin);
routes.post('/insertData' ,adminModel.uploadAdminImage , adminctrl.insertData);
routes.get('/updateAdminDetails/:id' , adminctrl.updateAdminDetails);
routes.post('/editData/:id',adminModel.uploadAdminImage , adminctrl.editData);
routes.get('/deleteAdminDetails',adminctrl.deleteAdminDetails);

// soft delete
routes.get('/inactive/:id',adminctrl.inactive);

// search
routes.get('/searchAdmin',adminctrl.searchAdmin)


module.exports = routes;