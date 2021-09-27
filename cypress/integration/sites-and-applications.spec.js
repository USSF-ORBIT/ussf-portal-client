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

    // Toggle sorting
    cy.contains('Career')
    cy.contains('Sort alphabetically').click()
    cy.contains('Career').should('not.exist')
    cy.contains('Application name')
    cy.contains('Sort by type').click()
    cy.contains('Career')
    cy.contains('Application name').should('not.exist')
  })

  it('can edit links on the My Space page', () => {
    cy.contains('My Space')

    cy.contains('Example Collection')
      .next()
      .within(() => {
        // Inside of <ol>
        cy.findAllByRole('listitem').should('have.length', 5)
        cy.contains('Webmail')

        // First undo
        cy.findAllByRole('button', { name: 'Remove this bookmark' })
          .first()
          .click()
        cy.contains('Webmail').should('not.exist')
        cy.contains('Undo remove').click()
        cy.contains('Webmail')

        // Don't undo
        cy.findAllByRole('button', { name: 'Remove this bookmark' })
          .first()
          .click()
        cy.contains('Webmail').should('not.exist')
        cy.findAllByRole('listitem').should('have.length', 4)
      })
  })
})
