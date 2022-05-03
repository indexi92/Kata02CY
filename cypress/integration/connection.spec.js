/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");

const username = faker.name.findName();
const password = faker.name.findName();

describe("UserCréation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.fixture("connectionData").as("users");
  });
  it("connection", () => {
    cy.get("#login2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Log in");
    cy.wait(1000);
    cy.get("@users").then((users) => {
      const user = users[0];
      cy.get("#logInModal")
        .find("#loginusername")
        .type(user.username)
        .should("contain.value", user.username);
      cy.get("#logInModal")
        .find("#loginpassword")
        .type(user.password)
        .should("contain.value", user.password);
      cy.get("#logInModal")
        .find(".btn-primary")
        .should("include.text", "Log in")
        .click();
      cy.get("#logout2").should("be.visible");
    });
  });
  it("wrongUser", () => {
    cy.get("#login2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Log in");
    cy.wait(1000);
    cy.get("@users").then((users) => {
      const user = users[1];
      cy.get("#logInModal")
        .find("#loginusername")
        .type(user.username)
        .should("contain.value", user.username);
      cy.get("#logInModal")
        .find("#loginpassword")
        .type(user.password)
        .should("contain.value", user.password);
      cy.get("#logInModal")
        .find(".btn-primary")
        .should("include.text", "Log in")
        .click();
      cy.on("window:alert", (Text) => {
        expect(Text).contain("Wrong password.");
      });
    });
  });
  it("wrongPassword", () => {
    cy.get("#login2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Log in");
    cy.wait(1000);
    cy.get("@users").then((users) => {
      const user = users[1];
      cy.get("#logInModal")
        .find("#loginusername")
        .type(user.username)
        .should("contain.value", user.username);
      cy.get("#logInModal")
        .find("#loginpassword")
        .type(user.password)
        .should("contain.value", user.password);
      cy.get("#logInModal")
        .find(".btn-primary")
        .should("include.text", "Log in")
        .click();
      cy.on("window:alert", (Text) => {
        expect(Text).contain("Wrong password.");
      });
    });
  });

  it("userDontExist", () => {
    cy.get("#login2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Log in");
    cy.wait(1000);
    cy.get("#logInModal")
      .find("#loginusername")
      .type(username)
      .should("contain.value", username);
    cy.get("#logInModal")
      .find("#loginpassword")
      .type(password)
      .should("contain.value", password);
    cy.get("#logInModal")
      .find(".btn-primary")
      .should("include.text", "Log in")
      .click();
    cy.on("window:alert", (Text) => {
      expect(Text).contain("User does not exist.");
    });
  });

  it("closeWindow", () => {
    cy.get("#login2")
      .click()
      .should("be.be.visible")
      .and("include.text", "Log in");
    cy.wait(1000);
    cy.get("#logInModal")
      .find(".btn-secondary")
      .should("include.text", "Close")
      .click();
    cy.get("#login2").should("be.visible");
  });
});
