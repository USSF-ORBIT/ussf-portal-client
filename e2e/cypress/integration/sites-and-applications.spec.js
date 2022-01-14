describe('Sites and Applications', () => {
  before(() => {
    // Reset the database
    cy.task('db:seed')
    cy.loginTestIDP()
  })

  beforeEach(() => {
    cy.preserveLoginCookies()
    cy.visit('/joinbeta')
  })

  it('can add a new custom collection', () => {
    cy.findByRole('button', { name: 'Add section' }).click()
    cy.findByRole('button', { name: 'Create new collection' }).click()
    cy.findByLabelText('Collection Title').type('My New Collection{enter}')
    cy.contains('My New Collection')
  })

  it('can visit the Sites & Applications page', () => {
    cy.contains('My Space')

    // Client-side navigate to the page
    cy.contains('All sites & applications').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/sites-and-applications')
    cy.contains('Sites & Applications')

    const collections = [
      'Career',
      'Personnel & Administration',
      'Medical & Dental',
      'Life & Fitness',
      'PCS',
      'Finance & Travel',
      'Outprocessing',
      'Management',
      'vMPF',
      'Supervisory',
      'Education',
      'Public Social Platforms',
      'Public Military Websites',
    ]
    collections.forEach((collection) => cy.contains(collection))

    // Toggle sorting
    cy.contains('Sort by type').should('be.disabled')
    cy.contains('Sort alphabetically').click()
    cy.contains('Sort by type').should('be.enabled')
    cy.contains('Sort alphabetically').should('be.disabled')
    cy.contains('Application name')
    cy.findAllByRole('row').should('have.length', 307)

    cy.contains('Sort by type').click()
    cy.contains('Career')
    cy.contains('Application name').should('not.exist')
  })

  it('can add collections from the Sites & Applications page to My Space', () => {
    cy.contains('My Space')
    cy.findByRole('button', { name: 'Edit Career collection title' }).should(
      'not.exist'
    )
    cy.findByRole('button', {
      name: 'Edit Medical & Dental collection title',
    }).should('not.exist')
    cy.findByRole('button', {
      name: 'Edit Life & Fitness collection title',
    }).should('not.exist')

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
    cy.findByRole('button', { name: 'Edit Career collection title' }).should(
      'exist'
    )
    cy.findByRole('button', {
      name: 'Edit Life & Fitness collection title',
    }).should('exist')
    cy.findByRole('button', {
      name: 'Edit Medical & Dental collection title',
    }).should('not.exist')
  })

  it('can add links to a new collection from the Sites & Applications page', () => {
    // Client-side navigate to the page
    cy.contains('All sites & applications').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/sites-and-applications')
    cy.contains('Sites & Applications')

    // Toggle sorting
    cy.contains('Career')
    cy.contains('Sort alphabetically').click()

    cy.contains('Move.mil')
      .parent()
      .parent()
      .within(() => {
        cy.findByRole('button', { name: 'Add to My Space Closed' }).click()
        cy.contains('Add to new collection').click()
      })

    // Go back to My Space
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    cy.findByLabelText('Collection Title').type(
      'My Second New Collection{enter}'
    )
    cy.contains('My Second New Collection')
      .parent()
      .next()
      .within(() => {
        cy.contains('Move.mil')
      })
  })

  it('can add links to an existing collection from the Sites & Applications page', () => {
    // Client-side navigate to the page
    cy.contains('All sites & applications').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/sites-and-applications')
    cy.contains('Sites & Applications')

    // Toggle sorting
    cy.contains('Career')
    cy.contains('Sort alphabetically').click()

    cy.contains('SURF')
      .parent()
      .parent()
      .within(() => {
        cy.findByRole('button', { name: 'Add to My Space Closed' }).click()
        cy.contains('Example Collection').click()
      })

    cy.contains(
      'You have successfully added “SURF” to the “Example Collection” section.'
    )

    // Go back to My Space
    cy.contains('My Space').click()
    cy.findByRole('heading', { name: 'My Space' })
    cy.contains('Example Collection')
      .parent()
      .next()
      .within(() => {
        cy.contains('SURF')
      })
  })

  it('can hide links from an existing collection', () => {
    cy.contains('My Space')

    cy.contains('Example Collection')
      .parent()
      .next()
      .within(() => {
        // Inside of <ol>
        cy.findAllByRole('listitem').should('have.length', 6)
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
        cy.findAllByRole('listitem').should('have.length', 5)
      })
  })

  it('can add existing links to an existing collection', () => {
    cy.contains('Example Collection')
      .parent()
      .parent()
      .within(() => {
        cy.findByRole('link', {
          name: 'ADP (opens in a new window)',
        }).should('not.exist')

        // Add a link
        cy.findByRole('button', { name: '+ Add link' }).click()
        cy.findByLabelText('URL').click() // Open the select
        cy.findByRole('option', { name: 'ADP' }).click()
        cy.findByLabelText('URL').should('have.value', 'ADP')

        cy.findByRole('button', { name: 'Add site' }).click()

        cy.findByRole('link', {
          name: 'ADP (opens in a new window)',
        }).should('exist')
      })
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

        cy.findByLabelText('URL')
          .type('not a URL')
          .then(($el) => $el[0].checkValidity())
          .should('be.false')

        cy.findByLabelText('URL')
          .clear()
          .type('http://www.example.com{enter}')
          .blur()
          .then(($el) => $el[0].checkValidity())
          .should('be.true')

        cy.findByLabelText('URL').should('have.value', 'http://www.example.com')

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
        cy.findByLabelText('URL').should('have.value', 'http://www.example.com')
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
    cy.contains('Updated Title')
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: 'Edit Updated Title collection title',
        }).should('have.text', 'Updated Title')
      })
  })

  it('can remove multiple links at once from an existing collection', () => {
    cy.contains('My Space')

    cy.contains('Updated Title')
      .parent()
      .next()
      .within(() => {
        // Inside of <ol>
        cy.findAllByRole('listitem').should('have.length', 7)

        cy.contains('MyPay')

        // // First delete
        cy.findAllByRole('button', { name: 'Remove this bookmark' })
          .first()
          .click()
        cy.contains('MyPay').should('not.exist')

        cy.contains('My Custom Link')

        // // First delete
        cy.findAllByRole('button', { name: 'Remove this bookmark' })
          .first()
          .click()
        cy.contains('My Custom Link').should('not.exist')

        cy.findAllByRole('listitem').should('have.length', 5)
      })
  })

  it('can delete an existing collection', () => {
    cy.contains('Second Collection')
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
    cy.contains('Second Collection')
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
    cy.contains('Second Collection').should('not.exist')
  })
})
