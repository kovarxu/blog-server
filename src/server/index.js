const Koa = require('koa2');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const KoaStaticServer = require('koa-static-server');
const KoaSession = require('koa-session');
const cors = require('../middlewares/cors');
const sessionOptions = require('../middlewares/session');
const fs = require('fs');

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
app.use(KoaBody({
    multipart: true,
    formidable: {
        // multiples: true, // 接受多文件上传，默认为false
        // uploadDir: os.tmpDir() 文件上传路径，默认为系统临时文件夹
        keepExtensions: true // 保留文件原本的扩展名，否则没有扩展名，默认为false
    }
}));

router.get('/', (ctx) => {
    ctx.body = fs.readFileSync('./static/index.html');
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

const port = process.env.NODE_ENV === 'production' ? 80 : 3001;

app.listen(port, () => {
    console.log('server running on port ' + port);
});
