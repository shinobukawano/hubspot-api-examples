const log = require("log4js").getLogger("services/line/hs")

const request = require("request-promise-native")

exports.exchangeForTokens = async (form) => {
  try {
    const responseBody = await request.post("https://api.hubapi.com/oauth/v1/token", {
      form
    })
    return JSON.parse(responseBody)
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.getAccountInfo = async (token) => {
  try {
    const responseBody = await request.get(`https://api.hubapi.com/oauth/v1/access-tokens/${token}`)
    return JSON.parse(responseBody)
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.getContactByEmail = async (email, accessToken) => {
  try {
    const responseBody = await request.get(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      json: true
    })
    return responseBody
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.createOrUpdateContactByEmail = async (email, body, accessToken) => {
  try {
    const responseBody = await request.post(`https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      json: true,
      body
    })
    return responseBody
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.createTimelineEvent = async (email, appId, eventTypeId, accessToken) => {
  try {
    const responseBody = await request.put(`https://api.hubapi.com/integrations/v1/${appId}/timeline/event`, {
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      json: true,
      body: {
        "id": Date.now(),
        eventTypeId,
        email,
        "extraData": {
          "message": "You got approval!"
        }
      }
    })
    return responseBody
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}
