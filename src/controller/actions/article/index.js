const add = require('./add');
const edit = require('./edit');
const detail = require('./detail');
const list = require('./list');
const publish = require('./publish');

module.exports = {
    'article/add': add,
    'article/edit': edit,
    'article/detail': detail,
    'blog/list': list,
    'article/publish': publish,
}
