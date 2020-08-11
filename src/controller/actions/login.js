const UserService = require('../../service/user');

module.exports = {
    method: 'get',
    async action (ctx, { username, password }) {
        ctx.type = 'application/json';

        if (!username) {
            ctx.body = {
                ret: 3001,
                errmsg: 'username not found'
            }
            return;
        }
        if (!password) {
            ctx.body = {
                ret: 3001,
                errmsg: 'password not found'
            }
            return;
        }
        
        // create service
        const login = await UserService.login(username, password);
        if (login === true) {
            ctx.session.user = username;
            ctx.body = {
                ret: 0,
                errmsg: ''
            };
        } else {
            const mlogin = login.match(/^(\d{4,5}) (.*)/);
            if (!mlogin) {
                ctx.body = {
                    ret: 10001,
                    errmsg: 'unexpected error'
                }
            }
            ctx.body = {
                ret: +mlogin[1],
                errmsg: mlogin[2]
            }
        }
        
    }
}
