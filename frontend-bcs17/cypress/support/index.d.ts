/// <reference types="cypress" />
/// <reference types="cypress-file-upload" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to log in a user with username and password
     * @example cy.login('username', 'password')
     */
    login(username: string, password: string): Chainable<Element>;

    /**
     * Custom command to log in as a professor
     * @example cy.professorLogin()
     */
    professorLogin(): Chainable<Element>;

    /**
     * Custom command to log in as a student
     * @example cy.studentLogin()
     */
    studentLogin(): Chainable<Element>;

    /**
     * Custom command to create an assignment
     * @example cy.createAssignment('Title', 'Description', '05/15/2025', 'Software Engineering')
     */
    createAssignment(
      title: string,
      description: string,
      dueDate: string,
      schedule: string
    ): Chainable<Element>;

    /**
     * Custom command to upload file(s) to a form
     * @example cy.uploadFiles('#file-upload', 'example.pdf')
     * @example cy.uploadFiles('#file-upload', ['file1.pdf', 'file2.pdf'])
     */
    uploadFiles(selector: string, fileNames: string | string[]): Chainable<Element>;

    /**
     * Custom command to check if an element contains text (case insensitive)
     * @example cy.get('.element').containsText('some text')
     */
    containsText(text: string): Chainable<Element>;

    /**
     * Custom command to wait for an API response
     * @example cy.waitForAPI('GET /api/assignments')
     */
    waitForAPI(route: string): Chainable<Element>;
  }

  interface Chainable {
    /**
     * Custom command to attach a file to an input
     */
    attachFile(filePath: string): Chainable<Element>;
    attachFile(filePaths: string[]): Chainable<Element>;
  }
}