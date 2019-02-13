const util = require("../../util")

// 模型获取,进行数据存储
const model = require("../model")
const getBlogModel = model.getBlogModel
const getJournalModel = model.getJournalModel

const BlogArticleModel = getBlogModel("BlogArticle")
const JournalArticleSortByDateModel = getJournalModel("JournalArticleSortByDate")

const InitBlogDB = async () => {
  await BlogArticleModel.deleteMany({})
  const blogArticleSortByParent = util.getAllArticles("blog")
  // 文章按照分类进行排序
  const articleList = blogArticleSortByParent.map(i => i.articles).reduce((init, cur) => {
    init.push(...cur)
    return init
  }, [])
  // 数据库存储
  BlogArticleModel.insertMany(articleList, (err, doc) => {})
}
const InitJournalDB = async () => {
  // 清空数据
  await JournalArticleSortByDateModel.deleteMany({})
  const journalsSortByParent = util.getAllArticles("journal")
  const journalsSortByDate = journalsSortByParent.map(i => ({
    year: i.parent,
    articles: [...i.articles]
  }))
  JournalArticleSortByDateModel.insertMany(journalsSortByDate, (err, doc) => {})

}

module.exports = {
  InitBlogDB,
  InitJournalDB
}