const fs = require('fs');
const path = require('path');

function generateJavaScriptTests(problemName, problemData) {
  const returnType = problemData.returnType.javascript;
  const isArray = returnType.includes('array');

  const testCases = problemData.testCases.map(testCase => {
    const inputArgs = Object.values(testCase.input).map(val => JSON.stringify(val)).join(', ');
    const expected = JSON.stringify(testCase.expected);

    if (isArray) {
      return `test("${testCase.description}", () => {
  let array = ${expected};
  expect(${problemName}(${inputArgs})).toEqual(array);
});`;
    } else {
      return `test("${testCase.description}", () => {
  expect(${problemName}(${inputArgs})).toBe(${expected});
});`;
    }
  }).join('\n\n');

  // Use camelCase for function name but keep snake_case for require
  const functionName = problemName.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

  return `const ${functionName} = require('../lib/${problemName}');

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