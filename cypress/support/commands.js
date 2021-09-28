const email = Cypress.env('email');
const password = Cypress.env('password');
const username = Cypress.env('username');

Cypress.Commands.add('getElementById', (identifier) => {
    cy.get(`#${identifier}`).should('be.visible')
})

Cypress.Commands.add('login', (email, password) => {
    //Open the login page from the homepage and assert correct page is loaded
    cy.getElementById('login').click()
    cy.url().should('include', '/login')
    //Fill in credentials and sign in
    cy.getElementById('email').type(email)
    cy.getElementById('password').type(password, { log: false })
    cy.getElementById('submit').click()
})

Cypress.Commands.add('logout', (username) => {
    cy.get('#username').should('have.text', username).click()
    cy.get('.dropdown-menu').contains('Logout').click()
    cy.get('#login').should('have.text', 'Login ')
})

Cypress.Commands.add('assertErrorShown', (message) => {
    cy.get('.alert-danger').contains(message).should('be.visible')
})

Cypress.Commands.add('register', (username, email, password, confirmPassword) => {
    cy.getElementById('name').type(username)
    cy.getElementById('email').type(email)
    cy.getElementById('password').type(password)
    cy.getElementById('passwordConfirm').type(confirmPassword)
    cy.getElementById('submit').click()
})

Cypress.Commands.add('placeReview', () => {
    let randomNumber = (Math.floor(Math.random() * 5) + 1).toString();
    let reviewText = 'Awesome Product'

    cy.getElementById('rating').select(randomNumber)
    cy.getElementById('comment').type(reviewText)
    cy.getElementById('submit').click()
})

Cypress.Commands.add('apiBasicVerification', (response) => {
    // check the response code for 2xx code
    expect(response.status).to.eq(200);
    // check that we received headers together with response
    expect(response).to.have.property("headers");
    // check for basic property
    expect(response).to.have.property("duration");
})

export const interceptOnce = (method, url, response) => {
    // I am using "count" to show how easy you can implement
    // different responses for different interceptors
    let count = 0
    return cy.intercept(method, url, req => {
        count += 1
        if (count < 2) {
            req.reply(response)
        } else {
            // do nothing
        }
    })
  }

