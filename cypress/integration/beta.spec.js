import logging from '../plugins/logging'
describe('the static Beta site', () => {
  beforeEach(() => {
    cy.injectAxe()
  })
  it('joins and leaves the beta', () => {
    cy.visit('/joinbeta')
    cy.contains('My Space')
    cy.url().should('contain', '/')
  })

  it('logs any a11y violations', () => {
    cy.checkA11y(null, null, logging, { skipFailures: true })
  })
})
