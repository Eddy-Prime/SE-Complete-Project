import './commands';
import 'cypress-mochawesome-reporter/register';
import '@shelex/cypress-allure-plugin';
import 'cypress-file-upload';
import './api-stubs';

// Configure automatic screenshot capture on failure
// Cypress.on('test:after:run', (test: Cypress.ObjectLike, runnable: Cypress.ObjectLike) => {
//   if (test.state === 'failed') {
//     const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`;
//     const timestamp = new Date().toISOString().replace(/:/g, '-');
    
//     // Adding additional metadata to help with debugging
//     cy.writeFile(
//       `cypress/reports/test-metadata/${timestamp}-${Cypress.spec.name}.json`,
//       {
//         specName: Cypress.spec.name,
//         testName: test.title,
//         testState: test.state,
//         testError: test.err?.message,
//         testStack: test.err?.stack,
//         timestamp: timestamp
//       }
//     );
//   }
// });

// Define the type for the test context with startTime
// interface TestContext {
//   currentTest: {
//     title: string;
//     startTime?: Date;
//   };
// }

// Execution time tracking for each test
// Use function() instead of arrow functions to preserve the correct 'this' context

// Using Mocha's beforeEach and afterEach instead of Cypress ones
// before(() => {
//   // Initialize anything needed before tests
//   cy.task('resetDatabase');
// });

// Comment out the regular Mocha beforeEach to avoid conflicts with cucumber hooks
// This could be causing the "cy.visit() outside a running test" errors
/* 
beforeEach(function() {
  const testTitle = this.currentTest?.title || 'Unknown test';
  // Store the start time as a property on the currentTest
  if (this.currentTest) {
    (this.currentTest as any).startTime = new Date();
  }
  cy.log(`Test starting: ${testTitle} at ${new Date().toISOString()}`);
});
*/

// Comment out regular Mocha afterEach to avoid conflicts with cucumber hooks
/*
afterEach(function() {
  const testTitle = this.currentTest?.title || 'Unknown test';
  const endTime = new Date();
  const startTime = (this.currentTest as any)?.startTime as Date;
  const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
  
  cy.log(`Test finished: ${testTitle} in ${duration}ms`);
  
  // Record execution time for reporting
  cy.writeFile(
    `cypress/reports/test-timing/${Cypress.spec.name}-timing.json`,
    { 
      test: testTitle, 
      duration: duration,
      timestamp: endTime.toISOString()
    },
    { flag: 'a+' }
  );
  
  // Database reset now handled in Before cucumber hook
});
*/

// Added a global exception handling
Cypress.on('uncaught:exception', (err: Error) => {
  console.error('Uncaught exception:', err.message);
  return false;
});

// Reporting generator hook
// after(() => {
//   cy.task('generateReport');
// });