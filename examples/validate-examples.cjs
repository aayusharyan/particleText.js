#!/usr/bin/env node

/**
 * Example Validation Script for ParticleText.js
 *
 * This script validates that all example HTML files:
 * 1. Exist in the expected locations
 * 2. Contain valid HTML structure
 * 3. Include the ParticleText.js library
 * 4. Have proper canvas elements
 * 5. Initialize ParticleText correctly
 */

const fs = require('fs');
const path = require('path');

// Color output helpers
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Expected examples structure
const expectedExamples = {
  'index.html': 'Main examples index',
  'basic/basic.html': 'Basic usage example',
  'colors/single-color.html': 'Single color example',
  'colors/multi-color.html': 'Multi-color example',
  'colors/theme-colors.html': 'Theme colors example',
  'sizing/small-text.html': 'Small text example',
  'sizing/medium-text.html': 'Medium text example',
  'sizing/large-text.html': 'Large text example',
  'particles/particle-density.html': 'Particle density example',
  'particles/explosion-radius.html': 'Explosion radius example',
  'particles/friction-effects.html': 'Friction effects example',
  'responsive/responsive-config.html': 'Responsive configuration example',
  'advanced/manual-control.html': 'Manual control example',
  'advanced/custom-breakpoints.html': 'Custom breakpoints example',
  'advanced/error-handling.html': 'Error handling example',
  'advanced/slow-browser.html': 'Slow browser detection example',
  'performance/max-particles.html': 'Max particles example'
};

const examplesDir = __dirname;
let passCount = 0;
let failCount = 0;
let warnings = [];

log('cyan', '\n========================================');
log('cyan', '  ParticleText.js Example Validation');
log('cyan', '========================================\n');

// Test 1: Check if all expected files exist
log('blue', '📁 Test 1: Checking file existence...\n');

for (const [filePath, description] of Object.entries(expectedExamples)) {
  const fullPath = path.join(examplesDir, filePath);

  if (fs.existsSync(fullPath)) {
    log('green', `✓ ${filePath} - ${description}`);
    passCount++;
  } else {
    log('red', `✗ ${filePath} - MISSING!`);
    failCount++;
  }
}

console.log('');

// Test 2: Validate HTML structure and content
log('blue', '🔍 Test 2: Validating HTML structure...\n');

for (const [filePath] of Object.entries(expectedExamples)) {
  const fullPath = path.join(examplesDir, filePath);

  if (!fs.existsSync(fullPath)) {
    continue; // Skip if file doesn't exist
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check for required elements
    const checks = {
      'DOCTYPE': content.includes('<!DOCTYPE html>'),
      'HTML tag': /<html[^>]*>/i.test(content),
      'Canvas element': /<canvas/i.test(content),
      'ParticleText.js script': /src="[^"]*particleText\.js"/i.test(content),
      'initParticleJS call': /initParticleJS\s*\(/i.test(content)
    };

    let fileValid = true;
    const issues = [];

    for (const [check, passed] of Object.entries(checks)) {
      if (!passed) {
        fileValid = false;
        issues.push(check);
      }
    }

    if (fileValid) {
      log('green', `✓ ${filePath} - All checks passed`);
      passCount++;
    } else {
      log('red', `✗ ${filePath} - Missing: ${issues.join(', ')}`);
      failCount++;
    }

  } catch (error) {
    log('red', `✗ ${filePath} - Error reading file: ${error.message}`);
    failCount++;
  }
}

console.log('');

// Test 3: Check for documentation files
log('blue', '📄 Test 3: Checking documentation files...\n');

const docs = [
  'FUTURE_EXAMPLES.md'
];

for (const doc of docs) {
  const docPath = path.join(examplesDir, doc);
  if (fs.existsSync(docPath)) {
    const content = fs.readFileSync(docPath, 'utf8');
    const wordCount = content.split(/\s+/).length;
    log('green', `✓ ${doc} exists (${wordCount} words)`);
    passCount++;
  } else {
    log('red', `✗ ${doc} - MISSING!`);
    failCount++;
  }
}

console.log('');

// Test 4: Validate source file accessibility
log('blue', '🔗 Test 4: Checking ParticleText.js source accessibility...\n');

const sourceFile = path.join(examplesDir, '../src/particleText.js');
if (fs.existsSync(sourceFile)) {
  const stats = fs.statSync(sourceFile);
  log('green', `✓ Source file exists (${Math.round(stats.size / 1024)}KB)`);
  passCount++;
} else {
  log('red', '✗ Source file not found at ../src/particleText.js');
  failCount++;
}

console.log('');

// Final summary
log('cyan', '========================================');
log('cyan', '  Validation Summary');
log('cyan', '========================================\n');

log('green', `✓ Passed: ${passCount}`);
log('red', `✗ Failed: ${failCount}`);

if (warnings.length > 0) {
  log('yellow', `⚠ Warnings: ${warnings.length}`);
  warnings.forEach(w => log('yellow', `  - ${w}`));
}

console.log('');

if (failCount === 0) {
  log('green', '🎉 All validations passed! Examples are ready to use.\n');
  process.exit(0);
} else {
  log('red', '❌ Some validations failed. Please review the errors above.\n');
  process.exit(1);
}
