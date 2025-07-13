const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCateModel');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// Load Add SubCategory Page
module.exports.addSubCategory = async (req, res) => {
  try {
    const categoryData = await categoryModel.find({ status: true });
    return res.render('subCategory/addSubCategory', { categoryData });
  } catch (err) {
    console.log('Error loading Add SubCategory page:', err.message);
    return res.redirect('/admin/dashboard');
  }
};

// Insert SubCategory with image upload
module.exports.insertSubCategoryData = async (req, res) => {
  try {
    let posterImg = '';
    if (req.file) {
      posterImg = subCategoryModel.blogImage + '/' + req.file.filename;
    }
    console.log('Uploaded Poster:', posterImg);

    req.body.poster = posterImg;
    req.body.created_date = moment().format('DD/MM/YYYY, h:mm:ss a');
    req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss a');

    const subCategoryData = await subCategoryModel.create(req.body);
    if (subCategoryData) {
      console.log('SubCategory created successfully');
    } else {
      console.log('Error while creating SubCategory');
    }

    return res.redirect('/admin/subCategory/viewSubCategory');
  } catch (err) {
    console.log('Error inserting SubCategory:', err.message);
    return res.redirect('/admin/dashboard');
  }
};

// View SubCategory List
module.exports.viewSubCategory = async (req, res) => {
  try {
    const subCategoryData = await subCategoryModel.find()
      .populate('categoryId')
      .sort({ created_date: -1 })
      .exec();

    return res.render('subCategory/viewSubCategory', {
      admin: req.user,
      subCategoryData
    });
  } catch (err) {
    console.log('Error viewing SubCategories:', err.message);
    return res.redirect('/admin/dashboard');
  }
};

// Delete SubCategory and its image
module.exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.query.subCateId;
    const subCategoryData = await subCategoryModel.findById(id);

    if (subCategoryData) {
      // Try deleting associated image file
      try {
        const imgPath = path.join(__dirname, '..', subCategoryData.poster);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
          console.log('Image deleted:', imgPath);
        } else {
          console.log('Image file not found:', imgPath);
        }
      } catch (err) {
        console.log('Error deleting image file:', err.message);
      }

      // Delete document from DB
      const deleted = await subCategoryModel.findByIdAndDelete(id);
      if (deleted) {
        console.log('SubCategory deleted successfully');
      } else {
        console.log('Failed to delete SubCategory from DB');
      }
    } else {
      console.log('SubCategory not found');
    }

    return res.redirect('/admin/subCategory/viewSubCategory');
  } catch (err) {
    console.log('Error deleting SubCategory:', err.message);
    return res.redirect('/admin/subCategory/viewSubCategory');
  }
};
