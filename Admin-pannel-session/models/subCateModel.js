const { Admin } = require('mongodb');
let mongoose = require('mongoose');
let path = require('path')
let blogImage = '/uploads/blog';
let multer = require('multer');


let subCategoryModel = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    poster: {
        type: String,
        require: true
    },
    status: {
        default: true,
        type: Boolean,
        require: true
    },
    created_date: {
        type: String,
        require: true
    },
    updated_date: {
        type: String,
        require: true
    }
})



let blogStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null , path.join(__dirname,'..',blogImage));
    },
    filename :(req , file , cb)=>{
        cb(null , file.fieldname+'-'+Date.now())
    }
})

subCategoryModel.statics.uploadBlogImage = multer({storage : blogStorage}).single('poster');
subCategoryModel.statics.blogImage = blogImage;

const subCategory = mongoose.model('subCcategory', subCategoryModel);
module.exports = subCategory;