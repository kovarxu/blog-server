const { action } = require('./register');
const { getHash } = require('../../../utils/tool');

module.exports = {
  method: 'post',
  async action(ctx) {
    return await action(ctx, {
      username: 'YK_' + getHash(Math.random().toString(28)),
      email: 'email@fake.com',
      password: 'fake_passwd'
    });
  }
}
