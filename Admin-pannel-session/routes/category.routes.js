const express = require('express')
const routes = express.Router();
const categoryctrl =  require('../controller/categoryctrl')

routes.get('/addCategory',categoryctrl.addCategory);
routes.post('/insertCategoryData',categoryctrl.insertCategoryData);
routes.get('/viewCategory',categoryctrl.viewCategory)

module.exports = routes;