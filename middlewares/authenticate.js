const jwt = require('jsonwebtoken');
const errors = require('../models/errors');
const { secret } = require('../config').jwt;


function authenticate(req,res,next){
    const token = req.cookies.accessToken || req.headers.accessToken;

    if(!token)
    {
        if( req.route.path !== '/' )
        {
            res
            .status(401)
            .clearCookie('accessToken')
            .render('errors', errors.e401);

            return;
        }

        res.status(300).redirect('/login');
    }
    else
    {
        jwt.verify(token, secret, function(error, decoded){
            if( error || !decoded.properties.enabled ){
                res
                    .status(401)
                    .clearCookie('accessToken')
                    .render('errors', errors.e401)
    
                return;
            }
            
            res.locals.landingPage = decoded.defaults.landingPage;
            next();
        });
    }
}


module.exports = {
    authenticate: authenticate,
}