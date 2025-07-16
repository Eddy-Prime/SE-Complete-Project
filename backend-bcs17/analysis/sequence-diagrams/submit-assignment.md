# Sequence Diagram: Submitting an Assignment

```mermaid
sequenceDiagram
    actor Student as Student Sarah
    participant FE as Frontend
    participant SC as Submission Controller
    participant SS as Submission Service
    participant DB as Database

    Student->>FE: Navigates to assignments page
    FE->>SC: GET /assignments
    SC->>SS: getAssignmentsForStudent(studentId)
    SS->>DB: SELECT * FROM assignment, enrollment WHERE student_id = ?
    DB-->>SS: Assignment data
    SS-->>SC: List of assignments
    SC-->>FE: Assignments data
    FE-->>Student: Displays assignments

    Student->>FE: Clicks on specific assignment
    FE->>SC: GET /assignments/{id}
    SC->>SS: getAssignmentById(id)
    SS->>DB: SELECT * FROM assignment WHERE id = ?
    DB-->>SS: Assignment details
    SS-->>SC: Assignment object
    SC-->>FE: Assignment details
    FE-->>Student: Shows assignment details and submission form

    Student->>FE: Creates submission and submits
    FE->>SC: POST /assignments/{id}/submissions
    SC->>SS: createSubmission(submissionDTO)
    SS->>DB: INSERT INTO submission (...)
    DB-->>SS: Submission ID
    SS-->>SC: New submission object
    SC-->>FE: Submission confirmation
    FE-->>Student: Shows success message