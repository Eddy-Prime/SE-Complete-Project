/**
 * E2E Pipeline Validation Script
 * 
 * This script validates the configuration for Cypress E2E testing pipeline
 * and checks for common issues that might cause failures in CI environments. 
 * idk i'm just yapping cause the documantation said smn similar LOL i got it from there 
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

// Directories to check
const DIRECTORIES = {
  GITHUB_WORKFLOWS: path.join(__dirname, '..', '.github', 'workflows'),
  CYPRESS: path.join(__dirname, '..', 'cypress'),
  CYPRESS_REPORTS: path.join(__dirname, '..', 'cypress', 'reports'),
  CYPRESS_FIXTURES: path.join(__dirname, '..', 'cypress', 'fixtures'),
  CYPRESS_FEATURES: path.join(__dirname, '..', 'cypress', 'e2e', 'features'),
  CYPRESS_STEP_DEFS: path.join(__dirname, '..', 'cypress', 'e2e', 'step_definitions'),
};

// Files to check
const FILES = {
  GITHUB_WORKFLOW: path.join(DIRECTORIES.GITHUB_WORKFLOWS, 'cypress-e2e.yml'),
  CYPRESS_CONFIG: path.join(__dirname, '..', 'cypress.config.js'),
  PACKAGE_JSON: path.join(__dirname, '..', 'package.json'),
  REPORTER_CONFIG: path.join(DIRECTORIES.CYPRESS, 'reporter-config.json'),
};

console.log('🔍 Validating E2E Pipeline Configuration...\n');

// Check if directory exists
function checkDirectory(dir, message) {
  console.log(`Checking ${message}...`);
  if (!fs.existsSync(dir)) {
    console.error(`❌ Error: ${dir} directory doesn't exist!`);
    return false;
  }
  console.log(`✅ ${dir} exists`);
  return true;
}

// Check if file exists
function checkFile(file, message) {
  console.log(`Checking ${message}...`);
  if (!fs.existsSync(file)) {
    console.error(`❌ Error: ${file} file doesn't exist!`);
    return false;
  }
  console.log(`✅ ${file} exists`);
  return true;
}

// Check GitHub Workflows directory and file
checkDirectory(DIRECTORIES.GITHUB_WORKFLOWS, 'GitHub Workflows directory');
if (checkFile(FILES.GITHUB_WORKFLOW, 'GitHub Workflow file')) {
  try {
    const workflowContent = fs.readFileSync(FILES.GITHUB_WORKFLOW, 'utf8');
    const workflowConfig = yaml.load(workflowContent);
    
    // Check if workflow is configured properly
    if (!workflowConfig.jobs['cypress-run']) {
      console.error('❌ Error: Cypress job not found in workflow file!');
    } else {
      console.log('✅ Workflow file contains Cypress job configuration');
    }
    
    // Check for parallel execution
    const strategy = workflowConfig.jobs['cypress-run'].strategy;
    if (strategy && strategy.matrix && strategy.matrix.containers) {
      console.log(`✅ Workflow configured for parallel execution with ${strategy.matrix.containers.length} containers`);
    } else {
      console.warn('⚠️ Warning: Workflow not configured for parallel execution');
    }
    
    // Check report generation
    const steps = workflowConfig.jobs['cypress-run'].steps;
    const hasReportGeneration = steps.some(step => 
      step.name && step.name.includes('Generate Cucumber HTML report')
    );
    if (hasReportGeneration) {
      console.log('✅ Workflow includes report generation step');
    } else {
      console.warn('⚠️ Warning: No report generation step found in workflow');
    }
  } catch (error) {
    console.error('❌ Error parsing workflow file:', error.message);
  }
}

// this for Checking de Cypress directories
checkDirectory(DIRECTORIES.CYPRESS, 'Cypress directory');
checkDirectory(DIRECTORIES.CYPRESS_REPORTS, 'Cypress reports directory');
checkDirectory(DIRECTORIES.CYPRESS_FIXTURES, 'Cypress fixtures directory');
checkDirectory(DIRECTORIES.CYPRESS_FEATURES, 'Cypress features directory');
checkDirectory(DIRECTORIES.CYPRESS_STEP_DEFS, 'Cypress step definitions directory');

// same as this for Check Cypress configs
if (checkFile(FILES.CYPRESS_CONFIG, 'Cypress configuration file')) {
  try {
    const cypressConfig = require(FILES.CYPRESS_CONFIG);
    
    // Check reporter confs
    if (cypressConfig.e2e.reporter === 'cypress-multi-reporters') {
      console.log('✅ Multi-reporter configuration found in Cypress config');
    } else {
      console.warn('⚠️ Warning: cypress-multi-reporters not configured in Cypress config');
    }
    
    // checking againf for viewport settings
    if (cypressConfig.e2e.viewportWidth && cypressConfig.e2e.viewportHeight) {
      console.log(`✅ Viewport configuration found: ${cypressConfig.e2e.viewportWidth}x${cypressConfig.e2e.viewportHeight}`);
    }

    if (cypressConfig.e2e.defaultCommandTimeout) {
      console.log(`✅ Default command timeout set to ${cypressConfig.e2e.defaultCommandTimeout}ms`);
    }
    
    // Check video and screenshot settings
    if (cypressConfig.e2e.video === true) {
      console.log('✅ Video recording enabled');
    }
    
    if (cypressConfig.e2e.screenshotOnRunFailure === true) {
      console.log('✅ Screenshots on failure enabled');
    }
  } catch (error) {
    console.error('❌ Error parsing Cypress config:', error.message);
  }
}

// Checking for de package.json for required dependencies & all
if (checkFile(FILES.PACKAGE_JSON, 'package.json file')) {
  try {
    const packageJson = require(FILES.PACKAGE_JSON);
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // essential Cypress dependencies
    const requiredDeps = [
      'cypress',
      '@badeball/cypress-cucumber-preprocessor',
      'cypress-multi-reporters',
      'multiple-cucumber-html-reporter'
    ];
    
    const missingDeps = requiredDeps.filter(dep => !dependencies[dep]);
    
    if (missingDeps.length === 0) {
      console.log('✅ All required Cypress dependencies found');
    } else {
      console.error(`❌ Error: Missing dependencies: ${missingDeps.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Error parsing package.json:', error.message);
  }
}

// Check reporter configuration
if (checkFile(FILES.REPORTER_CONFIG, 'Reporter configuration file')) {
  try {
    const reporterConfig = require(FILES.REPORTER_CONFIG);
    
    if (reporterConfig.reporterEnabled) {
      console.log(`✅ Reporter configuration found with enabled reporters: ${reporterConfig.reporterEnabled}`);
    } else {
      console.warn('⚠️ Warning: No reporters enabled in reporter configuration');
    }
  } catch (error) {
    console.error('❌ Error parsing reporter config:', error.message);
  }
}

// Check feature files
try {
  if (fs.existsSync(DIRECTORIES.CYPRESS_FEATURES)) {
    const featureFiles = fs.readdirSync(DIRECTORIES.CYPRESS_FEATURES)
      .filter(file => file.endsWith('.feature'));
    
    console.log(`✅ Found ${featureFiles.length} feature files`);
    
    // Check if feature files have corresponding step definition files (idk if this works but sure)
    if (fs.existsSync(DIRECTORIES.CYPRESS_STEP_DEFS)) {
      const stepDefFiles = fs.readdirSync(DIRECTORIES.CYPRESS_STEP_DEFS)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));
      
      console.log(`✅ Found ${stepDefFiles.length} step definition files`);
      
      // Basic check for feature name match with step definition files
      const featureNames = featureFiles.map(file => file.replace('.feature', ''));
      const stepDefNames = stepDefFiles.map(file => {
        const baseName = path.basename(file, path.extname(file));
        return baseName;
      });
      
      const unmatchedFeatures = featureNames.filter(name => 
        !stepDefNames.some(stepName => stepName.includes(name))
      );
      
      if (unmatchedFeatures.length > 0) {
        console.warn(`⚠️ Warning: Some features might not have matching step definitions: ${unmatchedFeatures.join(', ')}`); //the icons are FIRE ngl (:
      } else {
        console.log('✅ All features appear to have matching step definition files');
      }
    }
  }
} catch (error) {
  console.error('❌ Error checking feature files:', error.message);
}

console.log('\n🧪 Testing Cypress installation...');

try {
  execSync('npx cypress verify', { stdio: 'inherit' });
  console.log('✅ Cypress installation verified successfully');
} catch (error) {
  console.error('❌ Error verifying Cypress installation:', error.message);
}

console.log('\n🧪 Validating Cypress config...');

try {
  execSync('npx cypress info', { stdio: 'inherit' });
  console.log('✅ Cypress configuration is valid');
} catch (error) {
  console.error('❌ Error validating Cypress configuration:', error.message);
}

console.log('\n📋 E2E Pipeline Validation Complete!');