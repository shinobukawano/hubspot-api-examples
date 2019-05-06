const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const createAssociation = (fromId, toId) => {
  request({
    url: `https://api.hubapi.com/crm-associations/v1/associations?hapikey=${API_KEY}`,
    method: "PUT",
    json: true,
    body: {
      "fromObjectId": fromId,
      "toObjectId": toId,
      "category": "HUBSPOT_DEFINED",
      "definitionId": 1
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const deleteAssociation = (fromId, toId) => {
  request({
    url: `https://api.hubapi.com/crm-associations/v1/associations/delete?hapikey=${API_KEY}`,
    method: "PUT",
    json: true,
    body: {
      "fromObjectId": fromId,
      "toObjectId": toId,
      "category": "HUBSPOT_DEFINED",
      "definitionId": 1
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node associations.js createAssociation ${fromId} ${toId}
 * node associations.js deleteAssociation ${fromId} ${toId}
 */
eval(process.argv[2] + "('" + process.argv[3] + "', '" + process.argv[4] + "')")
