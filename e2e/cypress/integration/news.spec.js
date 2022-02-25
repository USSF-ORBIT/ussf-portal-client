import logging from '../plugins/logging'

describe('News and Announcements', () => {
  before(() => {
    cy.loginTestIDP()
    cy.visit('/joinbeta')
    cy.intercept(
      'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&max=12'
    ).as('getNewsRSS')
  })

  beforeEach(() => {
    cy.preserveLoginCookies()
    cy.preserveBetaCookie()
    cy.visit('/')
    cy.injectAxe()
  })

  it('can visit the News page', () => {
    cy.findByRole('link', { name: 'News' }).click()
    cy.url().should('eq', Cypress.config().baseUrl + '/news')
    cy.findByRole('heading', { level: 1 }).contains('News')
    cy.wait(['@getNewsRSS'])
    cy.findAllByRole('article').should('exist')
    cy.checkA11y(null, null, logging, { skipFailures: true })
  })
})
