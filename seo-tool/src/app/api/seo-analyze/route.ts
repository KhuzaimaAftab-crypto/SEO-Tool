import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Ensure URL has protocol
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Fetch the webpage
    const response = await axios.get(targetUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      maxRedirects: 5
    });

    const $ = cheerio.load(response.data);
    
    // Extract SEO data
    const analysis = {
      url: targetUrl,
      title: $('title').text().trim() || null,
      description: $('meta[name=\"description\"]').attr('content')?.trim() || null,
      keywords: $('meta[name=\"keywords\"]').attr('content')?.trim() || null,
      headings: {
        h1: $('h1').map((_, el) => $(el).text().trim()).get(),
        h2: $('h2').map((_, el) => $(el).text().trim()).get(),
        h3: $('h3').map((_, el) => $(el).text().trim()).get(),
        h4: $('h4').map((_, el) => $(el).text().trim()).get(),
        h5: $('h5').map((_, el) => $(el).text().trim()).get(),
        h6: $('h6').map((_, el) => $(el).text().trim()).get(),
      },
      images: (() => {
        const images = $('img');
        const total = images.length;
        let withAlt = 0;
        const missingAlt: string[] = [];

        images.each((_, img) => {
          const alt = $(img).attr('alt');
          const src = $(img).attr('src');
          
          if (alt && alt.trim()) {
            withAlt++;
          } else {
            missingAlt.push(src || 'Unknown image');
          }
        });

        return {
          total,
          withAlt,
          withoutAlt: total - withAlt,
          missingAlt
        };
      })(),
      links: (() => {
        const links = $('a[href]');
        let internal = 0;
        let external = 0;

        const baseDomain = new URL(targetUrl).hostname;

        links.each((_, link) => {
          const href = $(link).attr('href');
          if (href) {
            if (href.startsWith('http')) {
              try {
                const linkDomain = new URL(href).hostname;
                if (linkDomain === baseDomain) {
                  internal++;
                } else {
                  external++;
                }
              } catch {
                // Invalid URL
              }
            } else if (href.startsWith('/') || !href.includes('://')) {
              internal++;
            }
          }
        });

        return { internal, external };
      })(),
      socialMedia: {
        ogTitle: $('meta[property=\"og:title\"]').attr('content') || null,
        ogDescription: $('meta[property=\"og:description\"]').attr('content') || null,
        ogImage: $('meta[property=\"og:image\"]').attr('content') || null,
        twitterTitle: $('meta[name=\"twitter:title\"]').attr('content') || null,
        twitterDescription: $('meta[name=\"twitter:description\"]').attr('content') || null,
        twitterImage: $('meta[name=\"twitter:image\"]').attr('content') || null,
      },
      issues: [] as string[],
      suggestions: [] as string[],
      score: 0
    };

    // Perform SEO checks
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Title checks
    if (!analysis.title) {
      issues.push('Missing page title');
      suggestions.push('Add a descriptive page title');
    } else if (analysis.title.length < 30) {
      issues.push('Page title is too short');
      suggestions.push('Extend page title to 30-60 characters');
    } else if (analysis.title.length > 60) {
      issues.push('Page title is too long');
      suggestions.push('Shorten page title to under 60 characters');
    }

    // Description checks
    if (!analysis.description) {
      issues.push('Missing meta description');
      suggestions.push('Add a meta description');
    } else if (analysis.description.length < 120) {
      issues.push('Meta description is too short');
      suggestions.push('Extend meta description to 120-160 characters');
    } else if (analysis.description.length > 160) {
      issues.push('Meta description is too long');
      suggestions.push('Shorten meta description to under 160 characters');
    }

    // Heading checks
    if (analysis.headings.h1.length === 0) {
      issues.push('Missing H1 tag');
      suggestions.push('Add an H1 tag to your page');
    } else if (analysis.headings.h1.length > 1) {
      issues.push('Multiple H1 tags found');
      suggestions.push('Use only one H1 tag per page');
    }

    // Image checks
    if (analysis.images.withoutAlt > 0) {
      issues.push(`${analysis.images.withoutAlt} images missing alt text`);
      suggestions.push('Add alt text to all images for accessibility');
    }

    // Social media checks
    if (!analysis.socialMedia.ogTitle) {
      issues.push('Missing Open Graph title');
      suggestions.push('Add Open Graph meta tags for social sharing');
    }

    if (!analysis.socialMedia.ogDescription) {
      issues.push('Missing Open Graph description');
      suggestions.push('Add Open Graph description for social sharing');
    }

    // Calculate SEO score
    let score = 100;
    score -= issues.length * 5;
    
    // Bonus points for good practices
    if (analysis.title && analysis.title.length >= 30 && analysis.title.length <= 60) score += 5;
    if (analysis.description && analysis.description.length >= 120 && analysis.description.length <= 160) score += 5;
    if (analysis.headings.h1.length === 1) score += 5;
    if (analysis.images.withoutAlt === 0 && analysis.images.total > 0) score += 5;
    if (analysis.socialMedia.ogTitle && analysis.socialMedia.ogDescription) score += 10;
    
    analysis.issues = issues;
    analysis.suggestions = suggestions;
    analysis.score = Math.max(0, Math.min(100, score));

    return NextResponse.json(analysis);
    
  } catch (error) {
    console.error('SEO Analysis Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to analyze URL',
        details: error instanceof Error ? error.stack : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'SEO Analysis API - Use POST method with URL parameter' });
}