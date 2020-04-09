const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickName: {
    type: String
  },
  avatarImg: {
    type: String
  },
  content: {
    type: String
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  relateBlogId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Comment'
  },
  byAiteName: {
    type: String
  },
}, {
  timestamps: true
})
module.exports = mongoose.model('Comment', schema)