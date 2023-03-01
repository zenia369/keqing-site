const { Router } = require('express')
const imagesController = require('./controllers/images.controller')

const router = new Router()

router.get('/', imagesController.home_page.bind(imagesController))
router.get(
  '/characters',
  imagesController.characters_page.bind(imagesController)
)
router.get('/login', imagesController.login_page.bind(imagesController))
router.get('/register', imagesController.register_page.bind(imagesController))
router.get('/pictures', imagesController.pictures_page.bind(imagesController))

module.exports = router
