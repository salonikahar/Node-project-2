let express =  require('express')
let port = 8010;
let app =  express()
let path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname , 'views'));

app.get('/', (req , res)=>{
    return res.render('index');
})

app.get('/add', (req , res)=>{
    return res.render('addMovie');
})

app.listen(port ,function(err){
    err ? console.log(err) : console.log('server is running on port:',port);
})