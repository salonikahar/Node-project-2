const express = require('express')
const routes = express.Router();
const subCateCtrl =  require('../controller/subCateCtrl')
const subCategoryModel = require('../models/subCateModel');

routes.get('/addSubCategory',subCateCtrl.addSubCategory);
routes.post('/insertSubCategoryData', subCategoryModel.uploadBlogImage ,subCateCtrl.insertSubCategoryData)
routes.get('/viewSubCategory',subCateCtrl.viewSubCategory);
routes.get('/deleteSubCategory',subCateCtrl.deleteSubCategory)
module.exports = routes;