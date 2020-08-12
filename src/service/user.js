const log4js = require('log4js');
const logger = log4js.getLogger();
const { wrappedDBMan } = require('../utils/db');
const { UserSchema, UserModel } = require('../model/user');

const userExists = wrappedDBMan(async (name) => {
    return await UserModel.findOne({ name }).exec();
})

const addUser = wrappedDBMan(async (name, email, password) => {
    if (await userExists(name)) {
        throw new Error('3003 user already exists');
    }
    const user = new UserModel({
        name, email, password
    })
    await user.save();
})

const login = wrappedDBMan(async (name, password) => {
    const userInfo = await userExists(name);

    if (!userInfo) {
        throw new Error('3004 user not exist');
    }
    if (password !== userInfo.password) {
        throw new Error('3005 password error');
    }
    return true;
})

module.exports = {
    userExists,
    addUser,
    login
}
