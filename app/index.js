const express = require("express")
const app = express()

/* Log Config */
const path = require("path")
const log4js = require("log4js")
log4js.configure(path.join(__dirname, "/log4js.json"))
app.use(log4js.connectLogger(log4js.getLogger("http"), {
  level: "auto"
}))
const log = log4js.getLogger("app")

/* Model Config */
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kuchihige", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
require("./models/Account")

/* View Config */
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

/* Controller Config */
app.use("/", require("./controllers/index.js"))
app.use((req, res) => {
  res.status(404)
})

/* Now, it's time to start the App! */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  log.info(`Listening on http://localhost:${PORT}`)
})

/* Job Config */
const schedule = require("node-schedule")
const appJob = require("./jobs/app")
schedule.scheduleJob({ hour: 23, minute: 0 }, appJob.refreshAccessToken)
schedule.scheduleJob({ hour: 3, minute: 0 }, appJob.refreshAccessToken)
schedule.scheduleJob({ hour: 7, minute: 0 }, appJob.refreshAccessToken)
schedule.scheduleJob({ hour: 11, minute: 0 }, appJob.refreshAccessToken)
// appJob.refreshAccessToken()
