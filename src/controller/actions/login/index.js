const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const checkLoginStatus = require('./checkLoginStatus');
const registerTempUser = require('./registerTempUser');

module.exports = {
  login,
  logout,
  register,
  registerTempUser,
  checkLoginStatus,
}
