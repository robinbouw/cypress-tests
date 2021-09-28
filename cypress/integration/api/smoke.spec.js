import { endpoints, methods, API_make_request } from "../../support/endpoints.js";
let client_token = "";
const bearer = true;

describe("APIv2 endpoints smoke test", function() {

  before(() => {
    // GIVEN we request the JWT token endpoint with user and pass
    const request = API_make_request(endpoints.CLIENT_TOKEN, methods.POST);
    // WHEN we receive a response back
    cy.request(request).then((response) => {
      // THEN it should contain a client token
      client_token = JSON.stringify(response.body.token);
      expect(client_token).to.not.eq("");
      // AND the response should pass basic verification
      cy.apiBasicVerification(response);
    });
  });

  // Articles endpoint, get an article by ID
  it("Ping Products endpoint", function() {
    // GIVEN a request to an article endpoint is made with certain ID
    const request = API_make_request(endpoints.PRODUCTS, methods.GET);
    // WHEN we get a response back from API
    cy.request(request).then((response) => {
      // THEN we should get the valid response
      cy.apiBasicVerification(response);
      // AND API should return requested article in response
      // expect(response.body.article.id).to.eq(entities.article.id);
    });
  });

  it("Ping first Product endpoint", function() {
    // GIVEN a request to an article endpoint is made with certain ID
    const request = API_make_request(endpoints.PRODUCTS_ID1, methods.GET);
    // WHEN we get a response back from API
    cy.request(request).then((response) => {
      // THEN we should get the valid response
      cy.apiBasicVerification(response);
      // AND API should return requested article in response
      // expect(response.body.article.id).to.eq(entities.article.id);
    });
  });

  it("Ping User Profile endpoint", function() {
    // GIVEN a request to an article endpoint is made with certain ID
    const request = API_make_request(endpoints.USER_PROFILE, methods.GET, client_token, bearer);
    // WHEN we get a response back from API
    cy.request(request).then((response) => {
      // THEN we should get the valid response
      cy.apiBasicVerification(response);
      // AND API should return requested article in response
      // expect(response.body.article.id).to.eq(entities.article.id);
    });
  });

  it("Ping Users Profiles endpoint", function() {
    // GIVEN a request to an article endpoint is made with certain ID
    const request = API_make_request(endpoints.USERS_PROFILES, methods.GET, client_token, bearer);
    // WHEN we get a response back from API
    cy.request(request).then((response) => {
      // THEN we should get the valid response
      cy.apiBasicVerification(response);
      // AND API should return requested article in response
      // expect(response.body.article.id).to.eq(entities.article.id);
    });
  });
})
