const mongoose =  require('mongoose');
const Joi = require('joi');

genreSchema = new mongoose.Schema({
    name: {type:String,require:true,unique:true,minlength:3,maxlength:50},
});

Genre = mongoose.model('Genre',genreSchema);

function ValidateGenre(genre)
{
    const schema = {
        name: Joi.string().required().min(3).max(50)
    };
    return Joi.validate(genre,schema);
}

exports.Genre = Genre;
exports.validate = ValidateGenre;
