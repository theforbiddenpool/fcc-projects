const Exercise = require('../models/exercise')

const add = async (data) => {
  return new Exercise(data).save()
}

const getByUser = (data) => {
  return Exercise.find({
    ...(data.userId ? { userId: data.userId } : {}),
    ...(data.username ? { username: data.username } : {}),
    date: {
      $gte: data.from ? new Date(data.from) : 0,
      $lte: data.to ? new Date(data.to) : Date.now()
    }
  })
    .limit(Number(data.limit))
    .exec()
    .then(result => new Promise(resolve => {
      const out = {
        _id: result[0]?.userId,
        username: result[0]?.username,
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
    .catch(err => { throw err })
}

module.exports = {
  add,
  getByUser
}
