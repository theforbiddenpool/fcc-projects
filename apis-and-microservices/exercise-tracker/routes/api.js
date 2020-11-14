const router = require('express').Router()
const user = require('../controllers/user')
const exercise = require('../controllers/exercise')

router.get('/test', (req, res) => res.send('ready'))

router.post('/new-user', (req, res, next) => {
  user.add(req.body)
    .then(({ username }) => res.redirect(`/u/${username}`))
    .catch(err => (err.code == 11000) ? 
      next({ status: 400, message: 'username already taken' })
      : next(err)
    )
})

router.get('/login', (req, res, next) => {
  user.findByUsername(req.query.username)
    .then(({ _id, username }) => {
      if(username) {
        res.redirect(`/u/${username}`)
      } else {
        next({ status: 400, message: 'username doesn\'t not exist' })
      }
    })
    .catch(err => next(err))
})

router.get('/users', (req, res) => {
  user.getAll()
    .then(data => res.json(data))
})

router.post('/add', (req, res, next) => {
  exercise.add(req.body)
    .then(data => res.json(data))
    .catch(err => next(err))
})

router.get('/log', (req, res, next) => {
  exercise.getByUser(req.query)
    .then(data => res.json(data))
    .catch(err => next(err))
})

module.exports = router