const add = require('./add');
const edit = require('./edit');
const detail = require('./detail');
const list = require('./list');

module.exports = {
    'article/add': add,
    'article/edit': edit,
    'article/detail': detail,
    'blog/list': list
}
