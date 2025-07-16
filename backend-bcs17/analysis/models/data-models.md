# Data Models

## Assignment Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|------------|-------------|
| id | BIGINT | PRIMARY KEY | Unique identifier for assignment |
| title | VARCHAR(255) | NOT NULL | Title of the assignment |
| description | TEXT | NOT NULL | Detailed description of the assignment |
| due_date | TIMESTAMP | NOT NULL | Deadline for submission |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |
| schedule_id | BIGINT | FOREIGN KEY | Reference to the schedule this assignment belongs to |
| estimated_time_minutes | INT | | Estimated completion time in minutes |
| grading_criteria | TEXT | | Criteria used for grading |
| max_grade | DECIMAL(5,2) | NOT NULL | Maximum possible grade |
| is_published | BOOLEAN | DEFAULT FALSE | Whether the assignment is visible to students |

## Submission Table
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|------------|-------------|
| id | BIGINT | PRIMARY KEY | Unique identifier for submission |
| assignment_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to the assignment |
| student_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to the student |
| content | TEXT | NOT NULL | Text-based submission content |
| submitted_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Submission timestamp |
| last_edited_at | TIMESTAMP | | Last edit timestamp |
| grade | DECIMAL(5,2) | | Grade assigned by lecturer/TA |
| feedback | TEXT | | Feedback provided by lecturer/TA |
| graded_by | BIGINT | FOREIGN KEY | Reference to user who graded the submission |
| graded_at | TIMESTAMP | | When the submission was graded |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'SUBMITTED' | Status: DRAFT, SUBMITTED, GRADED |