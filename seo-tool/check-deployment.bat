@echo off
echo Checking Git Status...
git status
echo.
echo Checking Recent Commits...
git log --oneline -5
echo.
echo Pushing to GitHub to Trigger Vercel Deployment...
git push origin master
echo.
echo Deployment triggered! Please check your Vercel dashboard at https://vercel.com/dashboard
echo Your deployment should start automatically.
echo.
echo If you need to redeploy manually:
echo 1. Go to your project in the Vercel dashboard
echo 2. Click on the "Deployments" tab
echo 3. Click "Redeploy" on the latest deployment
echo.
pause