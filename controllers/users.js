const users = require('../models/users');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config').bcrypt;
const isObjectId = require('../helpers/isObjectId');
const cleanObjects = require('../helpers/cleanObjects');
const jwt = require('jsonwebtoken');
const matchObjects = require('../helpers/matchObjects');


async function getUser(req, res){
    const id = req.params.id;

    const user = await users
                        .getUser(id)
                        .catch( error => {
                            console.log(error);
                            res.status(400).header('statusText', error).send();
                        })
    
    res.send(user);
};

async function getUsers(req, res){

    const usersList = await users
                        .getUsers()
                        .catch(error => {
                            console.log(error);
                            res.status(400).header('statusText', error).send();
                        });

    res.status(200).send(usersList);
};

async function toggleUserAccess(req, res){
    const id = req.params.id;
    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);

    const userAccess = await users
                                .toggleUserAccess(id, payload._id, `${payload.name} ${payload.lastname}`)
                                .catch( error => {
                                    console.log(error);
                                    res.status(400).header('statusText', error).send();
                                });

    res.status(200).send(userAccess);
}

function updateUser(req, res){
    const id = req.params.id;
    const payload = jwt.decode(req.headers.token);

    if( !isObjectId( id ) )
    {
        res.status(400).send();
        return;
    }

    const schema = {
        name: null,
        lastname: null,
        email: null,
        about: null,
        properties:{
            enabled: null,
            forceChangePassword: null,
        },
        defaults:{
            landingPage: null,
            warehouse: null,
            company: null,
        },
        permissions:{
            warehouses: null,
            companies: null,
        }
    }

    const updateObject = matchObjects(req.body, schema);

    users.model
        .findByIdAndUpdate( id, { $set: updateObject, createdBy: payload._id, updatedBy: payload._id, }, {new: true})
        .then( data => {
            if(!data){
                res.status(404).send('No se encontró el usuario');
                return;
            }

            res.status(200).send(data);
        })
        .catch( error => {
            console.error(error);
            res.status(400).send();
        })
}

function createUser(req, res){

    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    console.log(req.body.defaults.landingPage);

    const user = new users.model({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        about: req.body.about,
        phone: req.body.phone,
        properties:{
            enabled: req.body.enabled,
            forceChangePassword: req.body.forceChangePassword
        },
        defaults:{
            landingPage: req.body.landingPage,
        },
        permissions:{
            warehouses: req.body.permissions.warehouses,
            companies: req.body.permissions.companies,
        },
        createdBy: payload._id,
        createdByName: `${payload.name} ${payload.lastname}`,
        updatedBy: payload._id,
        updatedByName: `${payload.name} ${payload.lastname}`,
    });

    user
        .save()
        .then( data => {
            res.status(200).send(data);
        })
        .catch( error => {
            res.status(400).send(error);
        })
};

async function render(req, res){

    const userList = await users.getUsers();

    res.status(200).render('users', {
        header_title: 'Usuarios',
        userData: userList,
    });
}

module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    toggleUserAccess: toggleUserAccess,
    updateUser: updateUser,
    createUser: createUser,
    render: render,
}