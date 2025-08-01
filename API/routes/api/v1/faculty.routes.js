const express = require('express')
const routes = express.Router();
const facultyModel = require("../../../models/studentModel")
const passport = require('passport')
const jwtAuth = passport.authenticate('faculty-jwt', { session: false });

const facultyCtrl = require('../../../controller/api/v1/facultyCtrl');

routes.post('/registration', jwtAuth,facultyCtrl.registration)
routes.post('/login', facultyCtrl.login)

routes.get('/failedLogin', async (req, res) => {
    return res.status(404).json({ msg: "try to login for faculty ", status: "failed" })
})

module.exports = routes;