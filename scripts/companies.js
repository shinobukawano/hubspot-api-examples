const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const create = () => {
  request({
    url: `https://api.hubapi.com/companies/v2/companies?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "name": "domain",
        "value": "hubspot.jp"
      }, {
        "name": "name",
        "value": "HubSpot Japan"
      }, {
        "name": "description",
        "value": "インバウンドマーケティング＆セールスソフトウェア"
      }]
    }
  }).then((r) => {
    console.log(r.companyId)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getById = (id) => {
  request({
    url: `https://api.hubapi.com/companies/v2/companies/${id}?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getByDomain = () => {
  request({
    url: `https://api.hubapi.com/companies/v2/domains/hubspot.jp/companies?hapikey=${API_KEY}`,
    method: "POST",
    body: {
      "requestOptions": {
        "properties": [
          "domain",
          "name",
          "description"
        ]
      }
    },
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateById = (id) => {
  request({
    url: `https://api.hubapi.com/companies/v2/companies/${id}/?hapikey=${API_KEY}`,
    method: "PUT",
    json: true,
    body: {
      "properties": [{
        "name": "name",
        "value": "更新: HubSpot Japan"
      }, {
        "name": "description",
        "value": "更新: インバウンドマーケティング＆セールスソフトウェア"
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
    url: `https://api.hubapi.com/companies/v2/companies/${id}?hapikey=${API_KEY}`,
    method: "DELETE",
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node companies.js create
 * node companies.js getById ${vid}
 * node companies.js getByDomain
 * node companies.js updateById ${vid}
 * node companies.js deleteById ${vid}
 */
eval(process.argv[2] + "('" + process.argv[3] + "')")
