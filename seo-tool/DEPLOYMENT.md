# 🚀 Deployment Guide for SEO Tool

This guide will help you deploy the SEO Tool application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A GitHub account with the repository connected to Vercel

## Deployment Steps

### 1. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/KhuzaimaAftab-crypto/SEO-Tool.git`

### 2. Configure Project Settings

When importing the repository, Vercel should automatically detect the Next.js framework. If not, configure these settings manually:

- **Framework Preset**: Next.js
- **Root Directory**: Leave empty (the root directory) - A vercel.json file has been added to redirect to the correct directory
- **Build Command**: `cd seo-tool && npm run build`
- **Output Directory**: `seo-tool/.next`

### 3. Environment Variables

If you want to use the GitHub integration features, add your GitHub Personal Access Token:

1. In the Vercel project dashboard, go to Settings → Environment Variables
2. Add a new variable:
   - Name: `GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token
   - Environment: Production

### 4. Deploy

1. Click "Deploy" and wait for the build to complete
2. Once deployed, Vercel will provide you with a live URL

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to the project directory
cd seo-tool

# Deploy to Vercel
vercel --prod
```

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are properly installed
2. **Environment Variables**: Make sure your GitHub token is correctly set
3. **Routing Issues**: Check the vercel.json configuration
4. **Root Directory**: Make sure the Root Directory is set correctly in Vercel settings

### Support

For any deployment issues, contact KhuzaimaAftab-crypto or check the [Vercel documentation](https://vercel.com/docs).

## Live URL

After successful deployment, your application will be accessible at a URL similar to:
`https://seo-tool-khuzaimaaftab.vercel.app`

Note: The actual URL will depend on your Vercel account and project name.