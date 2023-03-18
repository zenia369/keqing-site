describe('Test registration page', () => {
  beforeEach(function () {
    cy.fixture('user').then((d) => {
      this.user = d
    })

    cy.visit('/registration')

    cy.get('#email').as('email')
    cy.get('#password').as('password')
    cy.get('form button[type="submit"]').as('submit')
    cy.get('#name').as('name')
    cy.get('#city').as('city')
    cy.get('#elemental').as('elemental')
  })

  it('#create new user', function () {
    cy.intercept('POST', '/api/v1/auth/registration', (req) => {
      expect(req.body).to.have.property('email', this.user.email)
      expect(req.body).to.have.property('password', this.user.password)
      expect(req.body).to.have.property('userCity', this.user.city)
      expect(req.body).to.have.property('userElement', this.user.elemental)
      expect(req.body).to.have.property('userName', this.user.name)

      req.reply({
        status: 200,
        body: {
          uid: this.user.uid,
        },
      })
    }).as('post')

    cy.get('@email').type(this.user.email)
    cy.get('@password').type(this.user.password)
    cy.get('@name').type(this.user.name)
    cy.get('@city').select(this.user.city)
    cy.get('@elemental').select(this.user.elemental)
    cy.get('@submit').click()

    cy.wait('@post').its('response.statusCode').should('eq', 200)
  })
})
