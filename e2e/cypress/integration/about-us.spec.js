import logging from '../plugins/logging'

describe('About Us', () => {
  before(() => {
    // Reset the database
    cy.task('db:seed')
    cy.loginTestIDP()
    cy.visit('/joinbeta')
  })

  beforeEach(() => {
    cy.preserveLoginCookies()
    cy.preserveBetaCookie()

    cy.visit('/')
    cy.injectAxe()
  })

  it('can visit the About Us page', () => {
    cy.findByRole('link', { name: 'About us' }).click()
    cy.url().should('eq', Cypress.config().baseUrl + '/about-us')
    cy.findByRole('heading', { level: 1 }).contains('About us')
    cy.findAllByRole('heading', { level: 2, name: 'Essential Reading' }).should(
      'exist'
    )
    cy.findAllByRole('heading', { level: 2, name: 'Mission' }).should('exist')
    cy.findAllByRole('heading', { level: 2, name: 'Leadership' }).should(
      'exist'
    )
    cy.checkA11y(null, null, logging, { skipFailures: true })
  })
})
