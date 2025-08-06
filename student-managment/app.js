const express = require('express');
const port = 8001;

const app = express();
const db = require('./config/db')

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

app.use(express.urlencoded());

const options = {
  definition: {
    openapi: '1.0.0', // Swagger version
    info: {
      title: 'SMS',
      version: '1.0.0',
      description: 'This is the documentation of My Node.js API',
    },
    servers: [
      {
        url: 'http://localhost:8001/api/admin/', // Replace with your API URL
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/api/v1/*.js'], // files containing annotations for the Swagger docs
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use('/api',require('./routes/api/v1/index'))
app.listen(port, (err) => {
    err ? console.log(err) : console.log('server is running on port :', port);
})