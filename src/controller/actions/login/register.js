const UserService = require('../../../service/user');

module.exports = {
    method: 'post',
    async action (ctx, { username, email, password }) {
        ctx.type = 'application/json';

        if (!username || !email || !password) {
            ctx.body = {
                ret: 3020,
                errmsg: 'necessary information not found'
            }
            return;
        }
        
        // create service
        const login = await UserService.addUser(username, email, password);

        // error happened
        if (typeof login === 'string') {
            const mlogin = login.match(/^(\d{4}) (.*)/);
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
            return;
        }
        
        ctx.body = {
            ret: 0,
            errmsg: ''
        };
    }
}
