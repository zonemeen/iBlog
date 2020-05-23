const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickName: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  url: {
    type: String
  },
  avatarImg: {
    type: String
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('User', schema)