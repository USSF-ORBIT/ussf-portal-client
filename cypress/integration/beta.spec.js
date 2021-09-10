import logging from '../plugins/logging'
describe('the static Beta site', () => {
  beforeEach(() => {
    cy.injectAxe()
  })
  it('joins and leaves the beta', () => {
    cy.visit('/joinbeta')
    cy.contains('Welcome to the Beta USSF Portal')
    cy.url().should('contain', '/')

    // Leave the beta
    cy.contains('Leave Beta').click()

    // Return to MVP
    cy.visit('/')
    cy.contains('Manage your life')
  })

  it('logs any a11y violations', () => {
    cy.checkA11y(null, null, logging, { skipFailures: true })
  })
})
