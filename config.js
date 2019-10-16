// App settings
app = {};
app.port = 3000;
app.host = 'localhost'; //default 0.0.0.0


// Database settings
db = {};
db.host = 'localhost';
db.port = 27017;    //default 27017
db.database = 'tallena';
db.username = null;
db.password = null;
db.uri = `mongodb://${db.host}:${db.port}/${db.database}`;
db.connectionOptions = {
    // https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
    useCreateIndex: true, 
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}
db.defaultSchemaOptions = {
    // https://mongoosejs.com/docs/api/schema.html#schema_Schema
    _id: true,
    bufferCommands: true,
    id: true,
    minimize: true,
    skipVersioning: true,
    timestamps: true,
}


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