const mongoose = require('mongoose');
const { mongoUrl } = require('../config');
const log4js = require('log4js');
const logger = log4js.getLogger();

// connect mongoose database
function connect() {
    mongoose.connect(mongoUrl, {useNewUrlParser: true});
}

mongoose.connection.on('connected', function() {
    logger.info('connected to mongodb');
})

mongoose.connection.on('error', function() {
    logger.info('connect to mongodb fail, restart after 5s');
    mongoose.disconnect();
    setTimeout(connect, 5000);
})

mongoose.connection.on('disconnected', function() {
    logger.info('connect to mongodb disconnected');
})

module.exports = {
    mongoose,
    connect
};
