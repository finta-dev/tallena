const { secret } = require('../config').jwt;
const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
    const token = req.headers.token;

    jwt.verify(token, secret, function(error, decoded){
        if(error || !decoded.properties.enabled){
            res.status(401).render('errors', {
                layout: false,
                statusCode: '401',
                title: 'Not Authorized',
                message: 'You do not have permission to access this page',
                linkHome: '/login',
                linkDescription: 'Sign In'
            });

            return;
        }

        next();
    });
}


module.exports = {
    authenticate: authenticate,
}