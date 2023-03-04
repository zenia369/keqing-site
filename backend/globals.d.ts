import { Application } from 'express'
import supertest from 'supertest'

declare global {
  var app: Application
  var request: supertest.SuperTest<supertest.Test>
}
