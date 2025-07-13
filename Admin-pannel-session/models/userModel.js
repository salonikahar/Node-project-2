const { Admin } = require('mongodb');
let mongoose = require('mongoose');
let path = require('path')
let userProfileImg = '/uploads/userProfile';
let multer = require('multer');
const { type } = require('os');
const { strict } = require('assert');


let userProfile = mongoose.Schema({
    name: {
        type: String
    },
    userName : {
        type :String
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
        type: String
    },
    city: {
        type: String
    },
    hobby: {
        type: Array
    },
    gender: {
        type: String
    },
    description: {
        type: String
    },
    profile: {
        type: String
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

let userProfileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null , path.join(__dirname,'..',userProfile));
    },
    filename :(req , file , cb)=>{
        cb(null , file.fieldname+'-'+Date.now())
    }
})

userProfile.statics.userProfileStorage = multer({storage : userProfileStorage}).single('profile');
userProfile.statics.adminImage = userProfileImg;


const user = mongoose.model('user', userProfile);
module.exports = user;