const users = require('../models/users');
const bcrypt = require('bcrypt');

function getUser(req, res){
    const id = req.params.id;
    
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
            console.error(error);
            res.status(400).send(error.message);
        })
};

function getUsers(req, res){

};

function deleteUser(req, res){

}

function updateUser(req, res){

}

function createUser(req, res){
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const user = new users.model({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        about: req.body.about,
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

module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,
    createUser: createUser,
}