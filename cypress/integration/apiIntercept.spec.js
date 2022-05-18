/// <reference types="cypress" />

describe("apiTest", () => {
  beforeEach(() => {
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
      expect(request.url).to.contain("view");
      expect(response.statusCode).eq(200);
      expect(response.body.cat).include("phone");
      expect(response.statusMessage).contain("OK");
    });
  });

  it("intercept", () => {
    cy.intercept(
      {
        url: "**/view**",
        method: "POST",
      },
      {
        fixture: "responseApi.json",
      }
    ).as("Phone");
    cy.get('[class="hrefch"]').eq(0).click();
    cy.wait("@Phone").then((intercept) => {
      let request = intercept.request;
      let response = intercept.response;
      expect(request.url).to.contain("view");
      expect(response.statusCode).eq(200);
      expect(response.body.cat).include("telephone");
      expect(response.body.title).include("Nokia to old");
      expect(response.body.price).eq(20);
    });
  });
});
