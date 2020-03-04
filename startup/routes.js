const express = require('express');

const genres = require('../routes/genres');
const movies = require('../routes/movies');
const userRegister = require('../routes/users');
const login = require('../routes/login');


module.exports =  function(app)
{
    app.use(express.json());
    app.use('/api/genres',genres);
    app.use('/api/movies',movies);
    app.use('/api/register',userRegister);
    app.use('/api/login',login);

}

