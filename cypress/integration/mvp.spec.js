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
})
