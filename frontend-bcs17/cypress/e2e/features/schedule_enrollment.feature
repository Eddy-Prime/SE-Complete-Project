Feature: Schedule Enrollment
    As a student
    I want to enroll in available schedules
    So that I can attend classes for my courses

    Background:
        Given I am logged in as a student
        And I am on the schedules page

    Scenario: Successfully enroll in a schedule
        When I click the enroll button for a schedule
        Then the number of enrolled students should increase
        And the enroll button should no longer be visible for that schedule

    Scenario: View enrolled schedules
        When I have enrolled in a schedule
        Then I should see the schedule in my enrolled schedules list

    Scenario: Attempt to enroll in a full schedule
        Given the schedule has reached its maximum capacity
        When I try to enroll in the schedule
        Then I should see an error message indicating the schedule is full
        And the number of enrolled students should remain unchanged

    Scenario: Attempt to enroll in a schedule that conflicts with another enrolled schedule
        Given I am already enrolled in a schedule
        And there is another schedule with overlapping time
        When I try to enroll in the conflicting schedule
        Then I should see an error message about schedule conflict
        And I should not be enrolled in the conflicting schedule