const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config')
const Joi =  require('Joi');

userSchema =  new mongoose.Schema({
    name: {type:String,required:true,minlength:5,maxlength:50},
    email: {type:String,required:true,unique:true,minlength:5,maxlength:50},
    password: {type:String,required:true,minlength:5,maxlength:1024},
    role: {type:String,default:'Customer',enum:['Customer','Employee','Admin']},
});

userSchema.methods.generateAuthenticationToken = function(){
    const token = jwt.sign(_.pick(this,['name','role']), config.get('jwtPrivateKey'));    
    return token;
}

User = mongoose.model('User',userSchema);

function ValidateUser(user)
{
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(50),
        password: Joi.string().required().min(5).max(1024),
        role: Joi.string()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = ValidateUser;