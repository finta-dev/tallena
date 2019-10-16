//Dependecies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Configs
const { defaultSchemaOptions } = require('../config').db;
const { saltRounds } = require('../config').bcrypt;
//Helpers
const isObjectId = require('../helpers/isObjectId');
const like = require('../helpers/like');
const isEmpty = require('../helpers/isEmpty');


// Schema & Model
const schema = new mongoose.Schema({
    name: {type: String, required: true},
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
}, defaultSchemaOptions);

const model = mongoose.model('user', schema);


// Variables
const excludedFields = '-password -__v';


// Functions
async function getUser(id)
{
    if( !id ) { throw 'The "id" parameter is necessary' }
    if( !isObjectId(id) ) { throw 'The "id" parameter must be an ObjectID' }

    return await model
                .findById( id, excludedFields )
                .catch( error => { throw error });
}

async function getUsers(filter)
{
    let searchQuery = {};

    if( filter )
    {
        searchQuery = { 
            $or: 
            [
                { name: like(filter) },
                { username: like(filter) },
                { email: like(filter) },
            ]
        }
    }

    return await model
                .find(searchQuery, excludedFields)
                .catch(error => {
                    console.log(error);
                    throw error
                })
}

async function toggleUserAccess(id, updatedBy, updatedByName)
{
    if( !id ) { throw 'The "id" parameter is necessary' }
    if( !isObjectId(id) ) { throw 'The "id" parameter must be an ObjectID' }
    if( !updatedBy ) { throw 'The "updatedBy" parameter is necessary' }
    if( !updatedByName ) { throw 'The "updatedByName" parameter is necessary' }

    let userAccess = await getUser(id);
    userAccess = userAccess.properties.enabled;

    return await model
                .findByIdAndUpdate( id, { $set: { 'properties.enabled': !userAccess, 'updatedBy': updatedBy, 'updatedByName': updatedByName} })
                .catch( error => {
                    console.error(error);
                    throw error;
                });
}

async function updateUser(id ,updateObject, updatedBy, updatedByName)
{
    if( !id ) { throw 'The "id" parameter is necessary' }
    if( !isObjectId(id) ) { throw 'The "id" parameter must be an ObjectID' }
    if( !updatedBy ) { throw 'The "updatedBy" parameter is necessary' }
    if( !updatedByName ) { throw 'The "updatedByName" parameter is necessary' }
    if( isEmpty(updateObject) ) { throw 'The updateObject cant be empty' }

    delete updateObject._id;
    delete updateObject.id;
    delete updateObject.__v;
    delete updateObject.username;
    delete updateObject.password;
    delete updateObject.createdBy;
    delete updateObject.createdByName;
    delete updateObject.createdAt;
    delete updateObject.updatedBy;
    delete updateObject.updatedByName;
    delete updateObject.createdAt;

    return await model
                    .findByIdAndUpdate( id, { $set: updateObject, updatedBy: updatedBy, updatedByName: updatedByName }, {new: true})
                    .catch( error => {
                        console.error(error);
                        throw error;
                    })
}

async function createUser(createObject, createdBy, createdByName)
{
    if( !createdBy ) { throw 'The "createdBy" parameter is necessary' }
    if( !createdByName ) { throw 'The "createdByName" parameter is necessary' }
    if( isEmpty(createObject) ) { throw 'The createObject cant be empty' }

    delete createObject._id;
    delete createObject.id;
    delete createObject.createdAt;
    delete createObject.updatedAt;
    delete createObject.__v;

    createObject.createdBy = createdBy
    createObject.createdByName = createdByName;
    createObject.updatedBy = createdBy;
    createObject.updatedByName = createdByName;
    createObject.password = bcrypt.hashSync(createObject.password, saltRounds);

    const newUser = new model(createObject);
    
    return await newUser
                    .save()
                    .catch( error => {
                        console.error(error);
                        throw error;
                    })
}


// Exports
module.exports = {
    model: model,
    getUser: getUser,
    getUsers: getUsers,
    toggleUserAccess: toggleUserAccess,
    updateUser: updateUser,
    createUser: createUser,
}