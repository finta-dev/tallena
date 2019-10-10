const { url } = require('../config').db;
const mongoose = require('mongoose');

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 7},
    about: {type: String},
    properties:{
        landing_page: {type: String, default: 'dashboard'},
        enabled: {type: Boolean, default: true},
    },
    createdBy: {type: mongoose.Types.ObjectId, required: true},
    updatedBy: {type: mongoose.Types.ObjectId, required: true},
},{
	timestamps:true,
});

const model = mongoose.model('user', schema);

module.exports = {
    model: model,
}