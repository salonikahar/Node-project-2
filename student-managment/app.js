const express = require('express');
const port = 8001;

const app = express();
const db = require('./config/db')

app.use(express.urlencoded());

app.use('/api',require('./routes/api/v1/index'))
app.listen(port, (err) => {
    err ? console.log(err) : console.log('server is running on port :', port);
})