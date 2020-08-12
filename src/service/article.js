const log4js = require('log4js');
const logger = log4js.getLogger();
const { wrappedDBMan } = require('../utils/db');
const { ArticleModel } = require('../model/article');

const addArticle = wrappedDBMan(async (articalInfo) => {
    const article = new ArticleModel(articalInfo);
    await article.save();
    return true
})

const editArticle = wrappedDBMan(async (id, articleInfo) => {
    await ArticleModel.update({ id }, {
        ...articleInfo,
        modifyTime: Date.now()
    });
    return true
})

const searchArticle = wrappedDBMan(async (id) => {
    return await ArticleModel.findOne({ id }).exec();
})

const findArticle = wrappedDBMan(async (findFactors) => {
    return await ArticleModel.find(findFactors).exec();
})

module.exports = {
    addArticle,
    editArticle,
    searchArticle,
    findArticle
}
