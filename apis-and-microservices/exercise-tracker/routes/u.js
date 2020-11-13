const router = require('express').Router()
const user = require('../controllers/user')

router.get('/:username', (req, res) => {
  res.render(process.cwd() + '/views/user.pug', {
    username: req.params.username
  })
})

module.exports = router
