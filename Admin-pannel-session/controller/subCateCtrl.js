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
            return res.redirect('/admin/subCategory')
        } else {
            console.log('error to add sub category');
            return res.redirect('/admin/subCategory')

        }

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard')
    }
}

