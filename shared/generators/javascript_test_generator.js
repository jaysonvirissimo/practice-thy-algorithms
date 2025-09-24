const fs = require('fs');
const path = require('path');

function generateJavaScriptTests(problemName, problemData) {
  const returnType = problemData.returnType.javascript;
  const isArray = returnType.includes('array');

  // Check if we need custom matchers for this problem
  const needsCustomMatchers = problemData.testCases.some(testCase =>
    testCase.comparison && testCase.comparison.mode !== 'exact'
  );

  const testCases = problemData.testCases.map(testCase => {
    const inputArgs = Object.values(testCase.input).map(val => JSON.stringify(val)).join(', ');
    const expected = JSON.stringify(testCase.expected);

    // Determine comparison method
    const comparisonMode = testCase.comparison?.mode || 'default';
    let matcher, expectLine;

    switch (comparisonMode) {
      case 'unordered_array':
        matcher = 'toEqualUnordered';
        expectLine = `expect(${problemName}(${inputArgs})).${matcher}(${expected});`;
        break;
      case 'set_equality':
        matcher = 'toEqualAsSet';
        expectLine = `expect(${problemName}(${inputArgs})).${matcher}(${expected});`;
        break;
      case 'exact':
        matcher = 'toEqual';
        expectLine = `expect(${problemName}(${inputArgs})).${matcher}(${expected});`;
        break;
      default:
        // Use legacy logic for backward compatibility
        if (isArray) {
          expectLine = `let array = ${expected};\n  expect(${problemName}(${inputArgs})).toEqual(array);`;
        } else {
          expectLine = `expect(${problemName}(${inputArgs})).toBe(${expected});`;
        }
    }

    return `test("${testCase.description}", () => {
  ${expectLine}
});`;
  }).join('\n\n');

  // Use camelCase for function name but keep snake_case for require
  const functionName = problemName.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

  // Generate custom matchers if needed
  const customMatchers = needsCustomMatchers ? `
// Custom Jest matchers for advanced array comparison
expect.extend({
  toEqualUnordered(received, expected) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      return {
        pass: false,
        message: () => "Both values must be arrays for unordered comparison"
      };
    }

    // For nested arrays (like Group Anagrams), sort each sub-array before comparison
    const sortNested = (arr) => {
      return arr.map(item =>
        Array.isArray(item) ? [...item].sort() : item
      ).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    };

    const sortedReceived = sortNested(received);
    const sortedExpected = sortNested(expected);

    const pass = JSON.stringify(sortedReceived) === JSON.stringify(sortedExpected);

    return {
      pass,
      message: () => pass
        ? \`Expected arrays not to have same elements regardless of order\`
        : \`Expected arrays to have same elements regardless of order.\\nReceived: \${JSON.stringify(received)}\\nExpected: \${JSON.stringify(expected)}\`
    };
  },

  toEqualAsSet(received, expected) {
    if (!Array.isArray(received) || !Array.isArray(expected)) {
      return {
        pass: false,
        message: () => "Both values must be arrays for set comparison"
      };
    }

    const setReceived = new Set(received.map(item => JSON.stringify(item)));
    const setExpected = new Set(expected.map(item => JSON.stringify(item)));

    const pass = setReceived.size === setExpected.size &&
                 [...setReceived].every(item => setExpected.has(item));

    return {
      pass,
      message: () => pass
        ? \`Expected arrays not to have same unique elements\`
        : \`Expected arrays to have same unique elements (treating as sets).\\nReceived: \${JSON.stringify([...setReceived])}\\nExpected: \${JSON.stringify([...setExpected])}\`
    };
  }
});
` : '';

  return `const ${functionName} = require('../lib/${problemName}');
${customMatchers}
${testCases.replace(new RegExp(problemName, 'g'), functionName)}
`;
}

function generateAllTests() {
  const problemsPath = path.join(__dirname, '..', 'problems.json');
  const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

  Object.entries(problems).forEach(([problemName, problemData]) => {
    const testContent = generateJavaScriptTests(problemName, problemData);
    const outputPath = path.join(__dirname, '..', '..', 'JavaScript', 'test', `${problemName}.test.js`);

    console.log(`Generating JavaScript test for ${problemName}...`);
    fs.writeFileSync(outputPath, testContent);
  });
}

// Can be run directly or imported
if (require.main === module) {
  generateAllTests();
}

module.exports = { generateJavaScriptTests, generateAllTests };