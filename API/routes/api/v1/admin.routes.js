const express = require('express')
const routes = express.Router();
const multer = require('multer')
const adminCtrl = require('../../../controller/api/v1/adminCtrl')


routes.post('/login',adminCtrl.login)

module.exports = routes;