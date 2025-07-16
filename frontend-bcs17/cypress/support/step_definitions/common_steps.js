// Common step definitions
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Navigation steps
Given('I am on the schedules page', () => {
  cy.visit('/schedule/overview');
  cy.url().should('include', '/schedule/overview');
  // Wait for schedules to load
  cy.wait(2000); // Longer wait to ensure the page loads
  cy.log('On schedules page - taking debug screenshot');
  cy.screenshot('debug-schedules-page');
  
  // Log the HTML content to help with debugging
  cy.document().then((doc) => {
    cy.log('Page content:', doc.body.innerHTML);
  });
});

// Add other common step definitions here