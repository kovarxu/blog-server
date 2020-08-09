const Koa = require('koa2');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaStaticServer = require('koa-static-server');
const KoaSession = require('koa-session');
const cors = require('../middlewares/cors');
const sessionOptions = require('../middlewares/session');

// logger
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

// mongoose
global.moon = require('../db');

const api = require('../middlewares/api');

const app = new Koa();
const router = new KoaRouter();

// session
app.keys = ['exponential_kovar_self', '@#!FUKKElY'];
app.use(KoaSession(sessionOptions, app));

// CORS
app.use(cors({
    origin: true,
    maxAge: 6*60*60,
    credentials: true,
    methods: ['GET', 'POST', 'PUT']
}));

// body parser
app.use(KoaBody());

router.get('/', (ctx) => {
    ctx.body = `<div>Hello</div>
        <div>session: ${JSON.stringify(ctx.session)}</div>
    `;
    const view = ctx.session.view;
    if (view) {
        ctx.session.view ++;
    } else {
        ctx.session.view = 1;
    }
    ctx.type = 'html';
})

app.use(router.routes());

// static files
app.use(KoaStaticServer({
    rootDir: './static',
    rootPath: '/static',
    notFoundFile: './404.html',
    gzip: true,
    hidden: false,
}))

// api middleware
app.use(api);

app.listen(3001, () => {
    console.log('server running on port 3001');
});
