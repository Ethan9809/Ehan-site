# Ethan's site个人网站

## 项目目录

```catalog
Ethan-site
├── server
│   ├── db
│   │   ├── init
│   │   └── model
│   ├── route
│   ├── template
│   │   ├── about
│   │   ├── blog
│   │   └── journal
│   └── util
├── source
│   ├── about
│   ├── blog
│   │   └── React实践
│   └── journal
│       └── 2019
└── static
    ├── assets
    │   ├── css
    │   ├── img
    │   └── js
    ├── image
    └── sw
```

## 项目启动

1. 需要安装mongodb
2. npm install
3. npm start

## 项目技术栈

1. react+redux+react-router+webpack
2. koa+mongodb
3. react 同构技术

## 目录说明

1. /server 主要存放后端逻辑代码
2. /source 存放博客/随笔 源markdown文件
3. /static/assets 客户端渲染文件
4. /static/server.bundle.js 服务端渲染代码
5. /static/sw servicework所需要代码（未完成）

## 遗留问题

1. 组件设计未充分考虑,以后可以进一步优化组件结构
2. 项目还有一个暂未开放的页面，准备挂一些自己的其他个人项目
