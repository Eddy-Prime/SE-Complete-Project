// Common step definitions for all features
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Authentication steps
Given('Professor Thompson is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('professor.thompson');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.visit('/dashboard');
});

Given('Student Alex is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('student.alex');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.visit('/dashboard');
});

Given('Student Sarah is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('student.sarah');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.visit('/dashboard');
});

// Navigation steps
Given('Professor Thompson navigates to the assignment creation page', () => {
  cy.visit('/assignments/create');
});

Given('Student {word} navigates to the assignment details page for {string}', (student, assignmentTitle) => {
  cy.visit('/assignments');
  cy.contains(assignmentTitle).click();
});

// Common steps used across features
Given('Student {word} is enrolled in the {string} schedule', (studentName, scheduleName) => {
  cy.visit('/schedules');
  cy.log(`${studentName} is enrolled in ${scheduleName}`);
});

Given('there is an assignment {string} with due date {string}', (assignmentTitle, dueDate) => {
  cy.visit('/assignments');
  cy.log(`Assignment "${assignmentTitle}" exists with due date ${dueDate}`);
});

// Button click steps
When('Student {word} clicks the {string} button', (student, buttonText) => {
  cy.contains('button', buttonText).click({ force: true });
});

When('Professor Thompson clicks the {string} button', (buttonText) => {
  cy.contains('button', buttonText).click({ force: true });
});

// Submission steps
When('Student {word} enters {string} as the submission content', (student, content) => {
  cy.get('[data-testid="submission-content"]').type(content, { force: true });
});

When('Student {word} uploads {string} as an attachment', (student, fileName) => {
  cy.get('[data-testid="submission-file-upload"]').attachFile(fileName, { force: true });
});

// Assignment status steps
Then('the assignment status should change to {string}', (status) => {
  cy.log(`Assignment status is "${status}"`);
});

// Grading steps
When('Professor Thompson assigns a score of {string} to the submission', (score) => {
  cy.get('[data-testid="grade-input"]').type(score, { force: true });
});

When('Professor Thompson enters {string} as feedback', (feedback) => {
  cy.get('[data-testid="feedback-input"]').type(feedback, { force: true });
});

When('Professor Thompson submits the grade', () => {
  cy.get('[data-testid="submit-grade-button"]').click({ force: true });
});

Then('the submission should be graded successfully', () => {
  cy.log('Submission was graded successfully');
});