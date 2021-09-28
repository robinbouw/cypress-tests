import faker from 'faker';
import {interceptOnce} from "../../support/commands.js"

let username = faker.name.firstName()
let email = username + '.' + faker.name.lastName() + '@mail.com'
let password = Math.random().toString(36).substring(2, 15)
let confirm_password = password
let errorPassword = 'Passwords do not match'
let errorHTTP = 'Failed, please try again later'
let errorUserExists = 'User already exists!'

describe('Sign up Test Suite', () => {

  beforeEach(() => {
    cy.intercept('POST', "**register").as('SignUp')
    cy.visit('/#/register')
  })

  it('Should show error message when passwords do not match', () => {
    //Sign up with passwords not matching
    cy.register(username, email, password, `${confirm_password}1`)
    //Assert error is shown
    cy.assertErrorShown(errorPassword)
  })

  it('Should show error message on http status code >=400', () => {
    interceptOnce('POST', "**register**", { statusCode: 401}).as('errorSignUp')
    //Sign up with correct and unique data
    cy.register(username, email, password, confirm_password)
    cy.wait('@errorSignUp')
    //Assert error is shown
    cy.assertErrorShown(errorHTTP)
  })

  it('Should successfully register a new user', () => {
    //Sign up with correct and unique data
    cy.register(username, email, password, confirm_password)
    cy.wait('@SignUp')
    //Assert user is logged in and then logout
    cy.logout(username)
  })

  it('Should show error message if user already exists', () => {
    //Sign up with credentials already existing in db
    cy.register(username, email, password, confirm_password)
    //Assert error is shown
    cy.assertErrorShown(errorUserExists)
  })
})
