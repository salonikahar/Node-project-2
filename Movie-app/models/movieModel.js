let mongoose = require('mongoose')
const { type } = require('os')
let path = require('path')
let multer = require('multer');
let moviePoster = '/uploads/poster';
let movieBG = '/uploads/backg';

const movieModel = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    reating: {
        type: Number,
        require: true
    },
    language: {
        type: Array,
        require: true
    },
    genre: {
        type: Array,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    cast: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    posterimg: {
        type: String,
        require: true
    }
    
});

const movieStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', moviePoster))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now())
    }
})

// const bgStore = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '..', movieBG))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '_' + Date.now())
//     }
// })

movieModel.statics.fileUploads = multer({ storage: movieStorage }).single('posterimg')
movieModel.statics.imageposterPath = moviePoster;

const movieData = mongoose.model('movie', movieModel)
module.exports = movieData;