Feature: Assignment Editing and Updating
  As a Professor
  I want to edit or update assignment details
  So that I can correct mistakes or adapt to changing circumstances

  Background:
    Given Professor Thompson is logged in
    And an assignment "Software Design Principles" exists in the "Software Engineering" schedule
    And Professor Thompson navigates to the assignment details page

  Scenario: Editing an unpublished assignment
    Given the assignment has not been published yet
    When Professor Thompson clicks the "Edit Assignment" button
    And Professor Thompson changes the title to "Advanced Software Design Principles"
    And Professor Thompson changes the description to "Learn and apply advanced design patterns"
    And Professor Thompson changes the due date to "06/01/2025"
    And Professor Thompson clicks the "Save Changes" button
    Then the assignment should be updated successfully
    And Professor Thompson should see a success message
    And the assignment details should display the updated information

  Scenario: Making limited changes to a published assignment
    Given the assignment has been published
    When Professor Thompson clicks the "Edit Assignment" button
    And Professor Thompson changes the description to "Learn and apply SOLID principles and design patterns"
    And Professor Thompson extends the due date to "06/15/2025"
    And Professor Thompson clicks the "Save Changes" button
    Then the assignment should be updated successfully
    And a change log entry should be created
    And students enrolled in the "Software Engineering" schedule should be notified

  Scenario: Attempting to reduce deadline of an assignment with submissions
    Given the assignment has been published
    And there are existing student submissions
    When Professor Thompson clicks the "Edit Assignment" button
    And Professor Thompson changes the due date to "04/30/2025"
    And Professor Thompson clicks the "Save Changes" button
    Then the assignment should not be updated
    And Professor Thompson should see an error message about existing submissions

  Scenario: Adding new file attachments to a published assignment
    Given the assignment has been published
    When Professor Thompson clicks the "Edit Assignment" button
    And Professor Thompson uploads "updated_requirements.pdf" as an attachment
    And Professor Thompson clicks the "Save Changes" button
    Then the assignment should be updated successfully
    And the assignment should have the new attachment
    And students enrolled in the "Software Engineering" schedule should be notified

  Scenario: Removing grading criteria from a published assignment
    Given the assignment has been published
    And no submissions have been graded yet
    When Professor Thompson clicks the "Edit Assignment" button
    And Professor Thompson removes the "Documentation: 30%" grading criterion
    And Professor Thompson adjusts "Code quality: 30%" to "Code quality: 40%"
    And Professor Thompson adjusts "Functionality: 40%" to "Functionality: 60%"
    And Professor Thompson clicks the "Save Changes" button
    Then the assignment should be updated successfully
    And a change log entry should be created
    And students enrolled in the "Software Engineering" schedule should be notified