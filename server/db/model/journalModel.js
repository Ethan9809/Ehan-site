const journalArticle = {
  title:{
    type:String,
    require:true
  },
  date:{
    type:String,
    require:true
  },
  cover:{
    type:String,
  },
  summary:{
    type:String
  }
}

const JournalArticleSortByDate = {
  year:String,
  articles:[
    journalArticle
  ]
}

const journalModel = {
  journalArticle,
  JournalArticleSortByDate
}

module.exports = journalModel