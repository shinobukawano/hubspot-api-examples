const log = require("log4js").getLogger("controllers/index")
const db = require("../services/db")
const hs = require("../services/hs")

const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})

const APP_ID = process.env.APP_ID
const CLIENT_ID = process.env.APP_CLIENT_ID
const CLIENT_SECRET = process.env.APP_CLIENT_SECRET
const SERVER_URL = process.env.SERVER_URL

const SCOPES = [
  "contacts", "actions", "timeline", "oauth"
].join(" ")

const REDIRECT_URI = `${SERVER_URL}/oauth-callback`

const authUrl =
  "https://app.hubspot.com/oauth/authorize" +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

const router = require("express").Router()

router.get("/", (req, res) => {
  res.json({
    msg: "The demo app server is running!"
  })
})

router.get("/install", (req, res) => {
  log.info(`Install start - URL: ${authUrl}`)
  res.redirect(authUrl)
})

router.get("/oauth-callback", async (req, res) => {
  try {
    log.info(`HubSpot OAuth callback - Code: ${req.query.code}`)

    const tokens = await hs.exchangeForTokens({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: req.query.code
    })
    const info = await hs.getAccountInfo(tokens.access_token)

    const selector = {
      hubId: info.hub_id,
      appId: info.app_id
    }
    const account = await db.findAccount(selector)
    if (account) {
      await db.updateAccount(selector, {
        accessToken: info.token,
        refreshToken: tokens.refresh_token
      })
    } else {
      await db.createAccount({
        hubId: info.hub_id,
        appId: info.app_id,
        accessToken: info.token,
        refreshToken: tokens.refresh_token
      })
    }

    res.redirect(`/hubid/${info.hub_id}`)
  } catch (e) {
    res.sendStatus(500)
  }
})

router.get("/hubid/:hubId", async (req, res) => {
  try {
    const hubId = req.params.hubId
    const selector = {
      hubId
    }
    const account = await db.findAccount(selector)
    if (account) {
      res.json({
        msg: `information about ID: ${hubId}`,
        appId: account.appId,
        accessToken: account.accessToken,
        refreshToken: account.refreshToken
      })
    } else {
      res.json({
        msg: `Cannot find account information - HubId: ${hubId}`
      })
    }
  } catch (e) {
    res.sendStatus(500)
  }
})

router.get("/hubid/:hubId/contact/:email", async (req, res) => {
  try {
    const hubId = req.params.hubId
    const email = req.params.email
    const selector = {
      hubId
    }
    const account = await db.findAccount(selector)
    if (account) {
      const contact = await hs.getContactByEmail(email, account.accessToken)
      res.json({
        hubId,
        email,
        contact: contact
      })
    } else {
      res.json({
        msg: `Cannot find account information - HubId: ${hubId}`
      })
    }
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post("/hubid/:hubId/contact/:email", async (req, res) => {
  try {
    const hubId = req.params.hubId
    const email = req.params.email
    const selector = {
      hubId
    }
    const account = await db.findAccount(selector)
    if (account) {
      const contact = await hs.createOrUpdateContactByEmail(email, req.body, account.accessToken)
      res.json({
        hubId,
        email,
        contact: contact
      })
    } else {
      res.json({
        msg: `Cannot find account information - HubId: ${hubId}`
      })
    }
  } catch (e) {
    res.sendStatus(500)
  }
})

router.put("/hubid/:hubId/timeline/:email", async (req, res) => {
  try {
    const hubId = req.params.hubId
    const email = req.params.email
    const selector = {
      hubId
    }
    const account = await db.findAccount(selector)
    if (account) {
      await hs.createTimelineEvent(email, APP_ID, "389949", account.accessToken)
      res.json({
        hubId,
        email,
        success: true
      })
    } else {
      res.json({
        msg: `Cannot find account information - HubId: ${hubId}`
      })
    }
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post("/webhook", (req, res) => {
  log.info(req.body)
  res.sendStatus(200)
})

router.get("/crm-extension", (req, res) => {
  res.json({
    "results": [],
    "primaryAction": {
      "type": "IFRAME",
      "width": 890,
      "height": 748,
      "uri": `${SERVER_URL}/hubid/${req.query.portalId}/page?userEmail=${req.query.userEmail}`,
      "label": "CRM Extension Page",
      "associatedObjectProperties": [
        "email"
      ]
    }
  })
})

router.get("/hubid/:hubId/page", async (req, res) => {
  try {
    res.json({
      success: true,
      email: req.query.email,
      userEmail: req.query.userEmail
    })
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = router
