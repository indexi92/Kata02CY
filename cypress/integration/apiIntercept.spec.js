/// <reference types="cypress" />

describe("apiTest", () => {
  before(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("intercept", () => {
    cy.intercept({
      url: "**/view**",
      method: "POST",
    }).as("Phone");
    cy.get('[class="hrefch"]').eq(0).click();
    cy.wait("@Phone").then((intercept) => {
      let request = intercept.request;
      let response = intercept.response;
      expect(response.statusCode).eq(200);
    });
  });
});
