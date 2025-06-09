const { Admin } = require('mongodb');
let mongoose = require('mongoose');
let path = require('path')
let adminImage = '/uploads/admins';
let multer = require('multer');


let adminModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    hobby: {
        type: Array,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    profile: {
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

let adminStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null , path.join(__dirname,'..',adminImage));
    },
    filename :(req , file , cb)=>{
        cb(null , file.fieldname+'-'+Date.now())
    }
})

adminModel.statics.uploadAdminImage = multer({storage : adminStorage}).single('profile');
adminModel.statics.adminImage = adminImage;


const admin = mongoose.model('admin', adminModel);
module.exports = admin;