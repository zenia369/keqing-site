describe('Test character page', () => {
  beforeEach(() => {
    cy.visit('/login?continuePath=/characters/ayaka')
    cy.fixture('user-credentials.secret').then((user) => {
      cy.get('#email').type(user.email, { force: true })
      cy.get('#password').type(user.password, { force: true })
      cy.get('form button[type="submit"]').click()
    })
  })

  beforeEach(() => {
    cy.get('.k-header-controls-item.k-images-btn_open').as('openImages')
    cy.get('.k-images').as('listImages')
    cy.get('.k-header-controls-item.k-video-btn_open').as('openVideo')
    cy.get('.k-video').as('video')
  })

  it('#open character images should work', () => {
    cy.get('@openImages').click()
    cy.get('@listImages').should('be.visible')
  })

  it('#open character video should work', () => {
    cy.get('@openVideo').click()
    cy.get('@video').should('be.visible')
  })
})
