let express = require('express')
let port = 8001;
let app = express()
let path = require('path')

app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'asset')))

app.get('/',(req,res)=>{
    return res.render('index')
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log('your server is running on :', port);    
})