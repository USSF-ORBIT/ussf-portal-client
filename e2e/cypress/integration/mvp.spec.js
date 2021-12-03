import logging from '../plugins/logging'
describe('The MVP site', () => {
  describe('logged in pages', () => {
    before(() => {
      Cypress.Cookies.debug(true)

      cy.loginTestIDP()
    })

    beforeEach(() => {
      cy.preserveLoginCookies()
      cy.visit('/')
      cy.injectAxe()
    })

    it('logs any a11y violations', () => {
      cy.checkA11y(null, null, logging, { skipFailures: true })
    })

    it('lands on the home page', () => {
      cy.contains('Manage your life').click()
      cy.url().should('contain', '/#manage-your-life')

      cy.contains('Work tools').click()
      cy.url().should('contain', '/#work-tools')
    })

    it('contains the expected meta data', () => {
      cy.document()
      cy.get('head title').should('contain', 'Space Force Portal')
      cy.get('head link[rel="canonical"]').should(
        'have.attr',
        'href',
        Cypress.config().baseUrl + '/'
      )
    })

    it('can navigate to the Training and Education page', () => {
      cy.contains('More in Training + Education').click()
      cy.url().should('contain', '/training-and-education')
    })

    it('can navigate to the News page', () => {
      cy.contains('News').click()
      cy.url().should('contain', '/news')
      cy.contains('What’s New')
    })

    it('can navigate to the About Us page', () => {
      cy.contains('About us').click()
      cy.url().should('contain', '/about-us')
      cy.contains('About the Space Force')
    })

    it('can navigate to the Accomplishments page', () => {
      cy.contains('About us').click()
      cy.url().should('contain', '/about-us')
      cy.contains('Our accomplishments').click()
      cy.url().should('contain', '/about-us/accomplishments')
      cy.contains('Things we’re proud of')
    })

    it('can navigate to the Training and Education page', () => {
      cy.contains('Training and education').click()
      cy.url().should('contain', '/training-and-education')
      cy.contains('Learn and Grow')
    })

    it('can navigate to the Force Multiplier Program page', () => {
      cy.contains('Training and education').click()
      cy.url().should('contain', '/training-and-education')
      cy.contains(
        'Start your journey in digital fluency with our Force Multiplier program.'
      ).click()
      cy.url().should(
        'contain',
        '/training-and-education/force-multiplier-program'
      )
      cy.contains('Become Digitally Fluent')
    })

    describe('the News page', () => {
      beforeEach(() => {
        cy.intercept(
          'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&max=10'
        ).as('getNewsRSS')

        cy.visit('/news')
      })

      it('loads news articles from an RSS feed', () => {
        cy.wait(['@getNewsRSS'])
      })
    })
  })

  describe('logged out pages', () => {
    beforeEach(() => {
      cy.clearCookies()
    })

    it('can visit the login page', () => {
      cy.visit('/login')
      cy.contains('Space Force Portal Login')
    })

    it('can navigate to the Login Notice page', () => {
      cy.visit('/login-notice')
      cy.contains('Notice')
      cy.contains('I agree').click()
      cy.contains('Space Force Portal Login')
    })
  })
})
