const { secret } = require('../config').jwt;
const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
    const token = req.headers.token;

    jwt.verify(token, secret, function(error, decoded){
        if(error){
            res.status(401).send('Error 401');
            return;
        }
        next();
    });
}


module.exports = {
    authenticate: authenticate,
}