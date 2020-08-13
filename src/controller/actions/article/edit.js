const { editArticle } = require('../../../service/article');
const { userExists } = require('../../../service/user');

module.exports = {
    method: 'post',
    async action(ctx, { id, title, body, describe, tags }) {
        ctx.type = 'application/json';

        const user = ctx.session.user;
        if (!user) {
            ctx.body = {
                ret: 3021,
                errmsg: '请登录后修改'
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

        const result = await editArticle(id, {
            title,
            body,
            describe,
            tags
        })

        if (result === true) {
            ctx.body = {
                ret: 0,
                errmsg: '修改文章成功'
            }
        } else {
            ctx.body = {
                ret: 10002,
                errmsg: '修改文章失败'
            }
        }
    }
}
