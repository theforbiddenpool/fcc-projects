const mongoose = require('mongoose')
const user = require('./users')

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

const formatUsedIdError = () => {
  const err = new Error('unknown userId')
  err.status = 400
  return err
}

const Exercise = mongoose.model('Exercise', exerciseSchema)

const add = (data) => {
  return new Exercise(data).save()
}

const getByUserId = (data) => {
  return Exercise.find({
    userId: data.userId,
    date: {
      $gte: data.from ? new Date(data.from) : 0,
      $lte: data.to ? new Date(data.to) : Date.now()
    }
  })
    .limit(Number(data.limit))
    .exec()
    .then(result => new Promise(resolve => {
      const out = {
        _id: data.userId,
        username: result[0].username,
        from: data.from ? new Date(data.from).toDateString() : undefined,
        to: data.to ? new Date(data.to).toDateString() : undefined,
        count: result.length,
        log: result.map(r => ({
          description: r.description,
          duration: r.duration,
          date: r.date.toDateString()
        }))
      }
      resolve(out)
    }))
}

module.exports = {
  add,
  getByUserId
}