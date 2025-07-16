const fs = require('fs');
const path = require('path');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');
const chalk = require('chalk');

// Configuration
const reportDir = path.join(__dirname, '../reports');
const mochawesomeReportDir = path.join(reportDir, 'mochawesome');
const junitReportDir = path.join(reportDir, 'junit');
const testMetadataDir = path.join(reportDir, 'test-metadata');
const testTimingDir = path.join(reportDir, 'test-timing');
const screenshotsDir = path.join(__dirname, '../screenshots');
const consolidatedReportDir = path.join(reportDir, 'consolidated');
const consolidatedReportFilename = 'consolidated-report.html';

// Ensure the consolidated report directory exists
if (!fs.existsSync(consolidatedReportDir)) {
  fs.mkdirSync(consolidatedReportDir, { recursive: true });
}

// Ensure the test metadata and timing directories exist
if (!fs.existsSync(testMetadataDir)) {
  fs.mkdirSync(testMetadataDir, { recursive: true });
}
if (!fs.existsSync(testTimingDir)) {
  fs.mkdirSync(testTimingDir, { recursive: true });
}

/**
 * Merge all mochawesome JSON reports
 */
async function mergeJsonReports() {
  console.log(chalk.blue('⏳ Merging Mochawesome JSON reports...'));
  
  try {
    const jsonReport = await merge({
      files: [path.join(mochawesomeReportDir, '*.json')],
    });
    
    const jsonReportPath = path.join(consolidatedReportDir, 'merged-report.json');
    fs.writeFileSync(jsonReportPath, JSON.stringify(jsonReport, null, 2));
    
    console.log(chalk.green(`✅ JSON reports merged successfully: ${jsonReportPath}`));
    return jsonReport;
  } catch (error) {
    console.error(chalk.red('❌ Failed to merge JSON reports:'), error);
    throw error;
  }
}

/**
 * Generate HTML report from merged JSON
 */
async function generateHtmlReport(jsonReport) {
  console.log(chalk.blue('⏳ Generating consolidated HTML report...'));
  
  try {
    const htmlReportOptions = {
      reportDir: consolidatedReportDir,
      reportFilename: consolidatedReportFilename.replace('.html', ''),
      reportTitle: 'BCS17 E2E Test Report',
      reportPageTitle: 'BCS17 E2E Test Report',
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: false,
      timestamp: new Date().toISOString(),
    };
    
    await generator.create(jsonReport, htmlReportOptions);
    
    const reportPath = path.join(consolidatedReportDir, consolidatedReportFilename);
    console.log(chalk.green(`✅ HTML report generated successfully: ${reportPath}`));
    
    return reportPath;
  } catch (error) {
    console.error(chalk.red('❌ Failed to generate HTML report:'), error);
    throw error;
  }
}

/**
 * Add test metadata and timing information to the report
 */
function enhanceReport(reportPath) {
  console.log(chalk.blue('⏳ Enhancing report with additional metadata...'));
  
  try {
    // Read all metadata files
    const metadataFiles = fs.readdirSync(testMetadataDir);
    const metadata = metadataFiles
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(testMetadataDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      });
      
    // Read all timing files
    const timingFiles = fs.readdirSync(testTimingDir);
    const timings = timingFiles
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(testTimingDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      });
    
    // Generate summary statistics
    const totalTests = metadata.length;
    const failedTests = metadata.filter(m => m.testState === 'failed').length;
    const passedTests = totalTests - failedTests;
    const passRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    
    const averageTestDuration = timings.length > 0 
      ? Math.round(timings.reduce((sum, t) => sum + t.duration, 0) / timings.length) 
      : 0;
    
    // Create summary HTML
    const summaryHtml = `
      <div class="test-summary">
        <h2>Test Execution Summary</h2>
        <div class="summary-stats">
          <div class="stat">
            <div class="stat-value">${totalTests}</div>
            <div class="stat-label">Total Tests</div>
          </div>
          <div class="stat">
            <div class="stat-value ${passedTests > 0 ? 'passed' : ''}">${passedTests}</div>
            <div class="stat-label">Passed</div>
          </div>
          <div class="stat">
            <div class="stat-value ${failedTests > 0 ? 'failed' : ''}">${failedTests}</div>
            <div class="stat-label">Failed</div>
          </div>
          <div class="stat">
            <div class="stat-value">${passRate}%</div>
            <div class="stat-label">Pass Rate</div>
          </div>
          <div class="stat">
            <div class="stat-value">${averageTestDuration}ms</div>
            <div class="stat-label">Avg Duration</div>
          </div>
        </div>
        
        <h3>Test Execution Times</h3>
        <table class="timing-table">
          <thead>
            <tr>
              <th>Test</th>
              <th>Duration (ms)</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${timings.map(timing => `
              <tr>
                <td>${timing.test}</td>
                <td>${timing.duration}</td>
                <td>${timing.timestamp}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    // Add custom CSS styles
    const customStyles = `
      <style>
        .test-summary {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 5px;
        }
        
        .summary-stats {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
        }
        
        .stat {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          flex: 1;
          margin: 0 5px;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
        }
        
        .stat-value.passed {
          color: #5cb85c;
        }
        
        .stat-value.failed {
          color: #d9534f;
        }
        
        .stat-label {
          font-size: 14px;
          color: #777;
        }
        
        .timing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        
        .timing-table th, .timing-table td {
          padding: 8px;
          border: 1px solid #ddd;
          text-align: left;
        }
        
        .timing-table th {
          background-color: #f2f2f2;
        }
        
        .timing-table tr:nth-child(even) {
          background-color: #f8f8f8;
        }
        
        .screenshot-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .screenshot-item {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 5px;
        }
        
        .screenshot-item img {
          width: 100%;
          border: 1px solid #eee;
        }
        
        .screenshot-title {
          font-size: 14px;
          margin-top: 5px;
          font-weight: bold;
        }
      </style>
    `;
    
    // Read the HTML file
    let reportHtml = fs.readFileSync(reportPath, 'utf8');
    
    // Insert our custom content
    reportHtml = reportHtml.replace('</head>', `${customStyles}</head>`);
    reportHtml = reportHtml.replace('<div id="report">', `<div id="report">${summaryHtml}`);
    
    // Write the modified HTML back to the file
    fs.writeFileSync(reportPath, reportHtml);
    
    console.log(chalk.green('✅ Report enhanced with additional metadata successfully'));
    return reportPath;
  } catch (error) {
    console.error(chalk.red('❌ Failed to enhance report:'), error);
    console.log(chalk.yellow('⚠️ Continuing with the original report...'));
    return reportPath;
  }
}

/**
 * Generate and enhance the consolidated report
 */
async function generateConsolidatedReport() {
  try {
    const jsonReport = await mergeJsonReports();
    const htmlReport = await generateHtmlReport(jsonReport);
    const enhancedReport = enhanceReport(htmlReport);
    
    console.log(chalk.green.bold('🎉 Consolidated report generated successfully!'));
    console.log(chalk.blue(`📊 Report is available at: ${enhancedReport}`));
    
    return enhancedReport;
  } catch (error) {
    console.error(chalk.red.bold('❌ Failed to generate consolidated report:'), error);
    process.exit(1);
  }
}

// Execute the report generation
generateConsolidatedReport();

module.exports = {
  generateConsolidatedReport,
};