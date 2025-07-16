
import 'cypress-file-upload';

// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(username);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

// for professor login
Cypress.Commands.add('professorLogin', () => {
  cy.login('professor.thompson', 'password123');
  cy.url().should('include', '/dashboard');
});

// for student login
Cypress.Commands.add('studentLogin', () => {
  cy.login('student.alex', 'password123');
  cy.url().should('include', '/dashboard');
});

// for creating an assignment
Cypress.Commands.add('createAssignment', (title, description, dueDate, schedule) => {
  cy.visit('/assignments/create');
  cy.get('[data-testid="assignment-title"]').type(title);
  cy.get('[data-testid="assignment-description"]').type(description);
  cy.get('[data-testid="assignment-due-date"]').type(dueDate);
  cy.get('[data-testid="assignment-schedule"]').select(schedule);
  cy.contains('button', 'Create Assignment').click();
});

// Custom command for uploading file(s)
Cypress.Commands.add('uploadFiles', (selector, fileNames) => {
  if (Array.isArray(fileNames)) {
    cy.get(selector).attachFile(fileNames);
  } else {
    cy.get(selector).attachFile(fileNames);
  }
});

// Custom command for checking if an element contains text (case insensitive)
Cypress.Commands.add('containsText', { prevSubject: true }, (subject, text) => {
  const regex = new RegExp(text, 'i');
  cy.wrap(subject).should(($el) => {
    expect($el.text()).to.match(regex);
  });
});

// Custom command to wait for API response
Cypress.Commands.add('waitForAPI', (route) => {
  cy.intercept(route).as('apiCall');
  cy.wait('@apiCall');
});
