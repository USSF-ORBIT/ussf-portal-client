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

  it('can hide links from an existing collection', () => {
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

  it('can add custom links to an existing collection', () => {
    cy.contains('Example Collection')
      .parent()
      .within(() => {
        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()

        cy.findByLabelText('URL')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')

        cy.findByLabelText('URL')
          .type('not a URL')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')

        cy.findByLabelText('URL')
          .clear()
          .type('http://www.example.com')
          .then(($el) => $el[0].checkValidity())
          .should('be.true')

        cy.findByRole('button', { name: 'Add site' }).click()
      })

    cy.findByRole('dialog', { name: 'We don’t recognize that link' }).within(
      () => {
        cy.findByRole('button', { name: 'Cancel' }).click()
      }
    )

    cy.contains('Example Collection')
      .parent()
      .within(() => {
        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()

        cy.findByLabelText('URL').clear().type('http://www.example.com')

        cy.findByRole('button', { name: 'Add site' }).click()
      })

    cy.findByRole('dialog', { name: 'We don’t recognize that link' }).within(
      () => {
        cy.findByLabelText('Label')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')

        cy.findByLabelText('Label')
          .type('My Custom Link')
          .then(($el) => $el[0].checkValidity())
          .should('be.true')

        cy.findByRole('button', { name: 'Save link name' }).click()
      }
    )

    cy.findByRole('link', {
      name: 'My Custom Link (opens in a new window)',
    }).should('exist')
  })

  it('can delete an existing collection', () => {
    cy.contains('Example Collection')
      .parent()
      .within(() => {
        cy.findByRole('button', { name: 'Collection Settings' }).click()

        cy.findByRole('button', { name: 'Delete Collection' }).click()
      })

    // Cancel first to make sure it's possible
    cy.findByRole('dialog', {
      name: 'Are you sure you’d like to delete this collection from My Space?',
    }).within(() => {
      cy.findByRole('button', { name: 'Cancel' }).click()
    })

    // Reopen the modal
    cy.contains('Example Collection')
      .parent()
      .within(() => {
        cy.findByRole('button', { name: 'Collection Settings' }).click()

        cy.findByRole('button', { name: 'Delete Collection' }).click()
      })

    // Delete the collection
    cy.findByRole('dialog', {
      name: 'Are you sure you’d like to delete this collection from My Space?',
    }).within(() => {
      cy.findByRole('button', { name: 'Delete' }).click()
    })

    // Make sure no collection exists
    cy.contains('Example Collection').should('not.exist')
  })
})
