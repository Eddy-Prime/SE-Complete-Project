// This function sets up API stubs for common endpoints
export function setupApiStubs() {
  // Mock authentication endpoints
  cy.intercept('POST', '**/login', {
    statusCode: 200,
    body: {
      token: 'fake-jwt-token',
      username: 'test-user',
      role: 'STUDENT'
    }
  }).as('loginRequest');

  // Mock assignment endpoints
  cy.intercept('GET', '**/assignments', {
    statusCode: 200,
    body: [
      {
        id: 'assignment-1',
        title: 'Web Application Project',
        description: 'Create a web application using React',
        dueDate: '05/30/2025',
        schedule: 'Software Engineering'
      },
      {
        id: 'assignment-2',
        title: 'Database Design',
        description: 'Design a normalized database schema',
        dueDate: '06/15/2025',
        schedule: 'Database Systems'
      }
    ]
  }).as('getAssignments');
  
  // Mock assignment detail endpoint
  cy.intercept('GET', '**/assignments/*', {
    statusCode: 200,
    body: {
      id: 'assignment-1',
      title: 'Web Application Project',
      description: 'Create a web application using React',
      dueDate: '05/30/2025',
      schedule: 'Software Engineering',
      attachments: ['requirements.pdf']
    }
  }).as('getAssignmentDetail');
  
  // Mock schedules endpoint
  cy.intercept(
    {
      method: 'GET',
      url: '**/schedules',
      hostname: 'localhost',
      port: 8080 // This ensures only backend API calls are matched
    },
    {
      statusCode: 200,
      body: [
        {
          id: 'schedule-1',
          name: 'Software Engineering',
          students: ['Student Sarah', 'Student Alex']
        },
        {
          id: 'schedule-2',
          name: 'Database Systems',
          students: ['Student Sarah']
        }
      ]
    }
  ).as('getSchedules');

  
  // Mock submission endpoint
  cy.intercept('POST', '**/assignments/*/submissions', {
    statusCode: 200,
    body: {
      id: 'submission-1',
      studentName: 'Student Sarah',
      content: 'This is my submission',
      submissionDate: new Date().toISOString(),
      status: 'Submitted'
    }
  }).as('submitAssignment');
  // Mock students endpoint
  cy.intercept('GET', '**/students', {
    statusCode: 200,
    body: [
      { id: 'student-1', name: 'Student Sarah' },
      { id: 'student-2', name: 'Student Alex' }
    ]
  }).as('getStudents');
}
