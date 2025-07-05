const { Admin } = require('mongodb');
let mongoose = require('mongoose');
;


let categoryModel = mongoose.Schema({
    category: {
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

const category = mongoose.model('category', categoryModel);
module.exports = category;