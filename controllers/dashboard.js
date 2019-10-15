const dashboard = require('../models/dashboard');


function render(req, res){
    res.status(200).render('dashboard', {
        header_title: 'Dashboard' 
    });
}


module.exports = {
    render: render,
}