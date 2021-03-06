const users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isAlpha } = require('validator');
const { secret } = require('../config').jwt;

function login(req,res)
{
    if( !req.body.username || !req.body.password )
    {
        res.status(400).header('statusText', 'Debe ingresar el usuario o la contraseña').send();
        return;
    }

    const username = req.body.username;
    const password = req.body.password;

    if( !isAlpha(username) )
    {
        res.status(400).header('statusText', 'El usuario contiene caracteres invalidos').send();
        return;
    }

    username.trim().toLowerCase();
    password.trim();
    
    users.model
        .findOne({ username: username })
        .then( data => {

            if(!data){
                res.status(204).header('statusText', 'No existe el usuario').send();
                return;
            }

            var payload = data.toJSON();

            bcrypt
                .compare(password, payload.password)
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
                            .status(200)
                            .cookie('accessToken', token, { httpOnly: true })
                            .header('accessToken', token)
                            .header('_id', payload._id)
                            .send();
                    })
                })
                .catch( error => console.error(error) )
        })
        .catch( error => console.error(error) )
}

function logout(req,res)
{
    res.clearCookie('accessToken').redirect('/');
}

function render(req, res){
    res.status(200).render('login', { layout: false });
}

module.exports = {
    login: login,
    logout: logout,
    render: render,
}