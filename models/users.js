const mongoose = require('mongoose');
const { url } = require('../config').db;
const isObjectId = require('../helpers/isObjectId');


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});


const schema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 7},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
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
    createdByName: {type: String, required: true},
    updatedBy: {type: mongoose.Types.ObjectId, required: true},
    updatedByName: {type: String, required: true}
},{
	timestamps:true,
});


const model = mongoose.model('user', schema);


async function getUser(id)
{
    if( !id )
    {
        throw 'The "id" parameter is necessary'
    }

    if( !isObjectId( id ) )
    {
        throw 'The "id" parameter must be an ObjectID'
    }

    return await model
                .findById( id, '-password -__v' )
                .catch( error => { throw error });

}

async function getUsers()
{
    return await model
                .find({}, '-password -__v')
                .catch(error => {
                    console.log(error);
                    throw error
                })
}

async function toggleUserAccess(id, updatedBy, updatedByName)
{
    let userAccess = await getUser(id);
    userAccess = userAccess.properties.enabled;

    return await model
                .findByIdAndUpdate( id, { $set: { 'properties.enabled': !userAccess, 'updatedBy': updatedBy, 'updatedByName': updatedByName} })
                .catch( error => {
                    console.error(error);
                    throw error;
                });
}

module.exports = {
    model: model,
    getUser: getUser,
    getUsers: getUsers,
    toggleUserAccess: toggleUserAccess,
}