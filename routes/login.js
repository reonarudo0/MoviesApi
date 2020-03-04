const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const _ = require('lodash');
const express = require('express');
const Joi = require('joi');
const router =  express.Router();
const config = require('config');
const jwt =  require('jsonwebtoken');

router.post('/',async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');
    
    const token = user.generateAuthenticationToken();
    res.send(token);
});


function validateLogin(user)
{
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    };
    return Joi.validate(user,schema);
}

module.exports = router;