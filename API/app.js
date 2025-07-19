const express = require('express')
const port = 8010;

const app = express();
const db = require('./config/db')

const passport = require('passport');
const passportJwt = require('./config/passport-jwt')
const session = require('express-session')

app.use(express.urlencoded());

app.use(session({
    name :'JWTSession',
    secret:'jetSTD',
    resave : true,
    saveUninitialized: true,
    cookie :{
        maxAge : 1000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./routes/api/v1/index'))
app.listen(port, (err) => {
    err ? console.log(err) : console.log('server is running on :', port);
})