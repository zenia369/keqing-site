const { Router } = require('express')

const router = new Router()

const cacheMiddleware = require('../middlewares/cacheMiddleware')
const secureRoutes = require('../middlewares/secureRoutes')

const authApi = require('./auth.api')
const profileApi = require('./profile.api')
const imagesApi = require('./images.api')
const authorApi = require('./author.api')

router.use('/auth', authApi)
router.use('/author', authorApi)
router.use('/profile', secureRoutes, profileApi)
router.use('/images', cacheMiddleware, imagesApi)

module.exports = router
