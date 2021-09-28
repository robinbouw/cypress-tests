export const endpoints = {
    CLIENT_TOKEN: "/api/users/login/",
    PRODUCTS: "/api/products",
    PRODUCTS_ID1: "/api/products/1",
    USER_PROFILE: "/api/users/profile",
    USERS_PROFILES: "/api/users",
}

export const methods = {
    GET: "GET",
    POST: "POST"
}

export const API_make_request = (
    endpoint,                 // endpoint is a mandatory argument
    method = methods.GET,     // we assume that default method is GET
    client_token,  // optional value
    bearer 
  ) => {
    const url = (Cypress.env('api'), endpoint);
    // set body, if needed, and headers
    let body, headers = {};
    if (method == methods.POST) {
      body = {
          username: Cypress.env('email'),
          password: Cypress.env('password')
      };
    }
    else if (bearer) {
      headers = {
        Authorization: `Bearer ${JSON.parse(client_token)}`
      };
    }
    // return full request
    return {
      method: method,
      url: url,
      body: body,
      headers: headers
    };
  }