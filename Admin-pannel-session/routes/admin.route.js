let express = require('express');
let routes = express.Router();

let adminctrl = require('../controller/adminctrl');
let adminModel = require('../models/adminModel');
let passport = require('passport')

routes.get('/', adminctrl.login);
// routes.get('/logOut', adminctrl.logOut);

routes.get('/logOut', (req, res) => {
    req.logOut(function (err) {
        if(err) {
            console.log(err);
            return res.redirect('/admin/')
        }else{
            return res.redirect('/admin/')
        }

    })
})

routes.post('/adminLogin', passport.authenticate('admin', { failureRedirect: '/admin/' }), adminctrl.adminLogin);
routes.get('/changePass', adminctrl.changePass);
routes.post('/changeAdminPass', adminctrl.changeAdminPass);

//forgot pass
routes.get('/checkMail', adminctrl.checkMail)
routes.post('/sendOtp', adminctrl.sendOtp)
routes.post('/ResendOtp', adminctrl.ResendOtp)
routes.get('/otpPage', adminctrl.otpPage);
routes.post('/verifyOtp', adminctrl.verifyOtp);
routes.get('/changePassword',passport.AuthUser, adminctrl.changePassword);
routes.post('/updateChangePass', adminctrl.updateChangePass)


routes.get('/dashboard', passport.AuthUser, adminctrl.dashboard);
routes.get('/viewAdmin', adminctrl.viewAdmin);
routes.get('/addAdmin', adminctrl.addAdmin);
routes.post('/insertData', adminModel.uploadAdminImage, adminctrl.insertData);
routes.get('/updateAdminDetails/:id', adminctrl.updateAdminDetails);
routes.post('/editData/:id', adminModel.uploadAdminImage, adminctrl.editData);
routes.get('/deleteAdminDetails', adminctrl.deleteAdminDetails);

// soft delete
routes.get('/inactive/:id', adminctrl.inactive);

// search
routes.get('/searchAdmin', adminctrl.searchAdmin);

//category
routes.use('/category',require('./category.routes'))

//subcategory
routes.use('/subCategory',require('./subCategory.routes'))

module.exports = routes;