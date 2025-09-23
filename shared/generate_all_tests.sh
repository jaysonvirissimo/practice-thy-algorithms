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

echo "All test files generated successfully!"