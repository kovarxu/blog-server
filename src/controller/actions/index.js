const login = require('./login');
const article = require('./article');
const comment = require('./comment');

module.exports = {
    ...login,
    ...article,
    ...comment
}
