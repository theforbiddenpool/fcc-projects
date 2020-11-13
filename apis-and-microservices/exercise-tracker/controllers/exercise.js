const Exercise = require('../models/exercise')

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
