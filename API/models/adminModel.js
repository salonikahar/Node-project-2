let mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,

})


const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;