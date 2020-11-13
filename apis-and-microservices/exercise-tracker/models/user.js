const mongoose = require('mongoose')
const shortid = require('shortid')

const userSchema = new mongoose.Schema({
  _id: { type: String, index: true, default: shortid.generate },
  username: { type: String, required: true, unique: true }
}, { collection: 'users' })

const User = mongoose.model('User', userSchema)

module.exports = User