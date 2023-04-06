const path = require('path')
const exphbs = require('express-handlebars')

module.exports = (app) => {
  const hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: path.resolve(__dirname, '../../client/views/layouts'),
    partialsDir: [
      path.resolve(__dirname, '../../client/views/partials'),
      path.resolve(__dirname, '../../../frontend/src/shared/views'),
    ],
  })

  app.engine('hbs', hbs.engine)
  app.set('view engine', 'hbs')
  app.set('views', path.resolve(__dirname, '../../client/views'))

  hbs.handlebars.registerHelper('when', (operand_1, operator, operand_2) => {
    const operators = {
      '>': function (l, r) {
        return Number(l) > Number(r)
      },
      '<': function (l, r) {
        return Number(l) < Number(r)
      },
    }
    const result = operators[operator](operand_1, operand_2)

    if (result) return true
    return false
  })
}
