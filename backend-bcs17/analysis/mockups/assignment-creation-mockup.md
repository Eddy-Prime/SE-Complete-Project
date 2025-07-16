# Assignment Creation Form Mockup

## Layout Description
A form page with the following elements:

1. **Page Header**
   - Title: "Create New Assignment"
   - Schedule name display: "[Schedule Name]"
   - Back button to return to schedule page

2. **Form Elements**
   - Title field (required): Text input with label "Assignment Title"
   - Description field (required): Rich text editor with label "Description"
   - Due Date field (required): Date and time picker with label "Submission Deadline"
   - Estimated Time field: Numeric input with label "Estimated Completion Time (minutes)"
   - Grading Criteria field: Rich text editor with label "Grading Criteria"
   - Maximum Grade field (required): Numeric input with label "Maximum Grade"
   - File Attachments: File upload control with "Add Files" button

3. **Action Buttons**
   - "Save as Draft" button (secondary style)
   - "Publish" button (primary style)
   - "Cancel" button (text link)

## Interaction Notes
- Form validates required fields before submission
- Title has a character limit of 255 characters
- Rich text editor allows formatting, lists, and links
- File attachments allow multiple files to be uploaded
- Date picker should not allow past dates to be selected