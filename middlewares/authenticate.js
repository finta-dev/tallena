const { secret } = require('../config').jwt;
const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
    const token = req.headers.token;

    jwt.verify(token, secret, function(error, decoded){
        if(error){
            res.status(401).send('Error 401');
            return;
        };
        
        if(!decoded.properties.enabled){
            res.status(401).send('El usuario se encuentra deshabilitado');
            return;
        };

        next();
    });
}


module.exports = {
    authenticate: authenticate,
}