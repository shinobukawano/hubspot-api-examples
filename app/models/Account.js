var mongoose = require("mongoose")

var AccountSchema = new mongoose.Schema({
  hubId: {
    type: String,
    required: true,
    index: true
  },
  appId: {
    type: String,
    required: true
  },
  accessToken: String,
  refreshToken: String,
}, {timestamps: true})

mongoose.model("Account", AccountSchema)
