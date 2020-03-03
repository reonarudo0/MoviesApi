const mongoose =  require('mongoose');
const Joi =  require('joi');

movieSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength:3,maxlength:50},
    genre: {type:String,required:true},
    rentalValue: {type:Number,required:true},
    sellValue: {type:Number,required:true},
    numberInStock: {type:Number,required:true}    
});

Movie = mongoose.model('Movie',movieSchema);

function ValidadeMovie(movie)
{
    const schema = {
        name: Joi.String().required().min(3).max(50),
        genreId: Joi.ObjectId().required(),
        rentalValue: Joi.Number().required().min(0),
        sellValue: Joi.Number().required().min(0),
        numberInStock: Joi.Number().required().min(0)
    };
    return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = ValidadeMovie;