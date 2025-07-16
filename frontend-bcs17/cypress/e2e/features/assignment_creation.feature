Feature: Assignment Creation
  As a Professor
  I want to create assignments for my schedules
  So that students can receive clear instructions and deadlines

  Background:
    Given Professor Thompson is logged in
    And Professor Thompson navigates to the assignment creation page

  Scenario: Successfully creating an assignment with required fields
    When Professor Thompson enters "Final Project" as the title
    And Professor Thompson enters "Create a full-stack web application" as the description
    And Professor Thompson selects "06/30/2025" as the due date
    And Professor Thompson selects "Software Engineering" schedule
    And Professor Thompson enters "10 hours" as the estimated completion time
    And Professor Thompson adds "Code quality: 30%, Functionality: 40%, Documentation: 30%" as grading criteria
    And Professor Thompson clicks the "Create Assignment" button
    Then the assignment should be created successfully
    And Professor Thompson should see a success message
    And the assignment should appear in the "Software Engineering" schedule

  Scenario: Attempting to create an assignment without required fields
    When Professor Thompson leaves the title field empty
    And Professor Thompson enters "Create a full-stack web application" as the description
    And Professor Thompson selects "06/30/2025" as the due date
    And Professor Thompson selects "Software Engineering" schedule
    And Professor Thompson clicks the "Create Assignment" button
    Then the assignment should not be created
    And Professor Thompson should see an error message about missing title

  Scenario: Creating an assignment with file attachments
    When Professor Thompson enters "Database Assignment" as the title
    And Professor Thompson enters "Design and implement a database schema" as the description
    And Professor Thompson selects "06/30/2025" as the due date
    And Professor Thompson selects "Database Design" schedule
    And Professor Thompson uploads "schema_example.sql" as an attachment
    And Professor Thompson uploads "requirements.pdf" as an attachment
    And Professor Thompson clicks the "Create Assignment" button
    Then the assignment should be created successfully
    And the assignment should have 2 attachments

  Scenario: Creating an assignment with a past due date
    When Professor Thompson enters "Late Assignment" as the title
    And Professor Thompson enters "This is a test" as the description
    And Professor Thompson selects "01/01/2025" as the due date
    And Professor Thompson selects "Software Engineering" schedule
    And Professor Thompson clicks the "Create Assignment" button
    Then the assignment should not be created
    And Professor Thompson should see an error message about invalid due date

  Scenario: Creating an assignment with a very long description
    When Professor Thompson enters "Research Project" as the title
    And Professor Thompson enters a description with 5000 characters
    And Professor Thompson selects "06/30/2025" as the due date
    And Professor Thompson selects "Research Methods" schedule
    And Professor Thompson clicks the "Create Assignment" button
    Then the assignment should be created successfully
    And the complete description should be saved