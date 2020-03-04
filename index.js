const logger =  require('./config/logger');
const express =  require('express');
const app =  express()
const port = process.env.port || 3000;

require('./startup/loggingErrors')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();


app.listen(port,()=> logger.info(`Listening on port ${port}...`));