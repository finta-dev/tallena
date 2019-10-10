// App settings
app = {};
app.port = 3000;
app.host = 'localhost'; //default 0.0.0.0


// Database settings
db = {};
db.host = 'localhost';
db.port = 27017;
db.database = 'tallena';
db.username = null;
db.password = null;
db.url = `mongodb://${db.host}:${db.port}/${db.database}`;
//db.url = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${database}`;


// JWT settings
jwt = {};
jwt.secret = 'tallena';


// Bcrypt settings
bcrypt = {};
bcrypt.saltRounds = 10;


module.exports = {
    app: app,
    db: db,
    jwt: jwt,
    bcrypt: bcrypt,
};