const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCateModel');
const moment = require('moment')

module.exports.addSubCategory = async (req, res) => {

    let categoryData = await categoryModel.find({ status: true });
    return res.render('subCategory/addSubCategory', { categoryData })
}

module.exports.insertSubCategoryData = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        var posterImg = '';
        if (req.file) {
            posterImg = subCategoryModel.blogImage + '/' + req.file.fileName;
        }
        req.body.poster = posterImg;
        req.body.created_date = moment().format('DD/MM/YYYY,h:mm:ss a');
        req.body.updated_date = moment().format('DD/MM/YYYY,h:mm:ss a');

        let subCategoryData = await subCategoryModel.create(req.body);
        if (subCategoryData) {
            console.log('done');
            return res.redirect('/admin/subCategory/viewSubCategory')
        } else {
            console.log('error to add sub category');
            return res.redirect('/admin/subCategory/viewSubCategory')

        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard')
    }
}

module.exports.viewSubCategory = async (req, res) => {
    try {
        let subCategoryData = await subCategoryModel.find().populate('categoryId').exec();
        // console.log(subCategoryData);
        
        return res.render('subCategory/viewSubCategory', { admin: req.user, subCategoryData })

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
}

const fs = require('fs');
const path = require('path');

module.exports.deleteSubCategory = async (req, res) => {
  try {
    let id = req.query.subCateId;
    
    let subCategoryData = await subCategoryModel.findById(id);
    if (subCategoryData) {
      try {
        let imgPath = path.join(__dirname, '..', subCategoryData.poster);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        } else {
          console.log('Image file does not exist.');
        }
      } catch (err) {
        console.log('Error deleting image:', err.message);
      }

      let deleteSubCategory = await subCategoryModel.findByIdAndDelete(id);
      if (deleteSubCategory) {
        console.log('SubCategory deleted successfully');
      } else {
        console.log('Failed to delete SubCategory');
      }
    } else {
      console.log('SubCategory not found');
    }

    return res.redirect('/admin/subCategory/viewSubCategory');

  } catch (err) {
    console.log('Error:', err.message);
    return res.redirect('/admin/subCategory/viewSubCategory');
  }
};


