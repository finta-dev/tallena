const users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config').jwt;

function login(req,res)
{
    users.model
        .findOne({ username: req.body.username })
        .then( data => {

            if(!data){
                res.status(204).send('No existe el usuario');
                return;
            }
            if(!data.properties.enabled){
                res.status(401).send('El usuario se encuentra deshabilitado');
                return;
            }

            var payload = data.toJSON();

            bcrypt
                .compare(req.body.password, payload.password)
                .then( same => {
                    if( !same ){
                        res.status(401).send('Las contraseñas es incorrecta');
                        return;
                    }

                    jwt.sign(payload, secret, {expiresIn: '180s'}, function(error, token){
                        if( error ){
                            res.status(400).send( error )
                            console.error(error);
                            return;
                        }

                        res.status(200).header('token', token).send();
                    })
                })
                .catch( error => console.error(error) )
        })
        .catch( error => console.error(error) )
}

module.exports = {
    login: login,
}