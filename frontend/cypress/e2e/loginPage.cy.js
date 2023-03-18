describe('Test login page', () => {
  beforeEach(function () {
    cy.fixture('real-user-credentials').then((d) => {
      this.user = d
    })

    cy.visit('/login')
    cy.intercept('GET', '/api/v1/images/login').as('images')

    cy.get('#email').as('email')
    cy.get('#password').as('password')
    cy.get('form button[type="submit"]').as('submit')
  })

  it('#should be request for images', () => {
    cy.reload()

    cy.wait('@images').then((interception) => {
      expect(interception.response.statusCode).to.satisfy((status) => {
        return status === 200 || status === 304
      })
    })
  })

  it('#login through form on page', function () {
    cy.get('@email').type(this.user.email, { force: true })
    cy.get('@password').type(this.user.password, { force: true })
    cy.get('@submit').click()
  })
})
