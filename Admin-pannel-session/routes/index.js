let express = require('express');

let routes = express.Router();

routes.use('/admin', require('./admin.route'));

routes.use('/',require('./user.routes'));

module.exports = routes; 
