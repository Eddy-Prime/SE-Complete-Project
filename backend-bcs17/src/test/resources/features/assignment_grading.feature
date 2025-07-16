Feature: Assignment Grading and Feedback
  As a Professor
  I want to grade student submissions and provide feedback
  So that students can learn from their work and improve

  Background:
    Given Professor Thompson is logged in
    And there is an assignment "Web Application Project" in the "Software Engineering" schedule
    And Student Sarah has submitted the assignment

  Scenario: Viewing all submissions for an assignment
    When Professor Thompson navigates to the assignment details page
    And Professor Thompson clicks the "View Submissions" button
    Then Professor Thompson should see a list of all student submissions
    And each submission should show the student name and submission date
    And the list should indicate which submissions have already been graded

  Scenario: Grading a submission with full score
    When Professor Thompson navigates to the submission view page
    And Professor Thompson selects Student Sarah's submission
    And Professor Thompson enters a grade of "90/100"
    And Professor Thompson enters feedback "Excellent work on implementing all required features. Your code organization is very good."
    And Professor Thompson clicks the "Save Grade" button
    Then the submission should be marked as graded
    And Student Sarah should receive a notification about the grade
    And Student Sarah should be able to view the grade and feedback

  Scenario: Grading a submission with partial score
    When Professor Thompson navigates to the submission view page
    And Professor Thompson selects Student Tom's submission
    And Professor Thompson enters a grade of "75/100"
    And Professor Thompson enters feedback "Good effort, but some features are missing. Code organization needs improvement."
    And Professor Thompson clicks the "Save Grade" button
    Then the submission should be marked as graded
    And Student Tom should receive a notification about the grade
    And Student Tom should be able to view the grade and feedback

  Scenario: Grading using criteria breakdown
    When Professor Thompson navigates to the submission view page
    And Professor Thompson selects Student Sarah's submission
    And Professor Thompson grades "Code quality" criterion with "28/30"
    And Professor Thompson grades "Functionality" criterion with "35/40"
    And Professor Thompson grades "Documentation" criterion with "27/30"
    And Professor Thompson enters feedback "Excellent implementation with clear documentation."
    And Professor Thompson clicks the "Save Grade" button
    Then the submission should be marked as graded with a total score of "90/100"
    And each criterion's score should be saved
    And Student Sarah should be able to view the detailed breakdown

  Scenario: Updating a grade after review
    Given Professor Thompson has previously graded Student Sarah's submission with "85/100"
    When Professor Thompson navigates to the submission view page
    And Professor Thompson selects Student Sarah's submission
    And Professor Thompson changes the grade to "90/100"
    And Professor Thompson adds additional feedback "After review, I've increased your grade for excellent code organization."
    And Professor Thompson clicks the "Update Grade" button
    Then the grade should be updated to "90/100"
    And Student Sarah should receive a notification about the updated grade
    And the grade history should show both grades with timestamps

  Scenario: Providing feedback without a grade
    When Professor Thompson navigates to the submission view page
    And Professor Thompson selects Student Emma's submission
    And Professor Thompson enters feedback "Please revise your submission to include proper documentation."
    And Professor Thompson selects the "Request Revision" option
    And Professor Thompson clicks the "Send Feedback" button
    Then feedback should be saved without a grade
    And Student Emma should receive a notification about the feedback
    And Student Emma should be allowed to resubmit the assignment