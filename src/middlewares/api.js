const actions = require('../controller/actions');
const apis = require('../controller/api');
const {matchMethods} = require('../utils/url');
const log4js = require('log4js');
const logger = log4js.getLogger();

// api
module.exports = async (ctx, next) => {
    const match = ctx.path.match(/^\/(action|api)\/(.*)$/);
    if (match) {
        const [_, type, item] = match;
        if (type === 'action' && item in actions) {
            ctx.type = 'application/json';
            const { method, action } = actions[item];
            if (matchMethods(ctx.method, method)) {
                const params = ctx.method === 'GET' ? ctx.query : ctx.request.body;
                logger.debug(`${ctx.path} called with method ${ctx.method} and params ${JSON.stringify(params)}`);
                await action.call(ctx, ctx, params);
            }
        }

        if (type === 'api' && item in apis) {
            ctx.type = 'application/json';
            const { method, action } = apis[item];
            if (matchMethods(ctx.method, method)) {
                const params = ctx.method === 'GET' ? ctx.query : ctx.request.body;
                logger.debug(`${ctx.path} called with method ${ctx.method}`);
                await action.call(ctx, ctx, params);
            }
        }
    }
    next();
}
