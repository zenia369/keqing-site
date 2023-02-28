const { Router } = require('express')
const profileController = require('./controllers/profile.controller')

const router = new Router()

router.patch('/update_avatar', profileController.update_avatar)
router.patch('/update_info', profileController.update_info)
router.patch('/update_stand', profileController.update_stand)
router.patch('/update_favorite', profileController.add_favorite)

router.delete('/delete_favorite', profileController.delete_favorite)

module.exports = router
