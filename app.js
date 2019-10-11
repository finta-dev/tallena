const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const { port, host } = require('./config').app;
const exphbs  = require('express-handlebars');
const package = require('./package.json').bugs;

let app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

routes(app);

app.use(function(req, res, next) {
    res.status(404).render('errors', {
        layout: false,
        statusCode: '404',
        title: 'Oops! Page Not Be Found',
        message: 'Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable',
        linkHome: '/dashboard',
        linkDescription: 'Back to homepage'
    })
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('errors', {
        layout: false,
        statusCode: '500',
        title: 'Internal server error',
        message: 'The server encountered and internal server error or misconfiguration and was unable to complete your request',
        // linkHome: 'http://google.com.ar',
        linkHome: package.url,
        linkDescription: 'Report an Issue'
    });
});

app.listen(port, host, function() {
    console.log(`Server has started on: http://${host}:${port}`);
});