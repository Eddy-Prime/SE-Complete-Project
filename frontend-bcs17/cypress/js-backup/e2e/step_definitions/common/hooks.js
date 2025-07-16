
import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

// Global hooks for all scenarios
Before(() => {
  // Reset any application state or cookies before each test
  cy.clearCookies();
  cy.clearLocalStorage();
});

After(({ result }) => {
  // Take screenshots on test failures
  if (result.status === 'failed') {
    cy.screenshot(`failed-${result.feature.name}-${result.scenario.name}`);
  }
});