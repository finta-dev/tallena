const users = require('../models/users');
const jwt = require('jsonwebtoken');


async function getUser(req, res)
{
    const id = req.params.id;

    const user = await users
                        .getUser(id)
                        .catch( error => {
                            console.error(error);
                            res.status(400).header('statusText', error).send();
                        })
    
    res.send(user);
};

async function getUsers(req, res)
{
    const filter = req.query.filter;
    const usersList = await users
                        .getUsers(filter)
                        .catch(error => {
                            console.log(error);
                            res.status(400).header('statusText', error).send();
                        });

    res.status(200).send(usersList);
};

async function toggleUserAccess(req, res)
{
    const id = req.params.id;
    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);

    const userAccess = await users
                                .toggleUserAccess(id, payload._id, payload.name)
                                .catch( error => {
                                    console.log(error);
                                    res.status(400).header('statusText', error).send();
                                });

    res.status(200).send(userAccess);
}

async function updateUser(req, res)
{
    const id = req.params.id;
    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);

    const updatedUser = await users
                                .updateUser(id, req.body, payload._id, payload.name)
                                .catch(error => {
                                    console.error(error);
                                    res.status(400).header('statusText', error);
                                })

    res.status(200).send(updatedUser);
}

async function createUser(req, res)
{
    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);

    const newUser = await users
                            .createUser(req.body, payload._id, payload.name)
                            .catch( error => {
                                console.error(error);
                                res.status(400).header('statusText', error);
                            })
    
    res.status(200).send(newUser);
};

async function render(req, res)
{
    const filter = req.query.filter;
    const token = req.cookies.accessToken || req.headers.accessToken;
    const payload = jwt.decode(token);

    let userList = await users
                            .getUsers(filter)
                            .catch(error => {
                                console.log(error);
                                res.status(400).header('statusText', error).send();
                            });

    res.status(200).render('users', {
        header_title: 'Usuarios',
        userList: userList,
        userData: payload,
    });
}

module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    toggleUserAccess: toggleUserAccess,
    updateUser: updateUser,
    createUser: createUser,
    render: render,
}