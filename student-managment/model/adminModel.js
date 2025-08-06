const mongoose = require('mongoose');
const multer = require("multer"); 

let adminSchema = mongoose.Schema({
    adminName : String,
    adminEmail : String , 
    adminPassword : String ,
    adminImage : String 
})

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel ; 