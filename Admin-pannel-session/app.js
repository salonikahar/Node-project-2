const { log } = require('console');
let express = require('express')
let port = 8001;
let path = require('path')
let app = express();
let db = require('./config/db')
let cookieParser = require('cookie-parser');
let session = require('express-session');
let localStrategy = require('./config/passport-local-stretagy');
let passport = require('passport')

app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
   name: 'Admin',
   secret: 'AdminSession',
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge: 1000*60*10000
   }
}))
app.use('/', require('./routes'))


app.listen(port, (err) => {
   err ? console.log(err) : console.log('server is running on: ', port);
})