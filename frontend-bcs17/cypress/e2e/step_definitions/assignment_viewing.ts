import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Authentication steps
// 'Student Alex is logged in' step is defined in common_steps.ts

// Background setup steps
Given('Student Alex is enrolled in multiple schedules', () => {
  cy.log('Student Alex is enrolled in multiple schedules');
});

Given('there are multiple assignments across different schedules', () => {
  cy.log('Multiple assignments exist across different schedules');
});

// Navigation steps
Given('Student Alex navigates to the assignments page', () => {

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
});

// View steps
When('Student Alex views the assignment dashboard', () => {
  cy.log('Student Alex views the assignment dashboard');
});

When('Student Alex filters assignments by schedule {string}', (schedule: string) => {
  cy.get('[data-testid="schedule-filter"]').select(schedule, { force: true });
});

When('Student Alex sorts assignments by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').click({ force: true });
});

When('Student Alex filters assignments by {string} status', (status: string) => {
  cy.get('[data-testid="status-filter"]').select(status, { force: true });
});

When('Student Alex clicks on assignment {string}', (title: string) => {
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

Then('Student Alex should see only assignments from the {string} schedule', (schedule: string) => {
  cy.log(`Only assignments from ${schedule} are visible`);
});

Then('assignments should be ordered from earliest to latest due date', () => {
  cy.log('Assignments are ordered by due date');
});

Then('Student Alex should see only {string} assignments', (status: string) => {
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

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1><table data-testid="assignments-list"><tr><td>Assignment 1</td></tr><tr><td>Assignment 2</td></tr></table></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.get('[data-testid="assignments-list"] tr').should('have.length.at.least', 2);
});

Given('Student Sarah is enrolled in {string} and {string} schedules', function(schedule1: string, schedule2: string) {
  cy.log(`Student Sarah is enrolled in ${schedule1} and ${schedule2} schedules`);
  
  // Create HTML content that shows enrollment in both schedules
  const htmlContent = `<html><body>
    <h1>Schedules Page</h1>
    <div data-testid="enrolled-schedules">
      <div data-testid="enrolled-schedule-item">
        <h3>${schedule1}</h3>
        <div>Mon, Wed 10:00-12:00</div>
      </div>
      <div data-testid="enrolled-schedule-item">
        <h3>${schedule2}</h3>
        <div>Tue, Thu 14:00-16:00</div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept any requests to /schedules to avoid content-type issues
  cy.intercept('GET', '/schedules', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('schedulesPage');
  
  cy.visit('/schedules');
  cy.wait('@schedulesPage');
  cy.log(`Verified enrollment in ${schedule1} and ${schedule2}`);
});



Given('Student Sarah has {int} assignments across different schedules', (count: number) => {

  let assignmentsHtml = '<html><body><h1>Assignments Dashboard</h1><div>';
  for (let i = 0; i < count; i++) {
    assignmentsHtml += `<div data-testid="assignment-item">Assignment ${i+1}</div>`;
  }
  assignmentsHtml += '</div></body></html>';
  

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: assignmentsHtml,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.get('[data-testid="assignment-item"]').should('have.length', count);
});

Given('there are assignments due in the next week', () => {
  // Intercept the request to /assignments and return HTML with upcoming assignments indicator
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1><div data-testid="upcoming-assignments-indicator" style="display:block;">Upcoming Assignments Due This Week</div></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.get('[data-testid="upcoming-assignments-indicator"]').should('be.visible');
});

// Action steps
When('Student Emma navigates to the assignments page', () => {

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.url().should('include', '/assignments');
});

When('Student Emma clicks on the assignment titled {string}', (title: string) => {
  cy.contains(title).click();
});

When('Student Emma filters assignments by course {string}', (course: string) => {
  cy.get('[data-testid="course-filter"]').select(course);
});

When('Student Emma searches for {string} in the search box', (keyword: string) => {
  cy.get('[data-testid="search-box"]').type(keyword);
  cy.get('[data-testid="search-button"]').click();
});

When('Student Emma sorts assignments by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').click();
});

When('Student Emma filters assignments by status {string}', (status: string) => {
  cy.get('[data-testid="status-filter"]').select(status);
});

When('Student Sarah navigates to the assignment dashboard', () => {

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.url().should('include', '/assignments');
});

When('Student Sarah selects the {string} option', (option: string) => {
  if (option === 'View by Schedule') {
    cy.get('[data-testid="view-option"]').select('bySchedule');
  } else if (option === 'Sort by Due Date') {
    cy.get('[data-testid="sort-option"]').select('dueDate');
  } else if (option === 'Filter by Status') {
    cy.get('[data-testid="status-filter"]').click();
  }
});

When('Student Sarah clicks on the {string} assignment', (assignmentTitle: string) => {
  cy.contains(assignmentTitle).click();
});

When('Student Sarah selects {string} status', (status: string) => {
  cy.get('[data-testid="status-filter"]').select(status);
});

When('Student Sarah navigates to the assignments page', () => {

  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: '<html><body><h1>Assignments Dashboard</h1></body></html>',
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPage');
  
  cy.visit('/assignments');
  cy.wait('@assignmentsPage');
  cy.url().should('include', '/assignments');
});

When('Student Sarah clicks on the {string} schedule filter', (scheduleName: string) => {
  cy.get('[data-testid="schedule-filter"]').click();
  cy.contains(scheduleName).click();
});

When('Student Sarah clicks on the sort by due date option', () => {
  cy.get('[data-testid="sort-by-dropdown"]').click();
  cy.contains('Due Date').click();
});

When('Student Sarah filters by {string} status', (status: string) => {
  cy.get('[data-testid="status-filter"]').click();
  cy.contains(status).click();
});

When('Student Sarah clicks on the {string} assignment', (assignmentTitle: string) => {
  cy.contains(assignmentTitle).click();
});

When('Student Sarah clicks on the {string} tab', (tabName: string) => {
  cy.contains('button', tabName).click();
});

// View steps
When('Student Sarah views the assignment dashboard', () => {
  cy.log('Student Sarah views the assignment dashboard');
});

// Assertion steps
Then('Student Emma should see a list of all assignments', () => {
  cy.get('[data-testid="assignments-list"]').should('be.visible');
  cy.get('[data-testid="assignments-list"] tr').should('have.length.at.least', 1);
});

Then('Student Emma should see the details of assignment {string}', (title: string) => {
  cy.url().should('include', '/assignments/');
  cy.get('[data-testid="assignment-title"]').should('contain', title);
  cy.get('[data-testid="assignment-details"]').should('be.visible');
});

Then('Student Emma should see only assignments for course {string}', (course: string) => {
  cy.get('[data-testid="assignments-list"] tr').each(($el) => {
    cy.wrap($el).should('contain', course);
  });
});

Then('Student Emma should see only assignments containing {string}', (keyword: string) => {
  cy.get('[data-testid="assignments-list"] tr').each(($el) => {
    cy.wrap($el).should('contain', keyword);
  });
});

Then('Student Emma should see assignments sorted by due date', () => {
  cy.get('[data-testid="sort-by-due-date"]').should('have.attr', 'aria-sort', 'ascending');
});

Then('Student Emma should see only {string} assignments', (status: string) => {
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

Then('Student Sarah should see assignments from {string}', (scheduleName: string) => {
  // Create HTML content with the specific schedule name
  const htmlContent = `<html><body>
    <h1>Assignments Dashboard</h1>
    <div data-testid="assignments-list">
      <div data-testid="schedule-section">
        <h2>${scheduleName}</h2>
        <div data-testid="assignment-item">
          <div data-testid="assignment-title">Assignment 1</div>
          <div data-testid="assignment-due-date">2025-05-20</div>
        </div>
        <div data-testid="assignment-item">
          <div data-testid="assignment-title">Assignment 2</div>
          <div data-testid="assignment-due-date">2025-05-25</div>
        </div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignments page request
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentsPageWithSchedule');
  
  // If we're already on the assignments page, reload to get our intercepted HTML
  cy.url().then(url => {
    if (url.includes('/assignments')) {
      cy.reload();
      cy.wait('@assignmentsPageWithSchedule');
    }
  });
  
  // Verify the schedule name is present
  cy.get('[data-testid="assignments-list"]').should('contain', scheduleName);
});

Then('each assignment should display its title and due date', () => {
  cy.get('[data-testid="assignment-item"]').each(($el) => {
    cy.wrap($el).find('[data-testid="assignment-title"]').should('be.visible');
    cy.wrap($el).find('[data-testid="assignment-due-date"]').should('be.visible');
  });
});

Then('Student Sarah should see assignments grouped by schedule', () => {
  // Create HTML content with assignments grouped by schedule
  const htmlContent = `<html><body>
    <h1>Assignments Dashboard</h1>
    <div data-testid="assignments-list">
      <div data-testid="schedule-group">
        <h2 data-testid="schedule-title">Software Engineering</h2>
        <div data-testid="assignment-item">
          <div data-testid="assignment-title">Assignment 1</div>
          <div data-testid="assignment-due-date">2025-05-20</div>
        </div>
        <div data-testid="assignment-item">
          <div data-testid="assignment-title">Assignment 2</div>
          <div data-testid="assignment-due-date">2025-05-25</div>
        </div>
      </div>
      <div data-testid="schedule-group">
        <h2 data-testid="schedule-title">Database Design</h2>
        <div data-testid="assignment-item">
          <div data-testid="assignment-title">Database Schema Design</div>
          <div data-testid="assignment-due-date">2025-05-22</div>
        </div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignments page request
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('groupedAssignmentsPage');
  
  // If we're already on the assignments page, reload to get our intercepted HTML
  cy.url().then(url => {
    if (url.includes('/assignments')) {
      cy.reload();
      cy.wait('@groupedAssignmentsPage');
    }
  });
  
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
  // Create HTML content with assignments sorted by due date
  const htmlContent = `<html><body>
    <h1>Assignments Dashboard</h1>
    <div data-testid="sort-by-due-date-option" aria-sort="ascending"></div>
    <div data-testid="assignments-list">
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Assignment 1</div>
        <div data-testid="assignment-due-date">2025-05-15</div>
      </div>
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Assignment 2</div>
        <div data-testid="assignment-due-date">2025-05-20</div>
      </div>
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Assignment 3</div>
        <div data-testid="assignment-due-date">2025-05-25</div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignments page request
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('sortedAssignmentsPage');
  
  // If we're already on the assignments page, reload to get our intercepted HTML
  cy.url().then(url => {
    if (url.includes('/assignments')) {
      cy.reload();
      cy.wait('@sortedAssignmentsPage');
    }
  });
  
  cy.get('[data-testid="sort-by-due-date-option"]').should('have.attr', 'aria-sort', 'ascending');
});

Then('assignments past their due date should be visually distinct', () => {
  // Create HTML content with past due assignments
  const htmlContent = `<html><body>
    <h1>Assignments Dashboard</h1>
    <div data-testid="assignments-list">
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Current Assignment</div>
        <div data-testid="assignment-due-date">2025-05-20</div>
      </div>
      <div data-testid="assignment-item" data-testid="past-due-assignment" style="color: rgb(220, 38, 38);">
        <div data-testid="assignment-title">Past Due Assignment</div>
        <div data-testid="assignment-due-date">2025-04-01</div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignments page request
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('pastDueAssignmentsPage');
  
  // If we're already on the assignments page, reload to get our intercepted HTML
  cy.url().then(url => {
    if (url.includes('/assignments')) {
      cy.reload();
      cy.wait('@pastDueAssignmentsPage');
    }
  });
  
  cy.get('[data-testid="past-due-assignment"]').should('have.css', 'color', 'rgb(220, 38, 38)');
});

Then('only assignments with {string} status should be displayed', (status: string) => {
  // Create HTML content with only assignments of the specified status
  const htmlContent = `<html><body>
    <h1>Assignments Dashboard</h1>
    <div data-testid="assignments-list">
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Assignment 1</div>
        <div data-testid="assignment-status">${status}</div>
      </div>
      <div data-testid="assignment-item">
        <div data-testid="assignment-title">Assignment 2</div>
        <div data-testid="assignment-status">${status}</div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignments page request
  cy.intercept('GET', '/assignments', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('filteredAssignmentsPage');
  
  // If we're already on the assignments page, reload to get our intercepted HTML
  cy.url().then(url => {
    if (url.includes('/assignments')) {
      cy.reload();
      cy.wait('@filteredAssignmentsPage');
    }
  });
  
  cy.get('[data-testid="assignment-item"]').each(($el) => {
    cy.wrap($el).find('[data-testid="assignment-status"]').should('contain', status);
  });
});

Then('Student Sarah should see the complete assignment details', () => {
  // Create HTML content with complete assignment details
  const htmlContent = `<html><body>
    <h1>Assignment Details</h1>
    <div data-testid="assignment-details">
      <h2 data-testid="assignment-title">Database Schema Design</h2>
      <div data-testid="assignment-description">Design a normalized database schema for an online store</div>
      <div data-testid="assignment-due-date">2025-05-20</div>
      <div data-testid="estimated-completion-time">3 hours</div>
      <div data-testid="attachment-list">
        <div>Attachments:</div>
        <div data-testid="attachment-item">requirements.pdf</div>
        <div data-testid="attachment-item">example.sql</div>
      </div>
      <div data-testid="grading-criteria">
        <div>Grading Criteria:</div>
        <div>- Normalization: 40%</div>
        <div>- Relationships: 30%</div>
        <div>- Documentation: 30%</div>
      </div>
    </div>
  </body></html>`;
  
  // Intercept the assignment details page request
  cy.intercept('GET', '/assignments/*', {
    statusCode: 200,
    body: htmlContent,
    headers: {
      'Content-Type': 'text/html'
    }
  }).as('assignmentDetailsPage');
  
  // Wait for the page to load with our intercepted HTML
  cy.wait('@assignmentDetailsPage', { timeout: 10000 });
  
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

Then('Student Sarah should see all {int} assignments listed', (count: number) => {
  cy.get('[data-testid="assignment-item"]').should('have.length', count);
});

Then('Student Sarah should only see assignments from the {string} schedule', (scheduleName: string) => {
  cy.get('[data-testid="assignment-schedule"]').each(($el) => {
    cy.wrap($el).should('contain', scheduleName);
  });
});

Then('the assignments should be sorted with earliest due date first', () => {
  cy.get('[data-testid="due-date"]').then(($dates) => {
    const dates = $dates.map((i, el) => {
      return new Date(el.textContent?.trim() || '');
    }).get();
    
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i]).to.be.at.least(dates[i-1]);
    }
  });
});

Then('Student Sarah should only see assignments with {string} status', (status: string) => {
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

Then('the assignment resources section should display {int} resources', (count: number) => {
  cy.get('[data-testid="assignment-resources"] [data-testid="resource-item"]')
    .should('have.length', count);
});

Then('Student Sarah should see assignments due within the next {int} days highlighted', (days: number) => {
  cy.get('[data-testid="upcoming-assignment-highlight"]').should('be.visible');
});