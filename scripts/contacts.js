const path = require("path")
require("dotenv").config({
  path: path.join(__dirname, "../.env")
})
const API_KEY = process.env.API_KEY
const request = require("request-promise-native")

const create = () => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "property": "email",
        "value": "skawano+test@hubspot.com"
      }, {
        "property": "lastname",
        "value": "テスト"
      }, {
        "property": "firstname",
        "value": "太郎"
      }]
    }
  }).then((r) => {
    console.log(r.vid)
  }).catch((e) => {
    console.log(e.message)
  })
}

const createOrUpdate = () => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/skawano+test@hubspot.com/?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "property": "lastname",
        "value": "テスト"
      }, {
        "property": "firstname",
        "value": "太郎"
      }]
    }
  }).then((r) => {
    console.log(r.vid)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getById = (vid) => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile/?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const getByEmail = () => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/email/skawano+test@hubspot.com/profile?hapikey=${API_KEY}`,
    json: true
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateById = (vid) => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile/?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "property": "lastname",
        "value": "更新: テスト"
      }, {
        "property": "firstname",
        "value": "更新: 太郎"
      }]
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const updateByEmail = () => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/email/skawano+test@hubspot.com/profile?hapikey=${API_KEY}`,
    method: "POST",
    json: true,
    body: {
      "properties": [{
        "property": "lastname",
        "value": "更新: テスト"
      }, {
        "property": "firstname",
        "value": "更新: 太郎"
      }]
    }
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

const deleteById = (vid) => {
  request({
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}?hapikey=${API_KEY}`,
    method: "DELETE",
  }).then((r) => {
    console.log(r)
  }).catch((e) => {
    console.log(e.message)
  })
}

/**
 * APIの実行
 * node contacts.js create
 * node contacts.js createOrUpdate
 * node contacts.js getById ${vid}
 * node contacts.js getByEmail
 * node contacts.js updateById ${vid}
 * node contacts.js updateByEmail
 * node contacts.js deleteById ${vid}
 */
eval(process.argv[2] + "('" + process.argv[3] + "')")
