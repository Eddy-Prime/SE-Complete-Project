# Domain Model

## Entity Relationships

```mermaid
classDiagram
    User <|-- Lecturer
    User <|-- Student
    Lecturer "1" --> "*" Schedule : creates
    Student "*" --> "*" Schedule : enrolls in
    Schedule "*" --> "*" Student : has enrolled
    Schedule "1" --> "*" Assignment : contains
    Student "1" --> "*" Submission : submits
    Assignment "1" --> "*" Submission : receives
    Enrollment "*" --> "1" Student : belongs to
    Enrollment "*" --> "1" Schedule : refers to

    class User {
        id
        email
        role
    }

    class Lecturer {
        expertise
    }

    class Student {
        student_number
    }

    class Schedule {
        id
        name
        start_time
        end_time
        lecturer_id
    }

    class Enrollment {
        student_id
        schedule_id
    }

    class Assignment {
        id
        title
        description
        due_date
        schedule_id
        grading_criteria
        max_grade
    }

    class Submission {
        id
        assignment_id
        student_id
        content
        submitted_at
        grade
        feedback
    }
```

## Entity Descriptions

### User
Base entity that represents any user in the system.

### Lecturer
A type of user who creates and manages schedules and assignments.

### Student
A type of user who enrolls in schedules and submits assignments.

### Schedule
Represents a course or class session with specific timing.

### Enrollment
Junction entity that connects students to schedules they're enrolled in.

### Assignment
A task created by lecturers within a schedule that students must complete.

### Submission
A student's response to an assignment, which can be graded and receive feedback.
```<!-- filepath: /Users/user/Documents/Ucll/2nd Semester/Software Engineering/backend-bcs17/analysis/models/domain-model.md -->
# Domain Model

## Entity Relationships

```mermaid
classDiagram
    User <|-- Lecturer
    User <|-- Student
    Lecturer "1" --> "*" Schedule : creates
    Student "*" --> "*" Schedule : enrolls in
    Schedule "*" --> "*" Student : has enrolled
    Schedule "1" --> "*" Assignment : contains
    Student "1" --> "*" Submission : submits
    Assignment "1" --> "*" Submission : receives
    Enrollment "*" --> "1" Student : belongs to
    Enrollment "*" --> "1" Schedule : refers to

    class User {
        id
        email
        role
    }

    class Lecturer {
        expertise
    }

    class Student {
        student_number
    }

    class Schedule {
        id
        name
        start_time
        end_time
        lecturer_id
    }

    class Enrollment {
        student_id
        schedule_id
    }

    class Assignment {
        id
        title
        description
        due_date
        schedule_id
        grading_criteria
        max_grade
    }

    class Submission {
        id
        assignment_id
        student_id
        content
        submitted_at
        grade
        feedback
    }
```

## Entity Descriptions

### User
Base entity that represents any user in the system.

### Lecturer
A type of user who creates and manages schedules and assignments.

### Student
A type of user who enrolls in schedules and submits assignments.

### Schedule
Represents a course or class session with specific timing.

### Enrollment
Junction entity that connects students to schedules they're enrolled in.

### Assignment
A task created by lecturers within a schedule that students must complete.

### Submission
A student's response to an assignment, which can be graded and receive feedback.