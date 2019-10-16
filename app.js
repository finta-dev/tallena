// Dependencies 
const express = require('express');
const helmet = require('helmet');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Internal requires
const routes = require('./routes');
const errors = require('./models/errors');
const { port, host } = require('./config').app;
const { uri, connectionOptions } = require('./config').db;

// App settings
let app = express();
app.use(helmet());                              // Protect response headers
app.use(cookieParser());                        // Enable cookie parse to use HTTPOnly cookies (jwt)
app.use(express.json());                        // Parse request and response to JSON 
app.use(express.static('public'));              // Establish "./public" as static files folder 
app.use(express.urlencoded({extended: true}));  // ??
app.engine('handlebars', exphbs());             // Establish express-handlebars as Template Engine
app.set('view engine', 'handlebars');           // Ditto

// API Routes
routes(app);

// Render errors
app.use(function(req, res, next) {
    res.status(404).render('errors', errors.e404);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('errors', errors.e500);
});

// Database connection
mongoose
    .connect(uri, connectionOptions)
    .then( success => console.log('Database connected successfully on:', uri) )
    .catch( error => console.error('Database connection failed:', error) )

// Start server
app.listen(port, host, function() {
    console.log(`Server has started on: http://${host}:${port}/`);
});