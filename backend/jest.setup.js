const supertest = require('supertest')

const app = require('./src/app')

global.app = app
global.request = supertest(app)
