const path = require("path")
const fs = require("fs")

const pickMessage = (content) => {
  const headReg = /^-{3,}([\S\s]+)-{3,}/
  const regCreater = (msg => new RegExp(`${msg}\\s?:\\s?["'](\\S+)["']`))

  const headContent = headReg.exec(content) && headReg.exec(content)[1]
  const messages = ["cover", "date", "summary"]
  const ret = messages.reduce((init, i) => {
    const reg = regCreater(i)
    init[i] = reg.exec(headContent) && reg.exec(headContent)[1]
    return init
  }, {})
  return ret
}
const getAllArticles = (target) => {
  const targetDir = path.resolve(__dirname, `../../source/${target}`)
  const parents = fs.readdirSync(targetDir)
  const articleInParent = parents.map((parent) => {
    const parentdir = path.resolve(targetDir, parent)
    const articleName = fs.readdirSync(parentdir).filter(i=>/\.md$/i.test(i))
    const articles = articleName.map((name) => {
      const dir = path.resolve(parentdir, name)
      const content = fs.readFileSync(dir)
      const msg = pickMessage(content)
      // 不存在直接返回null
      if(!msg.cover || !msg.date)
        return null
      msg.cover = `/${target}/${parent}/${msg.cover}`
      msg.title = name.slice(0, -3)
      if (target === "blog")
        msg.type = parent
      return msg
    }).filter(article=>article)
    return {
      parent,
      articles
    }
  })
  return articleInParent
}

module.exports = {
  getAllArticles
}