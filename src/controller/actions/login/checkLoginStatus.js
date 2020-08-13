module.exports = {
    method: 'get',
    action (ctx) {
        ctx.type = 'application/json';
        const user = ctx.session.user;
        ctx.body = {
          ret: 0,
          data: {
            isLogin: user ? 1: 0,
            user
          }
        }
    }
}
