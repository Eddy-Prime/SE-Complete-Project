# Student Assignment List Mockup

## Layout Description
A dashboard view showing all assignments for a student:

1. **Page Header**
   - Title: "My Assignments"
   - Filter controls: dropdown for "All Schedules" or specific schedule names
   - Sort controls: dropdown for "Due Date (soonest first)", "Recently Added", "Status"

2. **Status Summary**
   - Visual indicators showing:
     - Number of upcoming assignments
     - Number of assignments due this week
     - Number of overdue assignments
     - Number of graded assignments

3. **Assignment List**
   - Grouped by schedule with collapsible sections
   - Each assignment card contains:
     - Assignment title (bold)
     - Due date with visual countdown for close deadlines
     - Status badge: "Not Started", "In Progress", "Submitted", "Graded"
     - Grade (if available)
     - Quick action button to view details

4. **Empty States**
   - Message when no assignments: "No assignments found"
   - Message when filter yields no results: "No assignments match your filters"

## Interaction Notes
- Clicking on an assignment card navigates to the assignment details page
- Status badges use color coding (gray, blue, orange, green)
- Assignments due within 48 hours have highlighted due dates
- List automatically updates when new assignments are published