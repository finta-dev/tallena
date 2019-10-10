const { url } = require('../config').db;
const mongoose = require('mongoose');

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 7},
    email: {type: String, required: true, unique: true},
    about: {type: String},
    properties:{
        enabled: {type: Boolean, default: true},
        forceChangePassword: {type: Boolean, default: false}
    },
    defaults:{
        landingPage: {type: String, default: 'dashboard'},
        warehouse: {type: mongoose.Types.ObjectId},
        company: {type: mongoose.Types.ObjectId},
    },
    permissions:{
        warehouses: {type: Array},
        companies: {type: Array},
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