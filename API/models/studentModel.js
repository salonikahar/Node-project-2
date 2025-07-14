
let mongoose = require('mongoose');


let studentSchema = mongoose.Schema({
    name: String,
    email: String
   
})


const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;