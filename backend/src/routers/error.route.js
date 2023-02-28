const path = require('path')
const { Router } = require('express')
const router = new Router()

const ROOT_PAGE = path.resolve(__dirname, '../../client/public/pages')

router.get('/*', (req, res) => {
  res.status(400).sendFile(path.join(ROOT_PAGE, 'error/index.html'))
})

module.exports = router
