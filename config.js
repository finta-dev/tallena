// App settings
app = {};
app.port = null;
app.host = null; //default 0.0.0.0


// Database settings
db = {};
db.host = null;
db.port = null;
db.database = null;
db.username = null;
db.password = null;
db.url = `mongodb://${db.host}:${db.port}/${db.database}`;
//db.url = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${database}`;


// JWT settings
jwt = {};
jwt.secret = null;


// Bcrypt settings
bcrypt = {};
bcrypt.saltRounds = null;


module.exports = {
    app: app,
    db: db,
    jwt: jwt,
    bcrypt: bcrypt,
};