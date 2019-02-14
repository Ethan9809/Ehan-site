const path = require("path")
const fs = require("fs")
const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaStaticServer = require("koa-static-server")
const pug = require("pug")
const manifest = require("./static/manifest.json")
const app = new Koa()
const router = new KoaRouter()
/** SSR
 *   服务端渲染
 */
const renderToString = require("./static/server.bundle").default
// 渲染markdown 函数
const {blogArticle,journalArticle,aboutArticle} = require("./server/route/markdown")

// 服务端渲染ssr
app.use(async (ctx,next)=>{
  /**
   * 如果接口是api接口,或者是静态文件 
   * 则进过下一个中间件，不进行服务端渲染
   */
  const url = ctx.url
  if(/^\/api/.test(url) || /^\/assets/.test(url) || /\.(\w+)$/i.test(url) || url === "/about")
    return next()
  const {renderedNodeStream,state} = await renderToString(ctx)
  const title = url.includes("blog") ? "blog":url.includes("journal")?"journal":"Ethan's site"
  const documentBody = pug.renderFile(path.resolve(__dirname,"./static/index.template.pug"),{
    title,
    state,
    manifest:Object.values(manifest)
  })
  ctx.status = 200
  // 禁止使用koa提供的处理响应的方法,使用原声node方法
  ctx.respond = false
  const res = ctx.res
  const bodyExec = /([\s\S]+id="root">)([\s\S]+)/.exec(documentBody)
  res.write(bodyExec[1])
  renderedNodeStream.pipe(res,{end:false})
  renderedNodeStream.on("end",()=>{
    res.end(bodyExec[2])
  })
  return 
})
// markdown模板展示
app.use(async (ctx,next) => {
  const url = ctx.url

  if(!/\.md/i.test(url) && url !== "/about")
    return next()
  
  // 如果获取的是blog的模板
  if(/^\/blog/.test(url))
    ctx.body = await blogArticle(ctx.url)
  
  // console.log("我的body已经返回啦！出现我是不正常地")
  
  if(/^\/journal/.test(url))
    ctx.body = await journalArticle(ctx.url)

  if(url === "/about")
    ctx.body = await aboutArticle(ctx.url)
  
})
// sw.js 文件
app.use(async (ctx,next) => {
  if(ctx.url === '/sw.js'){
    ctx.set({
      "Content-Type":"application/javascript; charset=utf-8"
    })
    ctx.body = fs.readFileSync(path.resolve(__dirname,"./static/sw/sw.js"))
  }
  else
    return next()
})


// 引入路由
const blogRouter = require("./server/route/blog")
const journalRouter = require("./server/route/journal")
const aboutRouter = require("./server/route/about")

// 装载路由
router.use("/api/blog", blogRouter.routes())
router.use("/api/journal", journalRouter.routes())
router.use("/api/about", aboutRouter.routes())
app.use(router.routes())

// 静态文件
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./static/sw"),
  rootPath: "/sw"
}))
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./static/assets"),
  rootPath: "/assets"
}))
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./static/image"),
  rootPath: "/image"
}))

app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./source/about"),
  rootPath: "/about"
}))
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./source/blog"),
  rootPath: "/blog"
}))
app.use(KoaStaticServer({
  rootDir: path.resolve(__dirname, "./source/journal"),
  rootPath: "/journal"
}))

app.listen(8080)