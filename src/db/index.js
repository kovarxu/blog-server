const mongoose = require('mongoose');
const { mongoUrl } = require('../config');
const log4js = require('log4js');
const logger = log4js.getLogger();

// connect mongoose database
mongoose.connect(mongoUrl, {useNewUrlParser: true});

mongoose.connection.on('connected', function() {
    logger.info('connected to mongodb');
})

mongoose.connection.on('error', function() {
    logger.info('connect to mongodb fail');
})

mongoose.connection.on('disconnected', function() {
    logger.info('connect to mongodb disconnected');
})

module.exports = mongoose;
