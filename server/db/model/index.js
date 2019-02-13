const mongoose = require("mongoose")

// 获取document
const blogModel = require("./blogModel")
const journalModel = require("./journalModel")

for(let m in blogModel)
  mongoose.model(m,new mongoose.Schema(blogModel[m]))
for(let m in journalModel)
  mongoose.model(m,new mongoose.Schema(journalModel[m]))

module.exports = {
  getBlogModel(m){
    return mongoose.model(m)
  },
  getJournalModel(m){
    return mongoose.model(m)
  }
}