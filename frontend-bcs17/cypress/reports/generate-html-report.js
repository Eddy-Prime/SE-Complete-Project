// Import the multiple-cucumber-html-reporter module
const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Create reports directories if they don't exist
const reportsHtmlDir = path.join(__dirname, 'cucumber-html');
const reportsCucumberDir = path.join(__dirname, 'cucumber');

if (!fs.existsSync(reportsHtmlDir)) {
  fs.mkdirSync(reportsHtmlDir, { recursive: true });
}

if (!fs.existsSync(reportsCucumberDir)) {
  fs.mkdirSync(reportsCucumberDir, { recursive: true });
  
  // Create a placeholder JSON file if no cucumber JSON files exist
  // This prevents the reporter from failing when no tests have been run
  const placeholderJsonPath = path.join(reportsCucumberDir, 'placeholder.json');
  if (fs.readdirSync(reportsCucumberDir).length === 0) {
    fs.writeFileSync(placeholderJsonPath, JSON.stringify({
      "keyword": "Feature",
      "name": "Placeholder Feature",
      "line": 1,
      "id": "placeholder-feature",
      "tags": [],
      "uri": "placeholder.feature",
      "elements": []
    }));
  }
}

// Get execution timestamps
const getTimestamps = () => {
  // Try to read execution timestamps from a file
  try {
    const timestampFile = path.join(__dirname, 'test-timing', 'execution-timestamps.json');
    if (fs.existsSync(timestampFile)) {
      const timestamps = JSON.parse(fs.readFileSync(timestampFile, 'utf8'));
      return {
        startTime: timestamps.startTime,
        endTime: timestamps.endTime || new Date().toISOString() // Use current time if end time not recorded
      };
    }
  } catch (e) {
    console.warn('Could not read execution timestamps file:', e);
  }
  
  // Fallback: Use the current time for both, but offset the start time by a reasonable testing duration
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 15 * 60000); // Assume tests ran for ~15 minutes
  
  return {
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString()
  };
};

const { startTime, endTime } = getTimestamps();

report.generate({
  jsonDir: path.join(__dirname, 'cucumber'),
  reportPath: path.join(__dirname, 'cucumber-html'),
  metadata: {
    browser: {
      name: 'chrome',
      version: '100'
    },
    device: 'Local test machine',
    platform: {
      name: 'macos',
      version: 'Monterey'
    }
  },
  customData: {
    title: 'Assignment System Test Run',
    data: [
      { label: 'Project', value: 'Assignment System' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: startTime },
      { label: 'Execution End Time', value: endTime }
    ]
  },
  displayDuration: true,
  durationInMS: true,
  displayReportTime: true,
  pageTitle: 'Assignment System Test Report',
  reportName: 'Assignment System - Cypress BDD Test Results',
  scenarioTimestamp: true
});