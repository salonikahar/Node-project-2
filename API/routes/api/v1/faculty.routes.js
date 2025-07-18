const express = require('express')
const routes = express.Router();

const facultyCtrl = require('../../../controller/api/v1/facultyCtrl');

routes.post('/registration',facultyCtrl.registration)
routes.post('/login',facultyCtrl.login)

module.exports = routes;