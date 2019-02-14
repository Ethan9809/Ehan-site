const Koa = require("koa")
const path = require("path")
const app = new Koa()
const exec = require('child_process').exec

app.use((ctx)=>{
  if(ctx.url === '/Ethan-site/push'){
    exec(`sh ${path.resolve(__dirname,"./deploy.sh")}`)
    ctx.body = "触发成功！"
  }
})

app.listen(9999)