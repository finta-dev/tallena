const package = require('../package.json').bugs;

const errors = {
    
    e404:{
        layout: false,
        image: 'e404',
        statusCode: '404',
        title: 'Oops! Page Not Be Found',
        message: 'Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable',
        linkHome: '/',
        linkDescription: 'Back to homepage'
    },

    e401:{
        layout: false,
        statusCode: '401',
        image: 'e401',
        title: 'Not Authenticated',
        message: 'You have to log in to access this page',
        linkHome: '/login',
        linkDescription: 'Sign In'
    },

    e403:{
        layout: false,
        statusCode: '403',
        image: 'e403',
        title: 'Not Authorized',
        message: 'You do not have permission to access this page',
        linkHome: '/login',
        linkDescription: 'Contact the administrator'
    },

    e500:{
        layout: false,
        statusCode: '500',
        image: 'e500',
        title: 'Internal server error',
        message: 'The server encountered and internal server error or misconfiguration and was unable to complete your request',
        linkHome: package.url,
        linkDescription: 'Report an Issue'
    }
}

module.exports = errors;