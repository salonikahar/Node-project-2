const express = require('express');
const routes = express.Router();

routes.use('/admin' ,require('./admin.routes'))

module.exports = routes ;