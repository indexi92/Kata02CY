/// <reference types="cypress" />

describe("apiTest", () => {
    before(() => {
      cy.visit("/");
      cy.url().should("eq", Cypress.config().baseUrl);
    });
  
    it("intercept", () => {
    });