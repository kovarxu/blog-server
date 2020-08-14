const { articleStat, findArticle } = require('../../../service/article');
const { selectFrom } = require('../../../utils/tool');

module.exports = {
  method: 'get',
  async action(ctx, { page, limit = 10, category, isShow }) {
    const start = (page - 1) * limit;
    const articleList = await findArticle(start, +limit, category, +isShow);
    const articleInfo = await articleStat();

    if (!articleList) {
      ctx.body = {
        ret: 3031,
        errmsg: '记录为空'
      }
    } else {
      ctx.body = {
        ret: 0,
        data: {
          count: articleInfo.count,
          list: articleList.map(item => selectFrom(item, [
            'title', 'describe', 'tags', 'addTime', 'support', 'id', 'modifyTime'
          ]))
        },
        errmsg: ''
      }
    }
  }
}
