describe('Keystone Migration Test', () => {
  before(() => {
    // Reset the database
    cy.task('db:seed')
    cy.loginTestIDP()
  })

  beforeEach(() => {
    cy.preserveLoginCookies()
    cy.visit('/')
  })

  it('can visit the Keystone Test page', () => {
    cy.contains('My Space')

    // Client-side navigate to the page
    cy.visit('/keystone-test')
    cy.url().should('eq', Cypress.config().baseUrl + '/keystone-test')
    cy.contains('Keystone CMS Test Page')

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
    cy.findAllByRole('row').should('have.length', 311)

    cy.contains('Sort by type').click()
    cy.contains('Career')
    cy.contains('Application name').should('not.exist')
  })

  it('can add collections from the Keystone Test page to My Space', () => {
    // Client-side navigate to the page
    cy.visit('/keystone-test')
    cy.url().should('eq', Cypress.config().baseUrl + '/keystone-test')
    cy.contains('Keystone CMS Test Page')

    cy.contains('My Space')
    cy.contains('Career').should('not.exist')
    cy.contains('Medical & Dental').should('not.exist')
    cy.contains('Life & Fitness').should('not.exist')
  })

  it('can add links to a new collection from the Keystone Test page', () => {
    // Client-side navigate to the page
    cy.visit('/keystone-test')
    cy.url().should('eq', Cypress.config().baseUrl + '/keystone-test')
    cy.contains('Keystone CMS Test Page')

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
      .parent()
      .parent()
      .within(() => {
        cy.contains('Move.mil')
      })
  })

  it('can add links to an existing collection from the Keystone Test page', () => {
    // Client-side navigate to the page
    cy.visit('/keystone-test')
    cy.url().should('eq', Cypress.config().baseUrl + '/keystone-test')
    cy.contains('Keystone CMS Test Page')
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
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.findByRole('heading', { name: 'My Space' })
    cy.contains('Example Collection')
      .parent()
      .parent()
      .next()
      .within(() => {
        cy.contains('SURF')
      })
  })
})
