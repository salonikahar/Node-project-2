let express =  require('express')
let port = 8001;
let app =  express()

app.listen(port ,function(err){
    err ? console.log(err) : console.log('server is running on port:',port);
})