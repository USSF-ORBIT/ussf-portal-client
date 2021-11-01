import logging from '../plugins/logging'
describe('the Beta gate', () => {
  beforeEach(() => {
    cy.injectAxe()
  })
  it('joins and leaves the beta', () => {
    cy.visit('/joinbeta')
    cy.contains('My Space')
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
