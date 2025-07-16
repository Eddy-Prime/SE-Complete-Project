const fs = require('fs');
const path = require('path');

// Directories containing step definitions
const directories = [
  './cypress/e2e/step_definitions',
  './cypress/e2e/step_definitions/common',
  './cypress/support/step_definitions'
];

// Create backup directory if it doesn't exist
const backupDir = './cypress/js-backup';
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Create subdirectories in backup to match original structure
directories.forEach(dir => {
  const relativePath = dir.replace('./cypress/', '');
  const backupSubDir = path.join(backupDir, relativePath);
  if (!fs.existsSync(backupSubDir)) {
    fs.mkdirSync(backupSubDir, { recursive: true });
  }
});

console.log('Starting TypeScript migration...');

// Skip test verification since it requires a running server
console.log('Note: Skipping test verification (would require a running server)');
console.log('Moving JavaScript files to backup directory...');

// Count of migrated files
let migratedFileCount = 0;

// Move JavaScript files to backup
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const sourceFile = path.join(dir, file);
        const targetFile = path.join(backupDir, dir.replace('./cypress/', ''), file);
        
        try {
          // Check that the corresponding TypeScript file exists
          const tsFile = sourceFile.replace('.js', '.ts');
          if (!fs.existsSync(tsFile)) {
            console.warn(`⚠️ Warning: No TypeScript equivalent found for ${sourceFile}. Skipping.`);
            return;
          }
          
          // Move file to backup
          fs.renameSync(sourceFile, targetFile);
          migratedFileCount++;
          console.log(`✓ Moved ${sourceFile} to ${targetFile}`);
        } catch (error) {
          console.error(`❌ Error moving ${sourceFile}: ${error.message}`);
        }
      }
    });
  }
});

if (migratedFileCount > 0) {
  console.log(`\n🎉 Migration to TypeScript complete! ${migratedFileCount} JavaScript files have been moved to backup directory.`);
  console.log(`You can find the backup files in ${backupDir}`);
  console.log('\nIf you encounter any issues, you can restore the JavaScript files from the backup directory.');
} else {
  console.log('\n⚠️ No JavaScript files were migrated. This could be because:');
  console.log('   1. The TypeScript migration was already completed');
  console.log('   2. No matching JavaScript files were found');
  console.log('   3. No TypeScript equivalents were found for your JavaScript files');
}