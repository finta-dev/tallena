const users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config').jwt;

function signIn(req,res)
{
    users.model
        .findOne({ username: req.body.username })
        .then( data => {

            if(!data){
                res.status(204).header('statusText', 'No existe el usuario').send();
                return;
            }

            var payload = data.toJSON();

            bcrypt
                .compare(req.body.password, payload.password)
                .then( same => {
                    if( !same ){
                        res.status(401).header('statusText', 'La contraseña es incorrecta').send();
                        return;
                    }

                    if(!payload.properties.enabled){
                        res.status(401).header('statusText', 'El usuario se encuentra deshabilitado').send();
                        return;
                    }

                    jwt.sign(payload, secret, {expiresIn: '3600s'}, function(error, token){
                        if( error ){
                            res.status(400).send( error )
                            console.error(error);
                            return;
                        }

                        res
                            .status(300)
                            .cookie('accessToken', token, { httpOnly: true })
                            .header('accessToken', token)
                            .send();
                    })
                })
                .catch( error => console.error(error) )
        })
        .catch( error => console.error(error) )
}

function render(req, res){
    res.status(200).render('login');
}

module.exports = {
    signIn: signIn,
    render: render,
}