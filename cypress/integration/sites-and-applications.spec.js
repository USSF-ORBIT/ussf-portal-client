describe('Sites and Applications', () => {
  beforeEach(() => {
    // Make sure the beta cookie is set
    cy.visit('/joinbeta')
  })

  it('can add a new custom collection', () => {
    cy.findByRole('button', { name: 'Add section' }).click()
    cy.findByRole('button', { name: 'Create new collection' }).click()
    cy.findByLabelText('Collection Title').type('My New Collection{enter}')
    cy.contains('My New Collection')
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

  it('can add collections from the Sites & Applications page to My Space', () => {
    cy.contains('My Space')
    cy.contains('Career').should('not.exist')
    cy.contains('Medical & Dental').should('not.exist')
    cy.contains('Life & Fitness').should('not.exist')

    // Go to Sites & Applications
    cy.findByRole('button', { name: 'Add section' }).click()

    cy.findByRole('button', { name: 'Select collection from template' }).click()

    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/sites-and-applications?selectMode=true'
    )

    cy.findByRole('button', { name: 'Select collection Career' }).click()
    cy.findByRole('button', {
      name: 'Select collection Medical & Dental',
    }).click()
    cy.findByRole('button', {
      name: 'Select collection Life & Fitness',
    }).click()
    cy.contains('3 collections selected')

    cy.findByRole('button', {
      name: 'Unselect collection Medical & Dental',
    }).click()
    cy.contains('2 collections selected')

    cy.findByRole('button', { name: 'Add selected' }).click()

    // Go back to My Space
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    cy.contains('My Space')
    cy.contains('Career')
    cy.contains('Life & Fitness')
    cy.contains('Medical & Dental').should('not.exist')
  })

  it('can hide links from an existing collection', () => {
    cy.contains('My Space')

    cy.contains('Example Collection')
      .parent()
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

  it('can add existing links to an existing collection', () => {
    cy.contains('Example Collection')
      .parent()
      .parent()
      .within(() => {
        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()

        cy.findByLabelText('URL').click()
        cy.findByRole('option', { name: 'Move.mil' }).click()
        cy.findByRole('button', { name: 'Add site' }).click()
      })

    cy.findByRole('link', {
      name: 'Move.mil (opens in a new window)',
    }).should('exist')
  })

  it('can add custom links to an existing collection', () => {
    cy.contains('Example Collection')
      .parent()
      .parent()
      .within(() => {
        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()

        cy.findByLabelText('URL')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')

        /*
          // TODO - URL validation
        cy.findByLabelText('URL')
          .type('not a URL')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')
          */

        cy.findByLabelText('URL')
          .clear()
          .type('http://www.example.com')
          .then(($el) => $el[0].checkValidity())
          .should('be.true')

        cy.findByRole('option', { name: 'http://www.example.com' }).click()
        cy.findByRole('button', { name: 'Add site' }).click()
      })

    cy.findByRole('dialog', { name: 'We don’t recognize that link' }).within(
      () => {
        cy.findByRole('button', { name: 'Cancel' }).click()
      }
    )

    cy.contains('Example Collection')
      .parent()
      .parent()
      .within(() => {
        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()
        cy.findByLabelText('URL').clear().type('http://www.example.com')
        cy.findByRole('option', { name: 'http://www.example.com' }).click()
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

  it('can edit an existing collection title', () => {
    cy.contains('Example Collection').click()
    cy.findByRole('textbox').clear()
    cy.findByRole('textbox').type('Updated Title{enter}')
    cy.findByRole('button', { name: 'Edit collection title' }).should(
      'have.text',
      'Updated Title'
    )
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
