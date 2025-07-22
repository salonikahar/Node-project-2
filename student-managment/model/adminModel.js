const mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
    adminName : String,
    adminEmail : String , 
    adminPassword : String 
})

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel ; 