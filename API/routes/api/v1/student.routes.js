const express = require('express')
const routes = express.Router();
const studentCtrl = require('../../../controller/api/v1/studentCtrl')

routes.use('/student' , require('./student.routes'))

module.exports = routes;