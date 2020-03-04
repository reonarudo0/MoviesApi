const logger = require('../config/logger');
require('express-async-errors');

module.exports = function ()
{
    logger.exceptions.handle();

    process.on('unhandledRejections',(ex)=>
    {        
        throw ex;
    });    
}