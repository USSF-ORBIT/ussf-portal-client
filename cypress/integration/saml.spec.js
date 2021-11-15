/* Cypress doesn't like visiting multiple origins in a single test :( */
describe.skip('SAML flow (with test IdP)', () => {
  /*
  beforeEach(() => {
    cy.intercept({
      url: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    }).as('samlLoginRequest')
  })
  */

  it('can login and logout', () => {
    cy.visit('/api/auth/login')
    cy.url().should('contain', 'http://localhost:8080/simplesaml/')
    cy.contains('Enter your username and password')
    cy.findByLabelText('Username').type('user1')
    cy.findByLabelText('Password').type('user1pass')
    cy.contains('Login').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/api/auth/login')
    cy.contains('Logged in as user:')

    /*
    // Not working because of cross-origin request
    cy.visit('/api/auth/logout')

    cy.url().should(
      'eq',
      Cypress.config().baseUrl + '/api/auth/logout/callback'
    )
    cy.contains('User logged out!')
    */
  })
})
