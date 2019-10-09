// Middlewares
const { authenticate } = require('./middlewares/authenticate');

// Controllers
const { getUser, getUsers, createUser, deleteUser, updateUser } = require('./controllers/users');
const { login } = require('./controllers/login');

module.exports = function(app){
    app.post('/login', login);

    app.get('/users/:id', authenticate, getUser);
    app.get('/users', authenticate, getUsers); 
    app.post('/users', authenticate, createUser);
    app.delete('/users/:id', authenticate, deleteUser);
    app.patch('/users/:id', authenticate, updateUser);
}
