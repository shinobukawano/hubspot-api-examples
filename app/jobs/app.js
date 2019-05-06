const log = require("log4js").getLogger("jobs/app")
const db = require("../services/db")

const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})

const APP_ID = process.env.APP_ID
const CLIENT_ID = process.env.APP_CLIENT_ID
const CLIENT_SECRET = process.env.APP_CLIENT_SECRET
const SERVER_URL = process.env.SERVER_URL
const REDIRECT_URI = `${SERVER_URL}/oauth-callback`

const request = require("request-promise-native")

exports.refreshAccessToken = async () => {
  const accounts = await db.findAccounts({
    appId: APP_ID
  })

  accounts.forEach(async (account) => {
    try {
      const responseBody = await request({
        method: "POST",
        url: "https://api.hubapi.com/oauth/v1/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        form: {
          "grant_type": "refresh_token",
          "client_id": CLIENT_ID,
          "client_secret": CLIENT_SECRET,
          "redirect_uri": REDIRECT_URI,
          "refresh_token": account.refreshToken
        }
      })

      const info = JSON.parse(responseBody)
      await db.updateAccount({
        email: account.email,
        hubId: account.hubId,
        appId: account.appId
      }, {
        accessToken: info.access_token,
        refreshToken: info.refresh_token
      })
    } catch (e) {
      log.error(e)
    }
  })
}
