const mongoose = require('mongoose');
const Joi = require('joi')

orderSchema =  new mongoose.Schema({
    customer: {type: new mongoose.Schema({
        name: {type:String,required:true},
        email: {type:String,required:true},        
    })},
    date: {type:Date,default:Date.now},
    movies: {type:Array,required:true},
    price: {type:Number,required:true},
    operation: {type:String,enum:['Rental','Purchase']}    
});

Order = mongoose.model('Order',orderSchema);

function ValidateOrder(order)
{
    schema = {
        customerId: Joi.objectId().required(),
        movies: Joi.array().items(Joi.objectId()).required(),
        operation: Joi.string().valid('Rental','Purchase').required()
    }
    return Joi.validate(order,schema);
}

module.exports.Order = Order;
module.exports.validate = ValidateOrder;