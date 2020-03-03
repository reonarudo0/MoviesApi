const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config')
const Joi =  require('Joi');

userSchema =  new mongoose.Schema({
    name: {type:String,required:true,minlength:5,maxlength:50},
    email: {type:String,required:true,unique:true,minlength:5,maxlength:50},
    password: {type:String,required:true,minlength:5,maxlength:1024},
    role: {type:String,default:'Customer',enum:['Customer','Employee','Admin']},
});

userSchema.methods.generateAuthenticationToken = ()=>{
    return jwt.sign({_id: this._id,role: this.role},config.get('jwtPrivateKey'));
}

User = mongoose.model('User',userSchema);

function ValidateUser(user)
{
    const schema = {
        name: Joi.String().required().min(5).max(50),
        email: Joi.email().required().min(5).max(50),
        password: Joi.String().required().min(5).max(1024),
        role: Joi.String()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = ValidateUser;