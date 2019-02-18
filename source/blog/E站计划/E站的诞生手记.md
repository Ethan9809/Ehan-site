---
title: "E站的诞生手记"
date: "2019-2-13"
cover: "01cover.jpg"
summary: "关于本站的的诞生，值得一看哦"
---

# E站诞生手记

![image](01cover.jpg)

## 本站实现的功能

1. 使用markdown格式书写文章
2. 将文章信息分类展示
3. 将文章信息按年限展示
4. 将文章展示

## 技术栈

1. 编程语言语言 ES6
2. 视图层框架 react
3. 状态管理工具 redux
4. 工程化打包工具 webpack
5. 后台框架 koa
6. 数据存储 mongodb

## 项目构思

### 文章书写

- 文章按照类型，分目录进行存

```dir
  blog
  ├── type1
  │   ├── article1.md
  │   ├── article2.md
  │   └── article3.md
  ├── type2
  │   ├── article1.md
  │   ├── article2.md
  │   └── article3.md
  └── type3
      ├── article1.md
      ├── article2.md
      └── article3.md
```

- 文章开头存储文章头信息，利用特殊标识与内容分离

  ```html
    title: "XXXXX"
    date: "XXXX-X-XX"
    cover: "XXXX.jpg"
    summary: "XXXXXXXXXXXXXXXXXXXXXXXX"
  ```

### 前端

1. 获取全部文章信息，在srore中分类存储
2. 文章不同信息页面展示利用前端路由(window.history.pushState())
3. 文章展示利用a标签跳转到经服务端渲染好的文章页面

### 服务端

1. 服务器启动时，遍历blog文件夹，提取所有文章头信息，并存储到数据库中
2. 当前端请求特定url时,根据文章类型和名称在服务器读取特定的文章内容，并进行提取,结合模板引擎渲染成html字符串返还给前端`/blog/:type/:articlename.md`

## E站优化之SSR

目的：提高首屏渲染速度

### 非SSR

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
4. 浏览器演示，引发重绘
5. 路由交给前端

### SSR流程

1. client端和server端之间添加node中间层
2. client向node服务器请求页面
3. node根据路由进行判断，得到路由对应组件，并进行渲染，返回页面

### 路由判断

````javascript
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

```javascript
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

function fetchdata(store,route){

  return store.dispatch("fetchItem",router)
}

```