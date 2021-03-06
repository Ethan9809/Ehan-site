<!-- ---
title: "VueSSR技术实践"
date: "2019-2-20"
cover: "01cover.jpg"
summary: "记录在进行VueSSR时所遇到的问题，以及解决思路"
--- -->

# VueSSR

目的：提高首屏渲染速度

## 非SSR 网页结构

```html
html
  head
    link(rel="stylesheets" href="/index.css")
  body
    div(id="root")
    script(src="/framework.js")
    script(src="/main.js")
```

1. 客户端发出http请求
2. 客户端返回html页面
3. 客户端接收到html从上到下进行解析
![image](browser.jpg)
4. 浏览器获取js文件，操作dom引发页面重排

## SSR流程

1. client端和server端之间添加node中间层
2. client向node服务器请求页面
3. node根据路由进行判断，得到路由对应组件，并进行渲染，返回页面

## 路由判断

````js
// webpack打包入口文件
export default ctx => {
  const store = createStore()
  const url = decodeURI(ctx.url)
  const app = (
      <StaticRouter location={url}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/blog" component={Blog} />
          <Route path="/journal" component={Journal} />
        </Switch>
      </StaticRouter>
  )
  return {
    renderedNodeStream:renderToNodeStream(app)
  }
}
````

1. webpack output 设置成`libraryTarget: 'commonjs2'`
2. webpack target 设置成`node`
3. 不可使用style-loader
4. vue-style-loader

```js
const Koa = require("koa")
const renderedString = require("./server.bundle").default
const server = new koa()

server.use((ctx)=>{
  const app = createApp(ctx.url)
  const html = render(app)
  ctx.body = `
    <!DOCTYPE html><!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VueSSR</title></head>
    <body>
      ${renderedString}
    </body></html>
  `
})
```

这样的话每次进入不同的route，就会到服务端请求页面，脱离单页应用初衷

所以还要加入打包生成的bundle,b把路由的控制权返回给前端，利用pug模板引擎，
和webpack打包生成manifest文件

等待js文件加载完，把路由权限交由给前端

## 数据获取

- 将需要获取数据组件增加额外方法,进行数据获取

```js
// 第一种 store 中更新数据 dispatch

function fetchdata(store,route){
  
  // store 根据路由route更新数据  store中写成promose形式，把数据resolve出来，数据预取存储容器
  return store.dispatch('fetchItem', route.params.id)
}







// 第二种
function fetchdata(store,route){
  return axios.get("/api/list").then((res)=>{
    return res.data
  })
}

// entry-server
// 第一种

export default async context => {

  const app = createApp()
  const url = context.url
  app.$router.push(url)
  const matchedComponents = app.$router.getMatchedComponents()
  await Promise.all(
    matchedComponents.fileter(com=>com.fetchdata)
      .map(fetchdata=>fetchdata(store,app.$router))
  )
  // store 状态完成

  if (!matchedComponents.length)
    return null
  else
    return {
      app,
      state:store.state
    }
}

// server

const koa = require("koa")
const render = require("vue-server-renderer").createRenderer()
const createApp = require("./server.bundle").default
const server = new koa()

server.use(async (ctx,next) => {
  // 假设路由都能匹配到
  const {app,state} = await createApp(ctx)
  const html = await render.renderToString(app)
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <script>
        window.__initStoreState__ = state
      <script/>
      <title>Document</title>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
    </html>
  `
})
server.listen(8080)

`````

````js
// entry-server
// 第二种

// event-bus
export default {
  install(Vue){
    data(){
      return {
        list:[]
      }
    },
    methods:{
      getList(){
        return axios.get("http://localhost:7777/api/getList").then((res)=>{
          this.list = res
        })
      }
    }
  }
  Vue.prototype.$events = EventBus
}


//server-entry
import EventBus from "event"
Vue.use(EventBus)

export default async context => {

  const app = createApp()
  const url = context.url
  app.$router.push(url)
  const matchedComponents = app.$router.getMatchedComponents()
  // store 状态完成

  if (!matchedComponents.length)
    return null
  else {
    await Promise.all(
      matchedComponents.filter(com=>{
        console.log(com)
        return com.fetchdata
      })
        .map(com=>{
          console.log(com.fetchdata)
          return com.fetchdata(app.$events,app.$router)
        })  
    )
    return {
      app:app,
      state:app.$events._data
    }
  }
}

// node-server
const koa = require("koa")
const render = require("vue-server-renderer").createRenderer()
const createApp = require("./server.bundle").default
const server = new koa()


server.use(async (ctx,next) => {
  // 假设路由都能匹配到
  const {app,state} = await createApp(ctx)
  const html = await render.renderToString(app)
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <script>
        window.__initEventBusState__ = state
      <script/>
      <title>Document</title>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
    </html>
  `
})

server.listen(8080)



// client 接受数据
//entry-client.js
import EventBus from "event"
Vue.use(EventBus)
Vue.$events.state = window.__initEventBusState__

(new Vue({
  //.......
})).$mount("#app")
```