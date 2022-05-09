/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");

const name = faker.name.findName();
const country = faker.address.country();
const city = faker.address.city();
const card = faker.finance.creditCardNumber();
const month = faker.date.month();
const year = 2020;

describe("Order", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
  });
  it("orderCloseWindow", () => {
    cy.get("#cartur").click();
    cy.get("#page-wrapper")
      .find(".btn")
      .should("include.text", "Place Order")
      .click();
    cy.wait(1000);
    cy.get("#orderModal")
      .find("[data-dismiss=modal]")
      .eq(1)
      .should("include.text", "Close")
      .click();
    cy.get("#page-wrapper")
      .find(".btn")
      .should("be.visible")
      .and("include.text", "Place Order");
  });

  it("orderPurchase", () => {
    cy.get("#cartur").click();
    cy.get("#page-wrapper")
      .find(".btn")
      .should("include.text", "Place Order")
      .click();
    cy.wait(1000);
    cy.get("#name").type(name);
    cy.get("#country").type(country);
    cy.get("#city").type(city);
    cy.get("#card").type(card);
    cy.get("#month").type(month);
    cy.get("#year").type(year);
    cy.get("#orderModal")
      .find(".btn-primary")
      .should("include.text", "Purchase")
      .click();
    cy.get(".sweet-alert > h2").should(
      "include.text",
      "Thank you for your purchase!"
    );
    cy.get(".sa-confirm-button-container")
      .find("[tabindex=1]")
      .should("include.text", "OK")
      .click();
    // cy.wait(1000);
    // cy.url().should("eq", "https://www.demoblaze.com/index.html");
  });

  it("orderPurchase", () => {
    cy.get("#cartur").click();
    cy.get("#page-wrapper")
      .find(".btn")
      .should("include.text", "Place Order")
      .click();
    cy.wait(1000);
    cy.get("#orderModal")
      .find(".btn-primary")
      .should("include.text", "Purchase")
      .click();
    cy.on("window:alert", (text) => {
      expect(text).contain("Please fill out Name and Creditcard.");
    });
    cy.on("window:confirm", () => true);
  });
});
