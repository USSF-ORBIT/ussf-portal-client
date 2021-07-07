describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
    cy.contains('USSF Portal')
  })

  it('contains the expected meta data', () => {
    cy.visit('http://localhost:3000')
    cy.document()
    cy.get('head title').should('contain', 'Space Force Portal')
  })
})
