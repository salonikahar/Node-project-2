const categoryModel = require('../models/categoryModel');
const moment = require('moment')

module.exports.addCategory = async (req, res) => {
    return res.render('category/addCategory', { admin: req.user })
}

module.exports.insertCategoryData = async (req, res) => {
    // console.log(req.body);
    req.body.created_date = moment().format('DD/MM/YYYY,h:mm:ss a');
    req.body.updated_date = moment().format('DD/MM/YYYY,h:mm:ss a');

    let addCategory = await categoryModel.create(req.body);
    if (addCategory) {
        return res.redirect('/admin/category/addCategory')
    } else {
        console.log('error');
        return res.redirect('/admin/category/addCategory')

    }
}

module.exports.viewCategory = async (req, res) => {
    try {
        let categoryData = await categoryModel.find();

        return res.render('category/viewCategory', { admin: req.user, categoryData })

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/dashboard');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {

        let id = req.query.cateId;
        // console.log(id);
        let CategoryData = await categoryModel.findById(id);

        let deleteCategory = await categoryModel.findByIdAndDelete(CategoryData);
        // if(deleteCategory){
        //     console.log('deleted');
            
        // }else{
        //     console.log('error');    
        // }
        return res.redirect('/admin/category/viewCategory')

    } catch (err) {
        console.log(err);
        return res.redirect('/admin/category/viewCategory')
    }
}