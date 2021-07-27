describe('The MVP site', () => {
  beforeEach(() => {
    cy.visit('/')
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
    // #TODO Confirm Training and Education page
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
