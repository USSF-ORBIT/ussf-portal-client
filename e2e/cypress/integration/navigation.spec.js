import logging from '../plugins/logging'

describe('Routes & navigation', () => {
  describe('logged in pages', () => {
    before(() => {
      cy.loginTestIDP()
    })

    beforeEach(() => {
      cy.preserveLoginCookies()
    })

    it('can navigate to the home page', () => {
      cy.visit('/')
      cy.injectAxe()
      cy.contains('Welcome, BERNADETTE CAMPBELL')
      cy.contains('Welcome to the new Space Force Service Portal!')
      cy.contains('My Space')

      // Check a11y
      cy.checkA11y(null, null, logging, { skipFailures: true })

      // Check meta data
      cy.document()
      cy.get('head title').should('contain', 'Space Force Portal')

      cy.get('head link[rel="canonical"]').should(
        'have.attr',
        'href',
        Cypress.config().baseUrl + '/'
      )
    })

    it('can navigate to the News page', () => {
      cy.visit('/news')
      cy.injectAxe()
      cy.contains('Latest news')
      cy.checkA11y(null, null, logging, { skipFailures: true })
    })

    it('can navigate to the About Us page', () => {
      cy.visit('/about-us')
      cy.injectAxe()
      cy.contains('About the Space Force')
      cy.checkA11y(null, null, logging, { skipFailures: true })
    })

    it('can navigate to the Sites & Applications page', () => {
      cy.visit('/sites-and-applications')
      cy.injectAxe()
      cy.contains('Sites & Applications')
      cy.checkA11y(null, null, logging, { skipFailures: true })
    })

    describe('redirects', () => {
      it('redirects deprecated MVP routes to the 404 page', () => {
        const routes = [
          '/about-us/accomplishments',
          '/training-and-education',
          '/training-and-education/force-multiplier-program',
        ]

        routes.forEach((url) => {
          cy.visit(url, { failOnStatusCode: false })
          cy.url().should('eq', Cypress.config().baseUrl + '/404')
        })
      })

      it('redirects deprecated beta routes to the home page', () => {
        const routes = ['/joinbeta', '/leavebeta']

        routes.forEach((url) => {
          cy.visit(url)
          cy.url().should('eq', Cypress.config().baseUrl + '/')
        })
      })
    })
  })

  describe('logged out pages', () => {
    beforeEach(() => {
      cy.clearCookies()
    })

    it('can visit the login page', () => {
      cy.visit('/login')
      cy.injectAxe()
      cy.contains('Space Force Portal Login')
      cy.checkA11y(null, null, logging, { skipFailures: true })
    })
  })
})
