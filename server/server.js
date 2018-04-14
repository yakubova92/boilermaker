const express = require('express');
const app = express();
const path = require('path');

//starts the server and listens for requests
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});


//logging middleware to help with debugging (morgan, express-logger, volleyball)
const morgan = require('morgan');
app.use(morgan('dev'));


//static middleware - gives browser access to files (js, css, images) in path provided in quotes
//you can put all these files the browser needs access to in a folder named public
app.use(express.static(path.join(__dirname, './public')));


//parsing middleware - to handle requests that have a body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//setting up routes - matches all requests to /api
//check apiRoutes folder for more routes
app.use('/api', require('./apiRoutes'));


//sends index.html back for any requests that don't match an api route
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// checks for Server errors 500.
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
