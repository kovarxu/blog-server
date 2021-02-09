const { searchCommentForArticle } = require('../../../service/comment');
const { selectFrom } = require('../../../utils/tool');

const EMPTY_TID = 0;

module.exports = {
  method: 'get',
  async action(ctx, { articleId }) {
      ctx.type = 'application/json';

      if (!articleId) {
          ctx.body = {
              ret: 4001,
              errmsg: '未传递文章Id'
          }
          return;
      }

      // flat的结构，需要构建成一个层级结构
      const dataList = await searchCommentForArticle(articleId);
      const result = [];
      const searchedMap = {};

      dataList.forEach((dataItem) => {
        const tId = dataItem.targetId;
        if (tId === EMPTY_TID) {
          const target = selectFrom(dataItem, ['content', 'targetId', 'time', 'commenter', {key: 'id', origKey: '_id'}]);
          target.subordinate = [];
          result.push(target);
          searchedMap[dataItem._id] = target;
        } else {
          const target = searchedMap[tId];
          target.subordinate.push(selectFrom(dataItem, ['content', 'targetId', 'time', 'commenter', {key: 'id', origKey: '_id'}]));
        }
      })

      ctx.body = {
        ret: 0,
        data: {
          // 后到的评论时间顺序高，需要反转一下
          list: result.reverse()
        },
        errmsg: ''
      }
  }
}
