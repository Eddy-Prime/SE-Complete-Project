import { Before, After } from '@badeball/cypress-cucumber-preprocessor';
import { setupApiStubs } from 'cypress/support/api-stubs';

/**
 * Reset the database before each test to ensure test isolation.
 * This makes each test independent of others by resetting to a clean state.
 */
Before(() => {
  // Reset database to ensure test isolation
  cy.task('resetDatabase');

  
  // Reset any application state or cookies before each test
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Use a generic parameter type that doesn't conflict with TypeScript expectations
After(function () {
  if (this?.test?.state === 'failed') {
    cy.screenshot(`failed-${this.test.title}`);
  }
  cy.task('generateReport');
});

Before(setupApiStubs)