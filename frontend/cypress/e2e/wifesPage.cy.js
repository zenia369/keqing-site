describe('Test wifes page', () => {
  it('#page rendered', () => {
    cy.visit('/myWife')
  })

  it('#request for characters images', () => {
    cy.intercept('GET', '/api/v1/images/characters').as('getImages')

    cy.visit('/myWife')

    cy.wait('@getImages').then((interception) => {
      expect(interception.response.statusCode).to.satisfy((status) => {
        return status === 200 || status === 304
      })
    })
  })

  it('#list should be rendere', () => {
    cy.intercept('GET', '/api/v1/images/characters').as('getImages')
    cy.visit('/myWife')
    cy.wait('@getImages')
    cy.get('.cardList').as('list')

    cy.get('@list').children().should('have.length.greaterThan', 1)
  })

  it('#menu should work', () => {
    const viewportWidth = Cypress.config('viewportWidth')
    const viewportHeight = Cypress.config('viewportHeight')
    cy.visit('/myWife')
    cy.get('.menu').as('menu')

    cy.get('@menu').find('label').click()
    cy.get('@menu')
      .find('.nav')
      .should('have.css', 'width', `${viewportWidth * 2}px`)
      .should('have.css', 'height', `${viewportHeight * 2}px`)

    cy.get('@menu').find('label').click()
    cy.get('@menu').find('.nav').should('not.be.visible')
  })

  it('#card name should be visible', () => {
    cy.intercept('GET', '/api/v1/images/characters').as('getImages')
    cy.visit('/myWife')
    cy.wait('@getImages')
    cy.get('.cardList-card__ul__item__link').as('cardItem')

    cy.get('@cardItem').realHover()
    cy.get('@cardItem').find('span').should('be.visible')
  })
})
