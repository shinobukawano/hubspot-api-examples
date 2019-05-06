const log = require("log4js").getLogger("services/db")

const mongoose = require("mongoose")
const Account = mongoose.model("Account")

exports.findAccount = async (selector) => {
  try {
    const result = await Account.findOne(selector).exec()
    return result
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.findAccounts = async (selector) => {
  try {
    const result = await Account.find(selector).exec()
    return result
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.createAccount = async (data) => {
  try {
    const account = new Account(data)
    await account.save()
    log.info(`Created an Account - ${data.hubId}.`)
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}

exports.updateAccount = async (selector, data) => {
  try {
    const result = await Account
      .findOneAndUpdate(selector, {
        $set: data
      }, {
        new: true
      }).exec()
    log.info(`Updated the Account - ${selector.hubId}.`)
    return result
  } catch (e) {
    log.error(e)
    throw new Error()
  }
}
