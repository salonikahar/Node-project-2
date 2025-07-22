const express = require('express');
const routes = express.Router();

const adminCtrl = require('../../../controller/api/v1/adminCtrl');

routes.post('/addAdmin',adminCtrl.addAdmin);
routes.get('/getAdmin',adminCtrl.getAdmin);

module.exports = routes ;