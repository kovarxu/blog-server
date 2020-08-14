const log4js = require('log4js');
const logger = log4js.getLogger();
const { wrappedDBMan } = require('../utils/db');
const { ArticleModel } = require('../model/article');

const addArticle = wrappedDBMan(async (articalInfo) => {
    const article = new ArticleModel(articalInfo);
    await article.save();
    return true;
})

const editArticle = wrappedDBMan(async (id, articleInfo) => {
    await ArticleModel.update({ id }, {
        ...articleInfo,
        modifyTime: Date.now()
    });
    return true;
})

const searchArticle = wrappedDBMan(async (id) => {
    return await ArticleModel.findOne({ id }).exec();
})

const articleStat = wrappedDBMan(async () => {
    const count = await ArticleModel.count();
    return {
        count
    }
})

const findArticle = wrappedDBMan(async (start, limit, category, isShow) => {
    const findConditions = {};
    if (category) {
        findConditions.category = category;
    }
    if (isShow === 1 || isShow === 0) {
        findConditions.isShow = isShow;
    }
    
    return await ArticleModel.find(findConditions, null, {
        skip: start,
        limit
    }).exec();
})

module.exports = {
    addArticle,
    editArticle,
    searchArticle,
    articleStat,
    findArticle
}
