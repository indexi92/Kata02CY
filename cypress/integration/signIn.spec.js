/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");

const username = faker.name.findName();
const password = faker.name.findName();

describe("UserCréation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("userAlreadyExist", () => {
    cy.get("#signin2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Sign up");
    cy.wait(1000);
    cy.get("#sign-username").type("test").should("include.value", "test");
    cy.get("#sign-password").type("test").should("include.value", "test");
    cy.get("#signInModal").find(".btn-primary").click();
    cy.on("window:alert", (Text) => {
      expect(Text).contain("This user already exist.");
    });
  });

  it("newUser", () => {
    cy.get("#signin2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Sign up");
    cy.wait(1000);
    cy.get("#sign-username").type(username).should("be.visible");
    cy.get("#sign-password").type(password).should("be.visible");
    cy.get("#signInModal").find(".btn-primary").click();
  });

  it("closeWindow", () => {
    cy.get("#signin2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Sign up");
    cy.get("#signInModal")
      .find(".btn-secondary")
      .should("include.text", "Close");
    cy.wait(1000);
    cy.get("#signInModal").find(".btn-secondary").click();
    cy.get("#signin2").should("be.visible");
  });
});
