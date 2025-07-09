const express = require('express')
const routes = express.Router();
const categoryctrl =  require('../controller/categoryctrl');
const category = require('../models/categoryModel');

routes.get('/addCategory',categoryctrl.addCategory);
routes.post('/insertCategoryData',categoryctrl.insertCategoryData);
routes.get('/viewCategory',categoryctrl.viewCategory);
routes.get('/deleteCategory',categoryctrl.deleteCategory);

module.exports = routes;