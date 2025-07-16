# Sequence Diagram: Creating an Assignment

```mermaid
sequenceDiagram
    actor Prof as Professor Thompson
    participant FE as Frontend
    participant AC as Assignment Controller
    participant AS as Assignment Service
    participant DB as Database

    Prof->>FE: Navigates to schedule page
    FE->>AC: GET /schedules/{id}
    AC->>AS: getScheduleById(id)
    AS->>DB: SELECT * FROM schedule WHERE id = ?
    DB-->>AS: Schedule data
    AS-->>AC: Schedule object
    AC-->>FE: Schedule details with assignments
    FE-->>Prof: Displays schedule page

    Prof->>FE: Clicks "Create Assignment" button
    FE-->>Prof: Shows assignment creation form

    Prof->>FE: Fills in assignment details and submits
    FE->>AC: POST /assignments
    AC->>AS: createAssignment(assignmentDTO)
    AS->>DB: BEGIN TRANSACTION
    AS->>DB: INSERT INTO assignment (...)
    DB-->>AS: Assignment ID
    AS->>DB: COMMIT
    AS-->>AC: New assignment object
    AC-->>FE: Assignment creation confirmation
    FE-->>Prof: Shows success message and redirects to assignment details