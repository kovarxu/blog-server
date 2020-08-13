const log4js = require('log4js');
const logger = log4js.getLogger();
const { wrappedDBMan } = require('../utils/db');
const { UserSchema, UserModel } = require('../model/user');

const userExists = wrappedDBMan(async (name) => {
    return await UserModel.findOne({ name }).exec();
})

const emailExists = wrappedDBMan(async (email) => {
    return await UserModel.findOne({ email }).exec();
})

const addUser = wrappedDBMan(async (name, email, password) => {
    if (await userExists(name)) {
        throw new Error('3003 该用户名已存在');
    }
    if (await emailExists(name)) {
        throw new Error('3006 email已经存在');
    }
    const user = new UserModel({
        name, email, password
    })
    await user.save();
})

const login = wrappedDBMan(async (name, password) => {
    const userInfo = await userExists(name);

    if (!userInfo) {
        throw new Error('3004 该用户不存在');
    }
    if (password !== userInfo.password) {
        throw new Error('3005 密码输入有误');
    }
    return true;
})

module.exports = {
    userExists,
    addUser,
    login
}
