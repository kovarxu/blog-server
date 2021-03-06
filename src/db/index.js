const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const log4js = require('log4js');
const { mongoUrl } = require('../config');
const logger = log4js.getLogger();

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// auto increment plugin
autoIncrement.initialize(mongoose.connection);

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
