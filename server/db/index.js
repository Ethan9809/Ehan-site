const mongoose = require('mongoose')
const model = require("./model")
const initDB = require("./init")
mongoose.connect('mongodb://localhost/BUrPage',{
  useNewUrlParser: true
})
initDB.InitBlogDB()
initDB.InitJournalDB()

// 数据库连接
module.exports = model