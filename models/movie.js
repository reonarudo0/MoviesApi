const mongoose =  require('mongoose');
const Joi =  require('joi');

movieSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength:3,maxlength:50},
    genre: {type:Array,required:true},
    rentalValue: {type:Number,required:true},
    sellValue: {type:Number,required:true},
    numberInStock: {type:Number,required:true}    
});

Movie = mongoose.model('Movie',movieSchema);

function ValidateMovie(movie)
{
    const schema = {
        name: Joi.string().required().min(3).max(50),
        genreId: Joi.array().items(Joi.objectId()).required(),
        rentalValue: Joi.number().required().min(0),
        sellValue: Joi.number().required().min(0),
        numberInStock: Joi.number().required().min(0)
    };
    return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = ValidateMovie;