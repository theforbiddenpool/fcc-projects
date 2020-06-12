const mongoose = require('mongoose')
const shortid = require('shortid')

const userSchema = new mongoose.Schema({
  _id: { type: String, index: true, default: shortid.generate },
  username: { type: String, required: true, unique: true }
}, { collection: 'users' })

const User = mongoose.model('User', userSchema)

const getAll = () => {
  return User.find({}).select('_id username').exec()
}

const add = (data) => {
  return new User(data).save()
}

const findById = (userId) => {
  return User.findById(userId).exec()
    .then(data => data)
}

module.exports = {
  getAll,
  add,
  findById
}