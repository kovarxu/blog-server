const { editArticle } = require('../../../service/article');

module.exports = {
  method: 'get',
  async action(ctx, { id }) {
    if (id) {
      const result = await editArticle(id, { isShow: true });
      if (result === true) {
        ctx.body = {
          ret: 0,
          data: { id },
          errmsg: ''
        }
        return ;
      }
    }
    ctx.body = {
      ret: 3062,
      errmsg: '发布失败'
    }
  }
}
