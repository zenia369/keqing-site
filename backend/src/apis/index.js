const { Router } = require('express')

const router = new Router()

const cacheMiddleware = require('../middlewares/cacheMiddleware')

const authApi = require('./auth.api')
const profileApi = require('./profile.api')
const imagesApi = require('./images.api')

router.use('/auth', authApi)
router.use('/profile', profileApi)
router.use('/images', cacheMiddleware, imagesApi)

module.exports = router
