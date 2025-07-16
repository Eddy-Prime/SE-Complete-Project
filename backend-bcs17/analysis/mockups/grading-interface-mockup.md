# Assignment Grading Interface Mockup

## Layout Description
An interface for professors to review and grade student submissions:

1. **Page Header**
   - Assignment title
   - Schedule name
   - Navigation controls to cycle through submissions

2. **Student Information**
   - Student name
   - Submission date and time
   - Submission status

3. **Submission Content**
   - Student's submitted text
   - Read-only view with proper formatting

4. **Grading Panel**
   - Grade input: numeric field with validation against maximum grade
   - Feedback text area: rich text editor for detailed comments
   - Rubric checklist (based on grading criteria)
   - Grade calculation helper

5. **Action Buttons**
   - "Save Draft" button for partial grading
   - "Submit Grade" button (primary)
   - "Next Submission" / "Previous Submission" navigation

6. **Batch Actions**
   - Download all submissions
   - Batch grade options
   - Export grades to CSV

## Interaction Notes
- Grade field validates input is within allowed range
- Success notification appears after grade submission
- Keyboard shortcuts available for efficient navigation
- Color-coded indicators show grading progress across all submissions