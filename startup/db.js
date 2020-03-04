const mongoose = require('mongoose');
const logger = require('../config/logger');

module.exports = function ()
{
    mongoose.connect('mongodb://localhost/movies-api',
        {useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(()=> logger.info('Connected to MongoDB...'));    
}