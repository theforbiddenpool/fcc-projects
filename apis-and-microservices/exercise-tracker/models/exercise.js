const mongoose = require('mongoose')
const user = require('../controllers/user')

const formatUsedIdError = () => {
  const err = new Error('unknown userId')
  err.status = 400
  return err
}

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now }
}, { collection: 'exercises' })

exerciseSchema.methods.toJSON = function() {
  const obj = this.toObject()
  obj._id = obj.userId
  delete obj.userId
  delete obj.__v
  obj.date = obj.date.toDateString()
  return obj
}

exerciseSchema.pre('save', function(next) {
  user.findById(this.userId)
    .then(user => {
      if(!user) {
        next(formatUsedIdError())
      }

      this.username = user.username

      if(this.date == null) {
        this.date = Date.now()
      }

      next()
    })
    .catch(err => next(err))
})

exerciseSchema.pre('find', function(next) {
  user.findById(this._conditions.userId)
    .then(user => {
      if(!user)
        next(formatUsedIdError())
      
      next()
    })
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
