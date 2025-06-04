const { log } = require('console');
let express = require('express')
let port = 8001
let app = express();

app.use('/', require('./routes'))


app.listen(port,(err)=>{
   err?console.log(err):console.log('server is running on: ',port);
})