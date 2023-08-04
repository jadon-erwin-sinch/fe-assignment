/// <reference types="cypress" />

import { generateUUID } from "../generateUUID";

describe("Complete form flow", () => {
  const appName = "Just the coolest app ever";
  const appNameEdited = "About to be removed though";
  const appDesc = generateUUID();

  describe("Application creation", () => {
    it("should create a new application and update the list", () => {
      const envName = "Production";
      const envRegion = "90210 Beverly Hills";
      const configJson = `{"key": "niceValue"}`;

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
    });
  });

  describe("Environment handling", () => {
    const envName = "Staging";
    const envNameEdited = "Dev";
    const envRegion = "Silicon Valley";
    const configJson = "{}";

    beforeEach(() => {
      cy.visit("/");

      cy.get("[data-testid=app-list]").children().should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).click();
      cy.get("[data-testid=env-dropdown]").children().should("exist");
      cy.get("[data-testid=config-dropdown]").children().should("exist");
    });

    it("should create a new environment and update the dropdown", () => {
      cy.get(`[data-testid="create-env-button"]`).click();

      cy.get("[data-testid=env-name-input]").type(envName);
      cy.get("[data-testid=env-region-input]").type(envRegion);
      cy.get("[data-testid=config-json-input]").type(configJson, {
        parseSpecialCharSequences: false,
      });

      cy.get("[data-testid=form-submit-button]").click();
      cy.get("[data-testid=env-dropdown]")
        .find(":selected")
        .contains(envName)
        .should("exist");
    });

    it("should edit that same environment and then delete it", () => {
      cy.get("[data-testid=env-dropdown]").select(envName);

      cy.get(`[data-testid="edit-env-button"]`).click();

      cy.get("[data-testid=env-name-input]").type(envNameEdited);

      cy.get("[data-testid=form-submit-button]").click();
      cy.get("[data-testid=env-dropdown]")
        .find(":selected")
        .contains(envNameEdited)
        .should("exist");

      cy.get(`[data-testid="delete-env-button"]`).click();
      cy.get("[data-testid=env-dropdown]")
        .find(":selected")
        .contains(envNameEdited)
        .should("not.exist");
    });
  });

  describe("Configuration handling", () => {
    const key = "first";
    const value = "second";
    const value2 = "third";
    const configJson = `{"${key}": "${value}"}`;
    const configJsonEdited = `{"${key}": "${value2}"}`;

    beforeEach(() => {
      cy.visit("/");

      cy.get("[data-testid=app-list]").children().should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).click();
      cy.get(`[data-testid="create-config-button"]`).should("exist");
    });

    it("should create a new configuration and activate it", () => {
      cy.get(`[data-testid="create-config-button"]`).click();

      cy.get("[data-testid=config-json-input]").type(configJson, {
        parseSpecialCharSequences: false,
      });

      cy.get("[data-testid=form-submit-button]").click();
      cy.get("[data-testid=config-json-input-readonly]").should("exist");
      cy.get("[data-testid=config-json-input-readonly]").contains(value);

      cy.get("[data-testid=activate-config-button]").should("not.be.disabled");
      cy.get("[data-testid=activate-config-button]").click();
      cy.get("[data-testid=activate-config-button]").should("be.disabled");
    });

    it("should duplicate and edit that same config", () => {
      cy.get("[data-testid=config-json-input-readonly]")
        .contains(value)
        .should("exist");

      cy.get(`[data-testid="duplicate-config-button"]`).click();

      cy.get("[data-testid=config-json-input]").clear().type(configJsonEdited, {
        parseSpecialCharSequences: false,
      });

      cy.get("[data-testid=form-submit-button]").click();
      cy.get("[data-testid=config-json-input-readonly]").should("exist");
      cy.get("[data-testid=config-json-input-readonly]").contains(value2);

      cy.get("[data-testid=activate-config-button]").should("not.be.disabled");
    });
  });

  describe("Application editing and deleting", () => {
    beforeEach(() => {
      cy.visit("/");

      cy.get("[data-testid=app-list]").children().should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).should("exist");
      cy.get(`[data-testid="${appName}-${appDesc}"]`).click();
    });

    it("should edit our created application and then delete it", () => {
      cy.get(`[data-testid="edit-app-button"]`).click();

      cy.get("[data-testid=app-name-input]").clear().type(appNameEdited);

      cy.get("[data-testid=form-submit-button]").click();
      cy.get(`[data-testid="${appNameEdited}-${appDesc}"]`).should("exist");

      cy.get(`[data-testid="delete-app-button"]`).click();
      cy.get(`[data-testid="${appNameEdited}-${appDesc}"]`).should("not.exist");
    });
  });
});
