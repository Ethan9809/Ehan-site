const path = require("path")
const fs = require("fs")
const util = require("util")
const marked = require("marked")
const pug = require("pug")
const readFile = util.promisify(fs.readFile)

module.exports = {
  blogArticle:async url => {
    let dir = decodeURI(url.slice(5))
    const title = /\/([^\/]+)\.md$/i.exec(dir)[1]
    const articlePath = path.resolve(__dirname, "../../source/blog" + dir)

    const fileContent = await readFile(articlePath)
    let contentReg = /^-{3,}[\s\S]+-{3,}([\s\S]+)$/
    const content = contentReg.exec(fileContent)[1]
    const markDown = marked(content)
    return pug.renderFile(path.resolve(__dirname, "../template/blog/blog.pug"), {
      title,
      markDown
    })
  },
  journalArticle:async url => {
    // 通过url判断是哪个种类下的哪个文件
    let dir = decodeURI(url.slice(8))
    const articlePath = path.resolve(__dirname, "../../source/journal" + dir)
    const title = /\/([^\/]+)\.md$/i.exec(dir)[1]
    const fileContent = await readFile(articlePath)
    let contentReg = /^-{3,}[\s\S]+-{3,}([\s\S]+)$/
    const content = contentReg.exec(fileContent)[1]
    const markDown = marked(content)
    return pug.renderFile(path.resolve(__dirname, "../template/journal/journal.pug"), {
      title,
      markDown
    })
  },
  aboutArticle:async url => {
    // 不需要用到url
    const articlePath = path.resolve(__dirname, "../../source/about/about.md")
    const fileContent = await readFile(articlePath)
    const content = String(fileContent)
    const markDown = marked(content)
    return pug.renderFile(path.resolve(__dirname, "../template/about/about.pug"), {
      markDown
    })
  
  }
}