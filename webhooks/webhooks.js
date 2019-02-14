const Koa = require("koa")
const app = new koa()
const exec = require('child_process').exec

app.use((ctx)=>{
  if(ctx.url === '/Ethan-site/push'){
    exec('sh ./deploy.sh')
  }
})

app.listen(9999)