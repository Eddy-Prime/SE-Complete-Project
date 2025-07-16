# Cypress TypeScript Migration

This directory contains Cypress end-to-end tests using TypeScript and Cucumber (BDD) for the frontend-bcs17 application.

## Migration from JavaScript to TypeScript

The Cypress test suite has been migrated from JavaScript to TypeScript to provide better type safety, improved IDE support, and better code organization. The following files have been converted:

### Configuration Files
- `cypress.config.js` → `cypress.config.ts`
- `cypress/support/e2e.js` → `cypress/support/e2e.ts`
- `cypress/support/commands.js` → `cypress/support/commands.ts`

### Step Definition Files
- `cypress/e2e/step_definitions/assignment_creation.js` → `assignment_creation.ts`
- `cypress/e2e/step_definitions/assignment_viewing.js` → `assignment_viewing.ts`
- `cypress/e2e/step_definitions/assignment_editing.js` → `assignment_editing.ts`
- `cypress/e2e/step_definitions/assignment_grading.js` → `assignment_grading.ts`
- `cypress/e2e/step_definitions/assignment_submission.js` → `assignment_submission.ts`
- `cypress/e2e/step_definitions/common_steps.js` → `common_steps.ts`
- `cypress/e2e/step_definitions/common/hooks.js` → `hooks.ts`

## Key Changes

1. **Added Type Annotations**:
   - Added parameter types for all step definitions (string, number, etc.)
   - Added return types where applicable
   - Added proper interface declarations for custom Cypress commands

2. **Enhanced Configuration**:
   - Updated configs to use TypeScript import/export syntax
   - Added type definitions for Cypress plugin events and config options

3. **Commands Typing**:
   - Added TypeScript declarations for custom commands in `commands.ts`
   - Improved documentation with JSDoc comments

## Running Tests

The Cypress tests can be run with the same commands as before:

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

## Type Definitions

The project uses the following type definitions:
- Cypress's built-in TypeScript definitions
- Custom type definitions in `commands.ts` for our custom commands

## Notes for Developers

1. When adding new step definitions, create them as `.ts` files with proper type annotations.
2. TypeScript files are automatically compiled when running Cypress.
3. The existing feature files (`.feature`) remain unchanged.
4. Both JavaScript and TypeScript step definitions will work together during the transition period.

## Troubleshooting

If you encounter issues with TypeScript in Cypress tests:

1. Make sure `cypress.config.ts` is being correctly loaded
2. Check that the TypeScript step definitions are being correctly picked up
3. Verify that the proper type definitions are available
4. If needed, run `npm install --save-dev @types/cypress` to ensure type definitions are installed