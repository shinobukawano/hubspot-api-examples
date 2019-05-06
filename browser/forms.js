const express = require("express")
const app = express()
const port = 3000

const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const FORM_GUID = "ad9898b1-0ac4-4a99-bdc9-f879c0e05f48"
const PORTAL_ID = "4148814"

app.use(express.static("public"))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
  extended: false
}))

const cookieParser = require("cookie-parser")
app.use(cookieParser())

const querystring = require("querystring")

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/forms.html")))

app.post("/", (req, res) => {
  request({
    url: `https://forms.hubspot.com/uploads/form/v2/${PORTAL_ID}/${FORM_GUID}?hapikey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "email": req.body.email,
      "phone": req.body.phone,
      "hs_context": {
        "hutk": req.cookies.hubspotutk,
        "pageUrl": "http://www.example.com/form-page",
        "pageName": "Forms API Example"
      }
    })
  }).then(() => {
    res.send("Thank you!")
  }).catch(() => {
    res.send("Error...")
  })

})

app.listen(port, () => console.log(`The app listening on http://localhost:${port}`))
