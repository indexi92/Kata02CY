/// <reference types="cypress" />

describe("addToCart", () => {
  before(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("addPhone", () => {
    cy.get(".container")
      .find(".list-group-item")
      .eq(1)
      .should("include.text", "Phones")
      .click();
    cy.wait(1000);
    cy.get(".row").find(".card-block").eq(0).should("contain.text", "$360");
    cy.wait(1000);
    cy.get(".row").find(".hrefch").eq(0).click();
    cy.get(".price-container").should("contain.text", "$360");
    cy.get(".row").find(".btn").click();
    cy.on("window:alert", (Text) => {
      expect(Text).contain("Product added");
    });
    cy.on("window:confirm", () => true);
    cy.wait(2000);
    cy.get(".navbar-collapse").find(".nav-link").first().click();
  });

  it("addLaptop", () => {
    cy.get(".container")
      .find(".list-group-item")
      .eq(2)
      .should("include.text", "Laptops")
      .click();
    cy.wait(1000);
    cy.get(".row")
      .find(".card-title")
      .eq(2)
      .should("contain.text", "MacBook air");
    cy.wait(1000);
    cy.get(".row").find(".hrefch").eq(2).click();
    cy.get(".name").should("contain.text", "MacBook air");
    cy.get(".row").find(".btn").click();
    cy.on("window:alert", (Text) => {
      expect(Text).contain("Product added");
    });
    cy.on("window:confirm", () => true);
    cy.wait(2000);
    cy.get(".navbar-collapse").find(".nav-link").first().click();
  });

  it("addMonitor", () => {
    cy.get(".container")
      .find(".list-group-item")
      .eq(3)
      .should("include.text", "Monitors")
      .click();
    cy.wait(1000);
    cy.get(".row").find(".card-block").first().should("contain.text", "$400");
    cy.wait(1000);
    cy.get(".row").find(".hrefch").first().click();
    cy.get(".price-container").should("contain.text", "$400");
    cy.get(".row").find(".btn").click();
    cy.on("window:alert", (Text) => {
      expect(Text).contain("Product added");
    });
    cy.on("window:confirm", () => true);
    cy.wait(2000);
    cy.get(".navbar-collapse").find(".nav-link").first().click();
  });

  it("addMonitor", () => {
    cy.get("#cartur").click();
    cy.wait(3000);
  });
});
