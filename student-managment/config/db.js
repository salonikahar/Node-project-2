const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/studentMangment");

const db = mongoose.connection;

db.once('open' , (err)=>{
    err ? console.log(err): console.log('db is connected');
})

module.exports = db ;