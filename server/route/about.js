const path = require("path")
const fs = require("fs")
const util = require("util")
const KoaRouter = require("koa-router")
const marked = require("marked")
const pug = require("pug")

const readFile = util.promisify(fs.readFile)
const aboutRouter = new KoaRouter()


// 展示博客文章
const about = async ctx => {

  const articlePath = path.resolve(__dirname, "../../source/about/about.md")
  const fileContent = await readFile(articlePath)
  const content = String(fileContent)
  const markDown = marked(content)
  ctx.body = pug.renderFile(path.resolve(__dirname, "../template/about/about.pug"), {
    markDown
  })

}
aboutRouter.get("/", about)

module.exports = aboutRouter