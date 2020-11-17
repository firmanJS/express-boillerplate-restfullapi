'use strict'
module.exports = {
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  }
}
