const { addComment } = require('../../../service/comment');
const { action: registerTempUser } = require('../login/registerTempUser');
const { escape } = require('../../../utils/url');

module.exports = {
  method: 'post',
  async action(ctx, { time, articleId, targetId, content, commenter }) {
    ctx.type = 'application/json'

    if (!articleId) {
      ctx.body = {
        ret: 4001,
        errmsg: '未传递文章Id',
      }
      return
    }

    if (!content) {
      ctx.body = {
        ret: 4002,
        errmsg: '评论为空',
      }
      return
    }

    if (content && content.length > 500) {
      ctx.body = {
        ret: 4003,
        errmsg: '评论太长，最多输入500个字',
      }
      return
    }

    try {
      let tmpUser = false;
      // 不存在评论人，先创建个临时账号
      if (! commenter) {
        commenter = await registerTempUser(ctx);
        tmpUser = true;
      }
      
      await addComment({
        time,
        articleId,
        targetId,
        content: content,
        commenter,
      })

      const bkData = tmpUser ? {newUser: commenter} : {};
      ctx.body = {
        ret: 0,
        data: bkData,
        errmsg: '评论成功',
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        ret: 40010,
        errmsg: '评论失败',
      }
    }
  },
}
