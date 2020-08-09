const log4js = require('log4js');
const logger = log4js.getLogger();

const sessions = {};

module.exports = {
    key: 'kovar_blog_session',
    async get(key) {
        console.log(key);
        return sessions[key];
    },

    async set(key, value) {
        sessions[key] = value;
    },

    async destroy(key) {
        sessions[key] = undefined;
    },
};

