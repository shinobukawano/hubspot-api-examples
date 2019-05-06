const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const create = () => {
  request({
    url: `https://api.hubapi.com/engagements/v1/engagements?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "engagement": {
        "type": "CALL"
      },
      "metadata" : {
        "toNumber" : "03-1234-5678",
        "fromNumber" : "090-1234-5678",
        "status" : "COMPLETED"
      }
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getById = (id) => {
  request({
    url: `https://api.hubapi.com/engagements/v1/engagements/${id}?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateById = (id) => {
  request({
    url: `https://api.hubapi.com/engagements/v1/engagements/${id}/?hapikey=${API_KEY}`,
    method: "PATCH",
    json: true,
    body: {
      metadata: {
        "toNumber" : "06-1234-5678",
      }
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const deleteById = (id) => {
  request({
    url: `https://api.hubapi.com/engagements/v1/engagements/${id}?hapikey=${API_KEY}`,
    method: "DELETE"  ,
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node engagements.js create
 * node engagements.js getById ${id}
 * node engagements.js updateById ${id}
 * node engagements.js deleteById ${id}
 */
eval(process.argv[2] + "('" + process.argv[3] + "')")
