/// <reference types="cypress" />
describe('the Beta site', () => {
  beforeEach(() => {
    cy.injectAxe()
  })
  //   it('logs any a11y violations', () => {
  //     cy.checkA11y(null, null, logging, { skipFailures: true })
  //   })

  it('joins the beta', () => {
    cy.visit('/joinbeta')
    cy.contains('Welcome to the Beta USSF Portal')
    cy.url().should('contain', '/')
    Cypress.Cookies.preserveOnce('betaOptIn')
  })

  it('cannot access mvp pages', () => {
    cy.request({ url: '/about-us', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
    cy.visit('/about-us', { failOnStatusCode: false })

    cy.request({ url: '/about-us/accomplishments', failOnStatusCode: false })
      .its('status')
      .should('equal', 404)
    cy.visit('/about-us/accomplishments', { failOnStatusCode: false })
    Cypress.Cookies.preserveOnce('betaOptIn')
  })

  it('leaves the beta', () => {
    cy.contains('Go Home').click()
    cy.contains('Welcome to the Beta USSF Portal')
    cy.contains('Leave Beta').click()
  })

  it('returns to the MVP', () => {
    cy.visit('/')
    cy.contains('Manage your life')
  })
})
