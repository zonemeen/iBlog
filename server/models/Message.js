const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  mail: {
    type: String
  },
  gitsite: {
    type: String
  },
})

module.exports = mongoose.model('Message', schema)