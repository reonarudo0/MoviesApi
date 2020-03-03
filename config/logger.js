const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    transports:
    [
        new winston.transports.Console({
            level:'info',            
            format: winston.format.combine(winston.format.colorize(),winston.format.simple())                        
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logfile.log',
            format: winston.format.combine(winston.format.prettyPrint(),winston.format.timestamp(),winston.format.simple())
        })                
    ],
    exceptionHandlers: 
    [
        new winston.transports.Console({
            level:'error',            
            format: winston.format.combine(winston.format.colorize(),winston.format.prettyPrint())                        
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'uncaughtExceptions.log',
            format: winston.format.combine(winston.format.colorize(),winston.format.timestamp())
        }),      
        new winston.transports.MongoDB({
            level: 'error',
            db: 'mongodb://localhost/movies-api',
            collection: 'errors', 
            format: winston.format.json()
        })
    ]
})


module.exports = logger;