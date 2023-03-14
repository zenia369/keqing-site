describe('Test home page', () => {
  it('#page rendered', () => {
    cy.visit('/')
  })

  it('#request for character images', () => {
    cy.intercept('GET', '/api/v1/images').as('getImages')

    cy.visit('/')

    cy.wait('@getImages').then((interception) => {
      expect(interception.response.statusCode).to.satisfy((status) => {
        return status === 200 || status === 304
      })
    })
  })

  it('#teyvat through pictures section', () => {
    cy.visit('/')
    cy.get('.pictures-preview__wraper').as('previewWrapper')

    cy.get('@previewWrapper').should(
      'have.css',
      'animation-play-state',
      'running'
    )

    cy.get('@previewWrapper').children().should('have.length.at.most', 10)
  })
})
