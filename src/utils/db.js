const log4js = require('log4js');
const logger = log4js.getLogger();

function wrappedDBMan(fn) {
    return async function(...rest) {
        try {
            return await fn(...rest);
        } catch(e) {
            logger.error(e.message);
            if (e && e.message.match(/^\d{4,5}/)) {
                return e.message;
            } else {
                throw e;
            }
        }
    }
}

module.exports = {
    wrappedDBMan
}
