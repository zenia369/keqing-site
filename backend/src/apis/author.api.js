const { Router } = require('express')
const authorController = require('./controllers/author.controller')

const router = new Router()

router.post('/message', authorController.send_message)

module.exports = router
