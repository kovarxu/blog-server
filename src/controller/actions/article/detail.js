const { searchArticle } = require('../../../service/article');

module.exports = {
  method: 'get',
  async action(ctx, { id }) {
    const article = await searchArticle(id);
    if (article) {
      const {
        title,
        body = '',
        describe = '',
        addTime,
        comments,
        support = 0,
        category,
        tags,
      } = article;

      ctx.body = {
        ret: 0,
        data: {
          title,
          body,
          describe,
          addTime,
          comments,
          support,
          category,
          tags
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
