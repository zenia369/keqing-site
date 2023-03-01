const { Router } = require('express')

const router = new Router()

const authController = require('./controllers/auth.controller')

router.post('/login', authController.login)
router.post('/registration', authController.register)
router.post('/registration/google', authController.register_google)

module.exports = router
