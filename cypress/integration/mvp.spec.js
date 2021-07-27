describe('The MVP site', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('lands on the home page', () => {
    // TODO - home page tests here
    cy.contains('USSF Portal')
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
})
