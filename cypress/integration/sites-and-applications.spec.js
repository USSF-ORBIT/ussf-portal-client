describe('Sites and Applications', () => {
  beforeEach(() => {
    // Make sure the beta cookie is set
    cy.visit('/joinbeta')
  })

  it('can visit the Sites & Applications page', () => {
    // Client-side navigate to the page
    cy.contains('All sites & applications').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/sites-and-applications')
    cy.contains('Sites & Applications')
  })
})
