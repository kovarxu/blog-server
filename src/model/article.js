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
    isShow: {
        type: Number,
        enum: [0, 1]
    }, // 是否展示出来
    category: { // 类别，区分博客、心得、教程等
        type: String,
        enum: ['blog', 'tutorial', 'thinking'],
        required: true
    },
    addTime: {
        type: Date,
        default: Date.now
    },
    modifyTime: {
        type: Date,
        default: Date.now
    },
    comments: [Schema.Types.ObjectId],
    support: {
        type: Number,
        default: 0
    },
})

ArticleSchema.index({ isShow: 1, addTime: 1 });

const ArticleModel = model('Article', ArticleSchema);

module.exports = {
    ArticleSchema,
    ArticleModel
}
