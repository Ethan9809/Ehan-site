const path = require("path")
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
  const {renderString,state} = await renderToString(ctx)
  ctx.body = pug.renderFile(path.resolve(__dirname,"./static/index.template.pug"),{
    title:"BurPage",
    renderString,
    state,
    manifest:Object.values(manifest)
  })
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

app.listen(9000)