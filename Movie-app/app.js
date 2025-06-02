const { log } = require('console');
const exp = require('constants');
let express = require('express')
let port = 8010;
let app = express()
let path = require('path');
const db = require('./config/db')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded())

let data = require('./models/movieModel');

app.get('/', async (req, res) => {

    let datamovie = await data.find();

    return res.render('index', {
        'record': datamovie
    });
})

app.get('/add', (req, res) => {
    return res.render('addMovie');
});

app.post('/addMovie', data.fileUploads, async (req, res) => {
    console.log(req.file)
    if (req.file) {
        req.body.posterimg = data.imageposterPath + '/' + req.file.filename;
    }
    await data.create(req.body);
    return res.redirect('/');
});


app.get('/movieDetails', async (req, res) => {
    let index = req.query.position;
    let singleMovie = await data.findById(index);

    return res.render('movieDetails', {
        index,
        'record': singleMovie
    });
});



app.listen(port, function (err) {
    err ? console.log(err) : console.log('server is running on port:', port);
})