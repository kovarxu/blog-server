const { searchArticle } = require('../../../service/article');

module.exports = {
  method: 'get',
  async action(ctx, { id }) {
    const article = await searchArticle(id);
    if (article) {
      const {
        title,
        body = '',
        addTime,
        comments,
        support = 0
      } = article;

      ctx.body = {
        ret: 0,
        data: {
          title,
          body,
          addTime,
          comments,
          support,
        },
        errmsg: ''
      }
    } else {
      ctx.body = {
        ret: 3030,
        errmsg: '未找到指定文章'
      }
    }
  }
}
