const path = require('path')
const { Router } = require('express')

const router = new Router()

// middlewares
const loginMiddlewar = require('../middlewares/login')
const securedUserRouter = require('../middlewares/securedUserRouter')

// constrolles
const pictures = require('./controllers/pictures')
const profile = require('./controllers/profile')
const character = require('./controllers/character')

const ROOT_PAGE = path.resolve(__dirname, '../../client/public/pages')

router.get('/', (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './home/index.html'))
)

router.get('/myWife', (req, res) => res.redirect('/my-wife'))
router.get('/my-wife', (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './myWife/index.html'))
)

router.get('/aboutMe', (req, res) => res.redirect('/about-me'))
router.get('/about-me', (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './aboutMe/index.html'))
)

router.get('/autorsReview', (req, res) => res.redirect('/autors-review'))
router.get('/autors-review', (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './autorsReview/index.html'))
)

router.get('/login?:continuePath', loginMiddlewar, (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './login/index.html'))
)

router.get('/registration', (req, res) =>
  res.sendFile(path.resolve(ROOT_PAGE, './registration/index.html'))
)

router.get('/userProfile', (req, res) => res.redirect('/user/profile'))
router.get('/user/profile', securedUserRouter, profile)

router.get('/characters/:name', securedUserRouter, character)

router.get('/teyvat-through-picture', pictures)

router.get('/logout', (req, res) => {
  res.clearCookie('session')
  res.redirect('/')
})

module.exports = router
