const log4js = require('log4js');
const logger = log4js.getLogger();
const { wrappedDBMan } = require('../utils/db');
const { CommentSchema, CommentModel } = require('../model/comment');

// 新增评论
const addComment = wrappedDBMan(async ({
  time, articleId, targetId, content, commenter
}) => {
  const comment = new CommentModel({
    time, articleId, targetId, content, commenter
  })
  await comment.save();
})

// 删除评论

// 筛选文章的评论
const searchCommentForArticle = wrappedDBMan(async (articleId) => {
  return await CommentModel.find({ articleId }).exec();
})

module.exports = {
  addComment,
  searchCommentForArticle
}
