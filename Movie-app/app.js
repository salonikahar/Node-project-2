const { log } = require('console');
const exp = require('constants');
let express =  require('express')
let port = 8010;
let app =  express()
let path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname , 'views'));
app.use(express.urlencoded())

let data = []

app.get('/', (req , res)=>{
    return res.render('index',{
        'record':data
    });
})

app.get('/add', (req, res) => {
    return res.render('addMovie'); 
});

app.post('/addMovie' , (req , res)=>{
    console.log(req.body);
    data.push(req.body);
    return res.redirect('/');
})


app.listen(port ,function(err){
    err ? console.log(err) : console.log('server is running on port:',port);
})