/* eslint-disable import/order */
const path = require('path')
const { APP_CONFIG } = require('./app_paths')

require('dotenv').config({ path: APP_CONFIG })
const express = require('express')
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const handlebarsConfig = require('./configs/handlebars')
const firebaseConfig = require('./configs/firebase')
const swaggerConfig = require('./configs/swagger')

const app = express()

const csrufSecure = csurf({ cookie: true })
const csrufSecureAPI = csurf({
  cookie: true,
  ignoreMethods: ['HEAD', 'OPTIONS'],
})

firebaseConfig()
handlebarsConfig(app)
swaggerConfig(app)

// Routes
const site_router = require('./routers/pages.route')
const error_router = require('./routers/error.route')
// API
const api_v1 = require('./apis')

app.use(express.static(path.join(__dirname, '../client/public')))
app.use(express.json())
app.use(cookieParser())
app.use(csrufSecure)
app.use(morgan('tiny'))

app.all('*', (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  next()
})

app.use(site_router)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1', api_v1)
} else {
  app.use('/api/v1', csrufSecureAPI, api_v1)
}

// hendler errors
app.use(error_router)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('try go to home page')
  }
  console.log('App_error:', err)
  return res
    .status(400)
    .sendFile(
      path.resolve(__dirname, '../client/public/pages/error/index.html')
    )
})

module.exports = app
