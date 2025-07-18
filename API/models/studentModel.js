
let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let imagePath = '/uploads/student';


let studentSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    hobby: Array,
    city: String,
    image: String

})

const studentstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', imagePath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

studentSchema.statics.uploadStudentImg = multer({storage:studentstorage}).single('image');
studentSchema.statics.imagePath = imagePath;

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;