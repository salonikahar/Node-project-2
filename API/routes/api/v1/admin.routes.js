const express = require('express')
const routes = express.Router();
const adminCtrl = require('../../../controller/api/v1/adminCtrl')
const adminModel = require("../../../models/adminModel")
const passport = require('passport')

const jwtAuth = passport.authenticate("admin-jwt", { session: false })

routes.post('/addAdmin', jwtAuth, adminCtrl.addAdmin)
routes.post('/login', adminCtrl.login)

routes.get('/failedLogin', async (req, res) => {
    return res.status(404).json({ msg: "try to login for admin ", status: "failed" })
})

module.exports = routes;