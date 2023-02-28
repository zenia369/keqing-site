const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const { APP_API_DOC_FILE } = require('../app_paths')

const swaggerDocument = YAML.load(APP_API_DOC_FILE)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
