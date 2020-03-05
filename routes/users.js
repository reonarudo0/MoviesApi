const {User,validate} = require('../models/user');
const authorization =  require('../middleware/userAuthorization');
const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/me',authorization,async(req,res)=>{
    const user = User.findById(req.user._id).select({password:-1});
    res.send(user);    
});

router.post('/register', async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registred.');

    user = new User(_.pick(req.body,['name','email','password','role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthenticationToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email']));
});

module.exports = router;