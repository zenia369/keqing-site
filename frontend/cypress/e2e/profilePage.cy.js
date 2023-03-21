describe('Test profile page', () => {
  beforeEach(() => {
    cy.visit('/login?continuePath=/user/profile')
    cy.fixture('user-credentials.secret').then((user) => {
      cy.get('#email').type(user.email, { force: true })
      cy.get('#password').type(user.password, { force: true })
      cy.get('form button[type="submit"]').click()
    })
  })

  beforeEach(() => {
    cy.get('.user-board__card__user__info__avatar__item').as('userAvatar')
    cy.get('.characters-data__avatarts').as('listAvatars')
    cy.get('.user-board__stand').as('userStand')
    cy.get('.characters-data__characters').as('listCharacters')
  })

  it('#click on user avatar should work', () => {
    cy.get('@userAvatar').click()
    cy.get('@userAvatar').should('be.visible')
  })

  it('#character stand should work', () => {
    cy.get('@userStand').children().first().click()
    cy.get('@listCharacters').should('be.visible')
  })
})
