let mongosse = require('mongoose')

mongosse.connect('mongodb://localhost:27017/adminPanel');
const db = mongosse.connection;

db.once('open', (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('db is connect');
    
})

// mongoose.connect('mongodb://localhost:27017/adminPanel');
// const db = mongoose.connection;

// db.once('open', (err)=>{
//     if (err) {
//      console.log(err);
//      return false;
//     }
//     console.log('db is connect')
// })