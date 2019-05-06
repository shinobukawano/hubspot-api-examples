const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const getPipelines = () => {
  request({
    url: `https://api.hubapi.com/crm-pipelines/v1/pipelines/deals?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.dir(r, { depth: 4 })
  }).catch((e) => {
    console.log(e.message)
  })
}

const create = (stageId) => {
  request({
    url: `https://api.hubapi.com/deals/v1/deal?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "name": "dealstage",
        "value": stageId
      }, {
        "name": "dealname",
        "value": "新しい取引"
      }, {
        "name": "amount",
        "value": 30000
      }]
    }
  }).then((r) => {
    console.log(r.dealId)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getById = (id) => {
  request({
    url: `https://api.hubapi.com/deals/v1/deal/${id}?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateById = (id) => {
  request({
    url: `https://api.hubapi.com/deals/v1/deal/${id}?hapikey=${API_KEY}`,
    method: "PUT",
    json: true,
    body: {
      "properties": [{
        "name": "dealname",
        "value": "更新: 新しい取引"
      }, {
        "name": "amount",
        "value": 99999
      }]
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const deleteById = (id) => {
  request({
    url: `https://api.hubapi.com/deals/v1/deal/${id}?hapikey=${API_KEY}`,
    method: "DELETE",
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node deals.js getPipelines
 * node deals.js create ${stageId}
 * node deals.js getById ${id}
 * node deals.js updateById ${id}
 * node deals.js deleteById ${id}
 */
eval(process.argv[2] + "('" + process.argv[3] + "')")
