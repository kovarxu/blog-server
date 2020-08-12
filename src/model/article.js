const { Schema, model } = global.moon;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: String,
    describe: String,
    tags: [String],
    addTime: {
        type: Date,
        default: Date.now
    },
    modifyTime: {
        type: Date,
        default: Date.now
    },
    comments: [{
        user: String,
        time: {
            type: Date,
            default: Date.now
        },
        content: String
    }],
    support: {
        type: Number,
        default: 0
    },
})

const ArticleModel = model('Article', ArticleSchema);

module.exports = {
    ArticleSchema,
    ArticleModel
}
