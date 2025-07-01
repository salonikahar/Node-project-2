let express = require('express');

let routes = express.Router();

routes.use('/admin', require('./admin.route'));

module.exports = routes; 
