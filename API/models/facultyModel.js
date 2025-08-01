let mongoose = require('mongoose');


let facultySchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,

})


const facultyModel = mongoose.model('faculty', facultySchema);
module.exports = facultyModel;