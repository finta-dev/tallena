const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const { port, host } = require('./config').app;

let app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

routes(app);

app.use(function(req, res, next) {
    res.status(404).sendFile('error404.html', {root: __dirname + '/public'});
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error 500');
});

app.listen(port, host, function() {
    console.log(`Server has started on: http://${host}:${port}`);
});