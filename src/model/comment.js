const { Schema, model } = global.moon;
const autoIncrement = require('mongoose-auto-increment');

// Comment
const CommentSchema = new Schema({
    time: {
        type: Date,
        default: Date.now
    },
    articleId: String, // 目标文章Id
    targetId: Number, // 对评论的评论
    content: String,
    commenter: String // 评论人昵称
})

CommentSchema.plugin(autoIncrement.plugin, 'Comment');

const CommentModel = model('Comment', CommentSchema);

module.exports = {
    CommentSchema,
    CommentModel
}
