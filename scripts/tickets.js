const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const getPipelines = () => {
  request({
    url: `https://api.hubapi.com/crm-pipelines/v1/pipelines/tickets?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.dir(r, { depth: 4 })
  }).catch((e) => {
    console.log(e.message)
  })
}

const create = () => {
  request({
    url: `https://api.hubapi.com/crm-objects/v1/objects/tickets?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: [
      {
        "name": "subject",
        "value": "新規チケット"
      },
      {
        "name": "hs_pipeline",
        "value": "0"
      },
      {
        "name": "hs_pipeline_stage",
        "value": "1"
      }
    ]
  }).then((r) => {
    console.log(r.objectId)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getById = (id) => {
  request({
    url: `https://api.hubapi.com/crm-objects/v1/objects/tickets/${id}?hapikey=${API_KEY}`,
    qs: {
      properties: "subject"
    },
    json: true,
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateById = (id) => {
  request({
    url: `https://api.hubapi.com/crm-objects/v1/objects/tickets/${id}?hapikey=${API_KEY}`,
    method: "PUT",
    json: true,
    body: [
      {
        "name": "subject",
        "value": "更新: 新しいチケット"
      }
    ]
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const deleteById = (id) => {
  request({
    url: `https://api.hubapi.com/crm-objects/v1/objects/tickets/${id}?hapikey=${API_KEY}`,
    method: "DELETE",
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node tickets.js getPipelines
 * node tickets.js create
 * node tickets.js getById ${id}
 * node tickets.js updateById ${id}
 * node tickets.js deleteById ${id}
 */
eval(process.argv[2] + "('" + process.argv[3] + "')")
