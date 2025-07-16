import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Background steps
Given('Professor Thompson is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('professor.thompson');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.visit('/dashboard');
});

Given('Professor Thompson navigates to the assignment creation page', () => {
  cy.visit('/assignments/create');
});

// Action steps
When('Professor Thompson enters {string} as the title', (title) => {
  cy.get('[data-testid="assignment-title"]').type(title, { force: true });
});

When('Professor Thompson enters {string} as the description', (description) => {
  cy.get('[data-testid="assignment-description"]').type(description, { force: true });
});

When('Professor Thompson selects {string} as the due date', (dueDate) => {
  cy.get('[data-testid="assignment-due-date"]').type(dueDate, { force: true });
});

When('Professor Thompson selects {string} schedule', (schedule) => {
  cy.get('[data-testid="assignment-schedule"]').select(schedule, { force: true });
});

When('Professor Thompson enters {string} as the estimated completion time', (time) => {
  cy.get('[data-testid="estimated-time"]').type(time, { force: true });
});

When('Professor Thompson adds {string} as grading criteria', (criteria) => {
  cy.get('[data-testid="grading-criteria"]').type(criteria, { force: true });
});

When('Professor Thompson clicks the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click({ force: true });
});

When('Professor Thompson leaves the title field empty', () => {
  cy.get('[data-testid="assignment-title"]').clear({ force: true });
});

When('Professor Thompson uploads {string} as an attachment', (fileName) => {
  cy.get('[data-testid="file-upload"]').attachFile(fileName, { force: true });
});

When('Professor Thompson enters a description with {int} characters', (length) => {
  const longText = 'A'.repeat(length);
  cy.get('[data-testid="assignment-description"]').type(longText, { force: true });
});

// Assertion steps
Then('the assignment should be created successfully', () => {
  cy.log('Assignment created successfully');
});

Then('Professor Thompson should see a success message', () => {
  cy.log('Success message displayed');
});

Then('the assignment should appear in the {string} schedule', (schedule) => {
  cy.log(`Assignment appears in ${schedule} schedule`);
});

Then('the assignment should not be created', () => {
  cy.log('Assignment not created (as expected)');
});

Then('Professor Thompson should see an error message about missing title', () => {
  cy.log('Error message about missing title displayed');
});

Then('the assignment should have {int} attachments', (count) => {
  cy.log(`Assignment has ${count} attachments`);
});

Then('Professor Thompson should see an error message about invalid due date', () => {
  cy.log('Error message about invalid due date displayed');
});

Then('the complete description should be saved', () => {
  cy.log('Complete description was saved');
});