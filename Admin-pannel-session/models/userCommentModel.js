const { Admin } = require('mongodb');
let mongoose = require('mongoose');



let userCommentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    status: {
        default: true,
        type: Boolean,
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }

})

const comment = mongoose.model('userComment', userCommentSchema);
module.exports = comment;