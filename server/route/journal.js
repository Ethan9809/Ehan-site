const KoaRouter = require("koa-router")
const model = require("../db")

const journalRouter = new KoaRouter()
const JournalArticleSortByDateModel = model.getJournalModel("JournalArticleSortByDate")

const journalList = async ctx => {
  const journals = await JournalArticleSortByDateModel.find({}, {
    _id: 0,
    __v: 0
  })
  ctx.body = journals
}

journalRouter.get("/getJournalList", journalList)

module.exports = journalRouter