// Middlewares
const { authenticate } = require('./middlewares/authenticate');

// Controllers
const users = require('./controllers/users');
const login = require('./controllers/login');

module.exports = function(app){
    app.get('/login', login.render)
    app.post('/login', login.signIn);

    app.get('/users', authenticate, users.render)
    app.get('/api/users/:id', authenticate, users.getUser);
    app.get('/api/users', authenticate, users.getUsers); 
    app.post('/api/users', authenticate, users.createUser);
    app.delete('/api/users/:id', authenticate, users.deleteUser);
    app.patch('/api/users/:id', authenticate, users.updateUser);
}
