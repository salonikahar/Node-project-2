const express = require('express');
const routes = express.Router();

const {storage} = require('../../../config/storage')
const multer = require('multer')
const upload = multer({storage})

const adminCtrl = require('../../../controller/api/v1/adminCtrl');

routes.post('/addAdmin', upload.single('adminImage') ,adminCtrl.addAdmin);
routes.get('/getAdmin',adminCtrl.getAdmin);

module.exports = routes ;