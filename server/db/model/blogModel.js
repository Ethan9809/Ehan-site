const BlogArticle = {
  // 文章标题
  title: {
    type: String,
    require: true
  },
  // 文章时间
  date: {
    type: String,
    require: true
  },
  // 文章类型
  type: {
    type: String,
    require: true
  },
  // 文章封面url
  cover: {
    type: String,
    require: true
  },
  // 文章摘要
  summary: {
    type: String,
    require: true
  },
}

const blogModel = {
  BlogArticle
}


module.exports = blogModel