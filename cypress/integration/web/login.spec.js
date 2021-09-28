import {interceptOnce} from "../../support/commands.js"

const email = Cypress.env('email');
const password = Cypress.env('password');
const username = Cypress.env('username');
let errorMessage = 'No active account found with the given credentials'
let errorHTTP = 'Failed, please try again later'

describe('Login Test Suite', () => {
  beforeEach(() => {
    cy.intercept('POST', "**login" ).as('successfulLogin')
    cy.visit('/')
  })

  it('Should show error message with incorrect email', () => {
    cy.login(`${email+1}`, password)
    //Assert error message is shown
    cy.get('.alert').contains(errorMessage).should('be.visible')
  })

  it('Should show error message with incorrect password', () => {
    cy.login(email, `${password+1}`)
    //Assert error message is shown
    cy.get('.alert').contains(errorMessage).should('be.visible')
  })

  it('Should show error message on http status code >=400 ', () => {
    interceptOnce('POST', "**login**", { statusCode: 401}).as('errorLogin')
    cy.login(email, password)
    //Assert error message is shown
    cy.get('.alert').contains(errorHTTP).should('be.visible')
  })
  
  it('Should login with correct credentials and then logout', () => {
    cy.login(email, password)
    cy.wait('@successfulLogin')
    //Assert user is logged in and then logout
    cy.logout(username)
  })
})

describe('Login using the API', () => {
  let user

  before(function fetchUser() {
    cy.request('POST', "http://localhost:8000/api/users/login/", {
      username: email,
      password: password,
    })
      .its('body')
      .then((res) => {
        user = res
      })
  })

  beforeEach(function setUser() {
    cy.visit('/', {
      onBeforeLoad(win) {
        // and before the page finishes loading
        // set the user object in local storage
        win.localStorage.setItem('userInfo', JSON.stringify(user))
      },
    })
  })

  it('Should login using the API', () => {
    // the page should be opened and the user should be logged in
    cy.get('#username').should('have.text', username)
  })
})

