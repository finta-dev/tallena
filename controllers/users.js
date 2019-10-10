const users = require('../models/users');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config').bcrypt;
const isObjectId = require('../helpers/isObjectId');
const jwt = require('jsonwebtoken');


function getUser(req, res){
    const id = req.params.id;

    if( !isObjectId( id ) )
    {
        res.status(400).send();
        return;
    }
    
    users.model
        .findById( id )
        .then( data => {
            if(!data){
                res.status(404).send();
                return;
            }
            res.status(200).send(data);
        })
        .catch( error => {
            res.status(400).send(error.message);
        })
};

function getUsers(req, res){
    users.model
        .find({}, '-password -__v')
        .then(data => {
            
            if(data.length === 0 || data === undefined){
                res.status(204).send();
                return;
            }

            res.status(200).send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send();
        })
};

function deleteUser(req, res){
    const id = req.params.id;
    const payload = jwt.decode(req.headers.token);

    if( !isObjectId( id ) )
    {
        res.status(400).send();
        return;
    }

    users.model
        .findByIdAndUpdate( id, { $set: { 'properties.enabled': false, 'updatedBy': payload._id} })
        .then( data => {
            res.status(200).send();
        })
        .catch( error => {
            console.error(error);
            res.status(400).send();
        })
}

function updateUser(req, res){

}

function createUser(req, res){

    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const payload = jwt.decode(req.headers.token);

    const user = new users.model({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        about: req.body.about,
        createdBy: payload._id,
        updatedBy: payload._id
    });

    user
        .save()
        .then( data => {
            res.status(200).send(data);
        })
        .catch( error => {
            res.status(400).send(error.errmsg);
        })
};

module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,
    createUser: createUser,
}