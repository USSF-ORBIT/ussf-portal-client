describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('successfully loads', () => {
    cy.contains('USSF Portal')
  })

  it('contains the expected meta data', () => {
    cy.document()
    cy.get('head title').should('contain', 'Space Force Portal')
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'http://localhost:3000/'
    )
  })

  it('can navigate to a test page', () => {
    cy.contains('A test page').click()
    cy.document()
    cy.get('head title').should('contain', 'Space Force Portal | Test Page')
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Test page description'
    )
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      'http://localhost:3000/test'
    )
  })
})
