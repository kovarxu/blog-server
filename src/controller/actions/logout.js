module.exports = {
    method: 'get',
    action (ctx) {
        ctx.session.user = null;
        ctx.body = '';
    }
}
