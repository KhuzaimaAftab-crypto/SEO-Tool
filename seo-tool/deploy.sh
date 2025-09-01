#!/bin/bash

# SEO Tool Deployment Script

echo "🚀 Starting SEO Tool Deployment Process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the project root directory."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  
  # For Vercel deployment, we just need to push to GitHub
  # Vercel will automatically deploy when connected to the repository
  echo "☁️ To deploy to Vercel:"
  echo "1. Push your changes to GitHub"
  echo "2. Make sure your Vercel project is connected to this repository"
  echo "3. Vercel will automatically deploy the latest changes"
  
  echo "🎉 Deployment process completed!"
else
  echo "❌ Build failed. Please check the error messages above."
  exit 1
fi