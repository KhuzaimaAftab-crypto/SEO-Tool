@echo off
title SEO Tool Deployment

echo 🚀 Starting SEO Tool Deployment Process...

REM Check if we're in the right directory
if not exist "package.json" (
  echo ❌ Error: package.json not found. Please run this script from the project root directory.
  pause
  exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🏗️ Building the project...
npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
  echo ✅ Build successful!
  
  REM For Vercel deployment, we just need to push to GitHub
  REM Vercel will automatically deploy when connected to the repository
  echo ☁️ To deploy to Vercel:
  echo 1. Push your changes to GitHub
  echo 2. Make sure your Vercel project is connected to this repository
  echo 3. Vercel will automatically deploy the latest changes
  
  echo 🎉 Deployment process completed!
) else (
  echo ❌ Build failed. Please check the error messages above.
  pause
  exit /b 1
)

pause