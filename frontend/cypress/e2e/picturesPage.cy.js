describe('Test pictures page', () => {
  beforeEach(() => {
    cy.visit('/teyvat-through-picture')

    cy.intercept('GET', '/api/v1/images/pictures*').as('images')

    cy.get('.gallery__list').as('gallery')
    cy.get('.image-screen').as('bigImage')
    cy.get('.filter_wrapp').as('filter')
    cy.get('.loader-wrapper').as('loader')
  })

  it('#big image should be visible', () => {
    cy.get('@gallery').children().first().click()

    cy.get('@bigImage').should('be.visible')
  })

  it('#check navigation when opened bigImage', () => {
    cy.get('@bigImage').get('[data-moveside="right"]').as('right')
    cy.get('@bigImage').get('[data-moveside="left"]').as('left')
    cy.get('@bigImage').find('img').as('activeBigImage')
    cy.get('@gallery').children().eq(0).as('firstImage')
    cy.get('@gallery').children().eq(1).as('secondImage')
    cy.get('.image-screen__close').as('close')

    cy.get('@firstImage').click()
    cy.compareByAttr('@firstImage', '@activeBigImage', 'src')

    cy.get('@right').click()
    cy.compareByAttr('@secondImage', '@activeBigImage', 'src')

    cy.get('@left').click()
    cy.compareByAttr('@firstImage', '@activeBigImage', 'src')

    cy.get('@close').click()
    cy.get('@bigImage').should('not.be.visible')
  })

  it('#filter should working', () => {
    cy.get('@filter')
      .find('.filter__options__item_wrapp')
      .each(async ($list) => {
        await cy.wrap($list).children().first().realClick()
      })
      .then(($childrens) => {
        cy.get('@filter')
          .find('.filter__btn__marker')
          .invoke('text')
          .then(($text) => {
            expect(Number($text)).to.eq($childrens.length)
          })
      })
    cy.get('@filter').find('.filter_range').invoke('val', 10).trigger('input')
    cy.get('@filter')
      .find('.filter__btn button')
      .click()
      .then(() => {
        cy.get('@loader').should('be.visible')
      })

    cy.wait('@images')
    cy.get('@images').should('have.property', 'response')
  })

  it('#pagination should working', () => {
    cy.scrollTo('bottom')
    cy.wait('@images')
    cy.get('@images').should('have.property', 'response')
  })
})
