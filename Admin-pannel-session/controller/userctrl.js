const { use } = require('passport')
const categoryModel = require('../models/categoryModel')
const subCate = require('../models/subCateModel')

module.exports.home = async (req,res)=>{
    try{

        let categoryData = await categoryModel.find({status : true})
        let subCateData = await subCate.find().populate('categoryId').exec();
        console.log(subCateData.poster); // in controller


        return res.render('user/userPage',{categoryData , subCateData })
    }catch{

    }
}

module.exports.blogDetails = async (req,res) =>{
    try{
        // console.log('reach');
        return res.render('user/blogDetails')
    }catch{

    }
}