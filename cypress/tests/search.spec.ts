/// <reference types="cypress" />

import { generateUUID } from "../generateUUID";

describe("Search functionality", () => {
  const appName = generateUUID();
  const appDesc = "appDesc";
  const envName = "envName";
  const envRegion = "envRegion";
  const configJson = `{}`;

  it("should create an app, perform a search and filter out all other items", () => {
    cy.visit("/");

    cy.get("[data-testid=app-list]").children().should("exist");
    cy.get("[data-testid=create-app-button]").click();

    cy.get("[data-testid=app-name-input]").type(appName);
    cy.get("[data-testid=app-desc-input]").type(appDesc);
    cy.get("[data-testid=env-name-input]").type(envName);
    cy.get("[data-testid=env-region-input]").type(envRegion);
    cy.get("[data-testid=config-json-input]").type(configJson, {
      parseSpecialCharSequences: false,
    });

    cy.get("[data-testid=form-submit-button]").click();
    cy.get(`[data-testid="${appName}-${appDesc}"]`).should("exist");

    cy.get("[data-testid=search-bar]").type(appName);

    cy.get("[data-testid=app-list]").children().should("have.length", 1);
    cy.get(`[data-testid="${appName}-${appDesc}"]`).should("exist");

    cy.get(`[data-testid="delete-app-button"]`).click();
    cy.get(`[data-testid="${appName}-${appDesc}"]`).should("not.exist");
  });

  it("should show the no results view if no match is made", () => {
    cy.visit("/");

    cy.get("[data-testid=app-list]").children().should("exist");
    cy.get("[data-testid=search-bar]").type("asdfghjklöä");
    cy.get("[data-testid=app-list]").should("not.exist");
    cy.get("[data-testid=no-results-found]").should("exist");
  });
});
