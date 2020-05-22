const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10);
    }
  }
});

module.exports = mongoose.model("AdminUser", schema);