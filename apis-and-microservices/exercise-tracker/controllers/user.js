const User = require('../models/user')

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

const findByUsername = (username) => {
  return User.findOne({ username }).select('_id username').exec()
}

const findUser = ({ userId, username }) => {
  return User.findOne({ userId, username }).select('_id username').exec()
}

module.exports = {
  getAll,
  add,
  findById,
  findByUsername,
  findUser
}
