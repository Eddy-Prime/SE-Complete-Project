Feature: Assignment Viewing
  As a Student
  I want to see all assignments for my enrolled schedules
  So that I can plan my workload efficiently

  Background:
    Given Student Sarah is logged in
    And Student Sarah is enrolled in "Software Engineering" and "Database Design" schedules

  Scenario: Viewing all assignments across enrolled schedules
    When Student Sarah navigates to the assignment dashboard
    Then Student Sarah should see assignments from "Software Engineering" 
    And Student Sarah should see assignments from "Database Design"
    And each assignment should display its title and due date

  Scenario: Viewing assignments organized by schedule
    When Student Sarah navigates to the assignment dashboard
    And Student Sarah selects the "View by Schedule" option
    Then Student Sarah should see assignments grouped by schedule
    And each schedule section should display its title
    And assignments within each schedule should be listed chronologically

  Scenario: Sorting assignments by due date
    When Student Sarah navigates to the assignment dashboard
    And Student Sarah selects the "Sort by Due Date" option
    Then assignments should be displayed in ascending order of due date
    And assignments past their due date should be visually distinct

  Scenario: Viewing assignments by completion status
    When Student Sarah navigates to the assignment dashboard
    And Student Sarah selects the "Filter by Status" option
    And Student Sarah selects "Not Started" status
    Then only assignments with "Not Started" status should be displayed
    When Student Sarah selects "In Progress" status
    Then only assignments with "In Progress" status should be displayed
    When Student Sarah selects "Submitted" status
    Then only assignments with "Submitted" status should be displayed
    When Student Sarah selects "Graded" status
    Then only assignments with "Graded" status should be displayed

  Scenario: Viewing assignment details
    When Student Sarah navigates to the assignment dashboard
    And Student Sarah clicks on the "Database Schema Design" assignment
    Then Student Sarah should see the complete assignment details
    And the details should include title, description, due date, and estimated completion time
    And the details should show any attached files
    And the details should display the grading criteria

  Scenario: Viewing assignments with approaching deadlines
    When Student Sarah navigates to the assignment dashboard
    And Student Sarah selects the "Approaching Deadlines" filter
    Then Student Sarah should see assignments due within the next 7 days
    And assignments should be highlighted based on urgency
    And the due date should show remaining time