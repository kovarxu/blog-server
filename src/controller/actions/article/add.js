const { addArticle } = require('../../../service/article');
const { userExists } = require('../../../service/user');
const crypto = require('crypto');

module.exports = {
    method: 'post',
    async action(ctx, { title, body, describe, tags }) {
        ctx.type = 'application/json';

        const user = ctx.session.user;
        if (!user) {
            ctx.body = {
                ret: 3021,
                errmsg: '请登录后保存'
            }
            return;
        }

        const userInfo = await userExists(user);
        if (!userInfo) {
            ctx.body = {
                ret: 3022,
                errmsg: '用户数据非法'
            }
            return;
        }

        const userId = userInfo._id; // ObjectId

        if (!title || /^\s*$/.test(title)) {
            ctx.body = {
                ret: 3023,
                errmsg: '请输入文章标题'
            }
            return;
        }

        const hash = crypto.createHash('md5');
        hash.update(Date.now() + '');
        hash.update(title);
        const id = hash.digest('hex').slice(2, 10);

        const result = await addArticle({
            id,
            title,
            author: userId,
            body,
            describe,
            tags
        })

        if (result === true) {
            ctx.body = {
                ret: 0,
                errmsg: '添加文章成功'
            }
        } else {
            ctx.body = {
                ret: 10002,
                errmsg: '添加文章失败'
            }
        }
    }
}
