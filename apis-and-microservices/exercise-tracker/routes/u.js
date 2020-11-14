const router = require('express').Router()
const user = require('../controllers/user')
const exercise = require('../controllers/exercise')

router.get('/:username', async (req, res, next) => {
  try {
    const {_id, username, ...data} = await exercise.getByUser({ username: req.params.username })

    let userData
    if(_id === undefined) {
      userData = await user.findByUsername(req.params.username)
    }
    
    res.render('../views/user.pug', {
      uid: _id ?? userData._id,
      username: req.params.username,
      data
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router
