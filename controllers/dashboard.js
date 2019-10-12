const dashboard = require('../models/dashboard');


function render(req, res){
    res.status(200).render('dashboard');
}


module.exports = {
    render: render,
}