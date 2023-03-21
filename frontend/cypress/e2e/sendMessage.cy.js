describe('Test sendMessage page', () => {
  beforeEach(function () {
    cy.fixture('send-message').then((d) => {
      this.data = d
    })
    cy.visit('/autors-review')

    cy.get('#id-email').as('email')
    cy.get('#id-text').as('message')
    cy.get('form button[type="submit"]').as('submit')
    cy.get('.reaction--item.progress').as('reactionProgress')
    cy.get('.reaction--item.error').as('reactionError')
    cy.get('.reaction--item.success').as('reactionSuccess')
  })

  it('#send message success', function () {
    cy.intercept('POST', '/api/v1/author/message', (req) => {
      req.reply({
        status: 200,
      })
    }).as('post')

    cy.get('@email').type(this.data.email, { force: true })
    cy.get('@message').type(this.data.message, { force: true })
    cy.get('@submit').click()

    cy.get('@reactionProgress').should('be.visible')
    cy.wait('@post').its('response.statusCode').should('eq', 200)
    cy.get('@reactionSuccess').should('be.visible')
  })

  it('#send message failed', function () {
    cy.intercept('POST', '/api/v1/author/message', {
      statusCode: 400,
      body: 'Internal Server Error',
    }).as('post')

    cy.get('@email').type(this.data.email, { force: true })
    cy.get('@message').type(this.data.message, { force: true })
    cy.get('@submit').click()

    cy.get('@reactionProgress').should('be.visible')
    cy.wait('@post').its('response.statusCode').should('eq', 400)
    cy.get('@reactionError').should('be.visible')
  })
})
