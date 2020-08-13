const { Schema, model } = global.moon;

const CommentSchema = new Schema({
    email: String,
    time: {
        type: Date,
        default: Date.now
    },
    content: String
})

const CommentModel = model('User', CommentSchema);

module.exports = {
    CommentSchema,
    CommentModel
}
