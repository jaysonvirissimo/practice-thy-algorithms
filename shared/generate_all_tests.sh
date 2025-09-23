#!/bin/bash

echo "Generating test files from shared JSON..."

# Generate JavaScript tests
echo "Generating JavaScript tests..."
cd JavaScript && npm run generate-tests
cd ..

# Generate Ruby tests
echo "Generating Ruby tests..."
cd Ruby && rake generate_tests
cd ..

# Generate Python tests
echo "Generating Python tests..."
cd Python && python ../shared/generators/python_test_generator.py
cd ..

echo "All test files generated successfully!"