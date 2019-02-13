const KoaRouter = require("koa-router")


// 数据库
const model = require("../db")
const blogArticleModel = model.getBlogModel("BlogArticle")
const blogRouter = new KoaRouter()


// 展示博客文章


const blogList = async ctx => {
  await blogArticleModel.find({}, {
    _id: 0,
    __v: 0
  }, (err, doc) => {
    ctx.body = doc
  })
}


blogRouter.get("/getBlogList", blogList)

module.exports = blogRouter