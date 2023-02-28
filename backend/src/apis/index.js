const { Router } = require('express')
const router = new Router()

const authApi = require('./auth.api')
const profileApi = require('./profile.api')

router.use('/auth', authApi)
router.use('/profile', profileApi)

module.exports = router
