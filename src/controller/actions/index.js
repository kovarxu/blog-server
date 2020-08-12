const login = require('./login');
const article = require('./article');

module.exports = {
    ...login,
    ...article
}
