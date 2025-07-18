const express = require('express')
const routes = express.Router();

routes.use('/student' , require('./student.routes'))
routes.use('/faculty', require('./faculty.routes'))

module.exports = routes;