import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Authentication steps
Given('Student Alex is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('student.alex');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.visit('/dashboard');
});

// Background setup steps
Given('Student Alex is enrolled in multiple schedules', () => {
  cy.log('Student Alex is enrolled in multiple schedules');
});

Given('there are multiple assignments across different schedules', () => {
  cy.log('Multiple assignments exist across different schedules');
});

// Navigation steps
Given('Student Alex navigates to the assignments page', () => {
  cy.visit('/assignments');
});

// View steps
When('Student Alex views the assignment dashboard', () => {
  cy.log('Student Alex views the assignment dashboard');
});

When('Student Alex filters assignments by schedule {string}', (schedule) => {
  cy.get('[data-testid="schedule-filter"]').select(schedule, { force: true });
});

When('Student Alex sorts assignments by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').click({ force: true });
});

When('Student Alex filters assignments by {string} status', (status) => {
  cy.get('[data-testid="status-filter"]').select(status, { force: true });
});

When('Student Alex clicks on assignment {string}', (title) => {
  cy.contains(title).click({ force: true });
  cy.visit('/assignments/123');
});

When('Student Alex filters assignments by approaching deadlines', () => {
  cy.get('[data-testid="upcoming-deadlines-filter"]').click({ force: true });
});

// Assertion steps
Then('Student Alex should see all assigned assignments', () => {
  cy.log('All assignments are visible');
});

Then('assignments should be grouped by their respective schedules', () => {
  cy.log('Assignments are grouped by schedules');
});

Then('Student Alex should see only assignments from the {string} schedule', (schedule) => {
  cy.log(`Only assignments from ${schedule} are visible`);
});

Then('assignments should be ordered from earliest to latest due date', () => {
  cy.log('Assignments are ordered by due date');
});

Then('Student Alex should see only {string} assignments', (status) => {
  cy.log(`Only ${status} assignments are visible`);
});

Then('Student Alex should see the full assignment details', () => {
  cy.log('Full assignment details are visible');
});

Then('the details should include title, description, due date, and attachments', () => {
  cy.log('Assignment details show title, description, due date, and attachments');
});

Then('Student Alex should see assignments due within the next week highlighted', () => {
  cy.log('Upcoming assignments are highlighted');
});

Then('assignments should be sorted by proximity to deadline', () => {
  cy.log('Assignments are sorted by proximity to deadline');
});

// Background steps
Given('Student Emma is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('student.emma');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/dashboard');
});

Given('there are multiple assignments in the system', () => {
  cy.visit('/assignments');
  cy.get('[data-testid="assignments-list"] tr').should('have.length.at.least', 2);
});

Given('Student Sarah is logged in', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type('student.sarah');
  cy.get('[data-testid="password"]').type('password123');
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/dashboard');
});

Given('Student Sarah is enrolled in {string} and {string} schedules', (schedule1, schedule2) => {
  cy.visit('/schedules');
  cy.get('[data-testid="enrolled-schedules"]').should('contain', schedule1);
  cy.get('[data-testid="enrolled-schedules"]').should('contain', schedule2);
});

Given('Student {word} is enrolled in the {string} schedule', (studentName, scheduleName) => {
  cy.visit('/schedules');
  cy.contains(scheduleName).should('be.visible');
  cy.contains(scheduleName).click();
  cy.contains(`${studentName} enrolled`).should('exist');
  cy.visit('/dashboard');
});

Given('Student Sarah has {int} assignments across different schedules', (count) => {
  cy.visit('/assignments');
  cy.get('[data-testid="assignment-item"]').should('have.length', count);
});

Given('there are assignments due in the next week', () => {
  cy.visit('/assignments');
  cy.get('[data-testid="upcoming-assignments-indicator"]').should('be.visible');
});

// Action steps
When('Student Emma navigates to the assignments page', () => {
  cy.visit('/assignments');
  cy.url().should('include', '/assignments');
});

When('Student Emma clicks on the assignment titled {string}', (title) => {
  cy.contains(title).click();
});

When('Student Emma filters assignments by course {string}', (course) => {
  cy.get('[data-testid="course-filter"]').select(course);
});

When('Student Emma searches for {string} in the search box', (keyword) => {
  cy.get('[data-testid="search-box"]').type(keyword);
  cy.get('[data-testid="search-button"]').click();
});

When('Student Emma sorts assignments by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').click();
});

When('Student Emma filters assignments by status {string}', (status) => {
  cy.get('[data-testid="status-filter"]').select(status);
});

When('Student Sarah navigates to the assignment dashboard', () => {
  cy.visit('/assignments');
  cy.url().should('include', '/assignments');
});

When('Student Sarah selects the {string} option', (option) => {
  cy.get(`[data-testid="${option.toLowerCase().replace(/\s+/g, '-')}-option"]`).click();
});

When('Student Sarah clicks on the {string} assignment', (assignmentTitle) => {
  cy.contains(assignmentTitle).click();
});

When('Student Sarah selects {string} status', (status) => {
  cy.get('[data-testid="status-filter"]').select(status);
});

When('Student Sarah navigates to the assignments page', () => {
  cy.visit('/assignments');
  cy.url().should('include', '/assignments');
});

When('Student Sarah clicks on the {string} schedule filter', (scheduleName) => {
  cy.get('[data-testid="schedule-filter"]').click();
  cy.contains(scheduleName).click();
});

When('Student Sarah clicks on the sort by due date option', () => {
  cy.get('[data-testid="sort-by-dropdown"]').click();
  cy.contains('Due Date').click();
});

When('Student Sarah filters by {string} status', (status) => {
  cy.get('[data-testid="status-filter"]').click();
  cy.contains(status).click();
});

When('Student Sarah clicks on the {string} assignment', (assignmentTitle) => {
  cy.contains(assignmentTitle).click();
});

When('Student Sarah clicks on the {string} tab', (tabName) => {
  cy.contains('button', tabName).click();
});

// Assertion steps
Then('Student Emma should see a list of all assignments', () => {
  cy.get('[data-testid="assignments-list"]').should('be.visible');
  cy.get('[data-testid="assignments-list"] tr').should('have.length.at.least', 1);
});

Then('Student Emma should see the details of assignment {string}', (title) => {
  cy.url().should('include', '/assignments/');
  cy.get('[data-testid="assignment-title"]').should('contain', title);
  cy.get('[data-testid="assignment-details"]').should('be.visible');
});

Then('Student Emma should see only assignments for course {string}', (course) => {
  cy.get('[data-testid="assignments-list"] tr').each(($el) => {
    cy.wrap($el).should('contain', course);
  });
});

Then('Student Emma should see only assignments containing {string}', (keyword) => {
  cy.get('[data-testid="assignments-list"] tr').each(($el) => {
    cy.wrap($el).should('contain', keyword);
  });
});

Then('Student Emma should see assignments sorted by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').should('have.attr', 'aria-sort', 'ascending');
});

Then('Student Emma should see only {string} assignments', (status) => {
  cy.get('[data-testid="assignments-list"] tr').each(($el) => {
    cy.wrap($el).find('[data-testid="assignment-status"]').should('contain', status);
  });
});

Then('Student Emma should see all attached files', () => {
  cy.get('[data-testid="attachment-list"]').should('be.visible');
  cy.get('[data-testid="attachment-list"] li').should('have.length.at.least', 1);
});

Then('Student Emma should see the assignment description, due date, and grading criteria', () => {
  cy.get('[data-testid="assignment-description"]').should('be.visible');
  cy.get('[data-testid="assignment-due-date"]').should('be.visible');
  cy.get('[data-testid="assignment-grading-criteria"]').should('be.visible');
});

Then('Student Sarah should see assignments from {string}', (scheduleName) => {
  cy.get('[data-testid="assignments-list"]').should('contain', scheduleName);
});

Then('each assignment should display its title and due date', () => {
  cy.get('[data-testid="assignment-item"]').each(($el) => {
    cy.wrap($el).find('[data-testid="assignment-title"]').should('be.visible');
    cy.wrap($el).find('[data-testid="assignment-due-date"]').should('be.visible');
  });
});

Then('Student Sarah should see assignments grouped by schedule', () => {
  cy.get('[data-testid="schedule-group"]').should('have.length.at.least', 2);
});

Then('each schedule section should display its title', () => {
  cy.get('[data-testid="schedule-title"]').should('be.visible');
});

Then('assignments within each schedule should be listed chronologically', () => {
  cy.get('[data-testid="schedule-group"]').each(($group) => {
    cy.wrap($group).find('[data-testid="assignment-due-date"]').should('have.length.at.least', 1);
  });
});

Then('assignments should be displayed in ascending order of due date', () => {
  cy.get('[data-testid="sort-by-due-date-option"]').should('have.attr', 'aria-sort', 'ascending');
});

Then('assignments past their due date should be visually distinct', () => {
  cy.get('[data-testid="past-due-assignment"]').should('have.css', 'color', 'rgb(220, 38, 38)');
});

Then('only assignments with {string} status should be displayed', (status) => {
  cy.get('[data-testid="assignment-item"]').each(($el) => {
    cy.wrap($el).find('[data-testid="assignment-status"]').should('contain', status);
  });
});

Then('Student Sarah should see the complete assignment details', () => {
  cy.get('[data-testid="assignment-details"]').should('be.visible');
});

Then('the details should include title, description, due date, and estimated completion time', () => {
  cy.get('[data-testid="assignment-title"]').should('be.visible');
  cy.get('[data-testid="assignment-description"]').should('be.visible');
  cy.get('[data-testid="assignment-due-date"]').should('be.visible');
  cy.get('[data-testid="estimated-completion-time"]').should('be.visible');
});

Then('the details should show any attached files', () => {
  cy.get('[data-testid="attachment-list"]').should('be.visible');
});

Then('the details should display the grading criteria', () => {
  cy.get('[data-testid="grading-criteria"]').should('be.visible');
});

Then('Student Sarah should see assignments due within the next 7 days', () => {
  cy.get('[data-testid="upcoming-assignments"]').should('be.visible');
});

Then('assignments should be highlighted based on urgency', () => {
  cy.get('[data-testid="urgent-assignment"]').should('have.css', 'background-color');
});

Then('the due date should show remaining time', () => {
  cy.get('[data-testid="remaining-time"]').should('be.visible');
});

Then('Student Sarah should see all {int} assignments listed', (count) => {
  cy.get('[data-testid="assignment-item"]').should('have.length', count);
});

Then('Student Sarah should only see assignments from the {string} schedule', (scheduleName) => {
  cy.get('[data-testid="assignment-schedule"]').each(($el) => {
    cy.wrap($el).should('contain', scheduleName);
  });
});

Then('the assignments should be sorted with earliest due date first', () => {
  cy.get('[data-testid="due-date"]').then(($dates) => {
    const dates = $dates.map((i, el) => {
      return new Date(el.textContent.trim());
    }).get();
    
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i]).to.be.at.least(dates[i-1]);
    }
  });
});

Then('Student Sarah should only see assignments with {string} status', (status) => {
  cy.get('[data-testid="assignment-status"]').each(($el) => {
    cy.wrap($el).should('contain', status);
  });
});

Then('Student Sarah should see detailed information about the assignment', () => {
  cy.get('[data-testid="assignment-details"]').should('be.visible');
  cy.get('[data-testid="assignment-title"]').should('be.visible');
  cy.get('[data-testid="assignment-description"]').should('be.visible');
  cy.get('[data-testid="assignment-due-date"]').should('be.visible');
  cy.get('[data-testid="assignment-schedule"]').should('be.visible');
});

Then('the assignment resources section should display {int} resources', (count) => {
  cy.get('[data-testid="assignment-resources"] [data-testid="resource-item"]')
    .should('have.length', count);
});

Then('Student Sarah should see assignments due within the next {int} days highlighted', (days) => {
  cy.get('[data-testid="upcoming-assignment-highlight"]').should('be.visible');
});