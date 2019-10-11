const express = require('express');
const helmet = require('helmet');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { port, host } = require('./config').app;
const errors = require('./models/errors');

let app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

routes(app);

app.use(function(req, res, next) {
    res.status(404).render('errors', errors.e404);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('errors', errors.e500);
});

app.listen(port, host, function() {
    console.log(`Server has started on: http://${host}:${port}`);
});