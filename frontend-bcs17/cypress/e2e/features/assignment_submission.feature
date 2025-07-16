Feature: Assignment Submission
  As a Student
  I want to submit my completed assignment before the deadline
  So that my work can be evaluated by the professor

  Background:
    Given Student Sarah is logged in
    And Student Sarah is enrolled in the "Software Engineering" schedule
    And there is an assignment "Web Application Project" with due date "05/30/2025"

  Scenario: Successfully submitting an assignment before deadline
    Given Student Sarah navigates to the assignment details page for "Web Application Project"
    When Student Sarah clicks the "Submit Assignment" button
    And Student Sarah enters "This is my final submission for the web application project" as the submission content
    And Student Sarah uploads "project.zip" as an attachment
    And Student Sarah clicks the "Submit" button
    Then the submission should be recorded successfully
    And Student Sarah should see a submission confirmation message
    And the assignment status should change to "Submitted"

  Scenario: Saving a draft submission
    Given Student Sarah navigates to the assignment details page for "Web Application Project"
    When Student Sarah clicks the "Submit Assignment" button
    And Student Sarah enters "This is a draft of my project" as the submission content
    And Student Sarah uploads "draft_project.zip" as an attachment
    And Student Sarah clicks the "Save Draft" button
    Then the draft should be saved successfully
    And Student Sarah should see a draft saved message
    And the assignment status should change to "In Progress"

  Scenario: Editing and finalizing a draft submission
    Given Student Sarah has a draft submission for "Web Application Project"
    When Student Sarah navigates to the assignment details page
    And Student Sarah clicks the "Edit Draft" button
    And Student Sarah changes the submission content to "This is my updated final submission"
    And Student Sarah uploads "final_project.zip" as an attachment
    And Student Sarah clicks the "Submit" button
    Then the submission should be updated and finalized successfully
    And Student Sarah should see a submission confirmation message
    And the assignment status should change to "Submitted"

  Scenario: Attempting to submit after the deadline
    Given the current date is "06/01/2025"
    And Student Sarah navigates to the assignment details page for "Web Application Project"
    When Student Sarah clicks the "Submit Assignment" button
    Then Student Sarah should see a message indicating the deadline has passed
    And the submission form should be disabled

  Scenario: Viewing submission history
    Given Student Sarah has submitted the "Web Application Project" assignment
    When Student Sarah navigates to the assignment details page
    And Student Sarah clicks the "View Submission History" button
    Then Student Sarah should see a list of all submission activities
    And each entry should include a timestamp
    And the final submission should be marked as "Submitted"

  Scenario: Submitting an assignment with large file attachments
    Given Student Sarah navigates to the assignment details page for "Web Application Project"
    When Student Sarah clicks the "Submit Assignment" button
    And Student Sarah enters "Submission with large files" as the submission content
    And Student Sarah uploads a 100MB file "large_video.mp4"
    And Student Sarah clicks the "Submit" button
    Then Student Sarah should see a warning about the large file size
    And the system should process the upload with a progress indicator
    And the submission should be recorded successfully when complete