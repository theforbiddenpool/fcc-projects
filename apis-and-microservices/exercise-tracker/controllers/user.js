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

module.exports = {
  getAll,
  add,
  findById,
}