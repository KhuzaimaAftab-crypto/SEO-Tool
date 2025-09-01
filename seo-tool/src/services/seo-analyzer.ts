import axios from 'axios';
import * as cheerio from 'cheerio';
import { SEOAnalysis } from '@/types';

export class SEOAnalyzer {
  async analyzeURL(url: string): Promise<SEOAnalysis> {
    try {
      // Ensure URL has protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      const analysis: SEOAnalysis = {
        url,
        title: $('title').text().trim(),
        description: $('meta[name="description"]').attr('content')?.trim(),
        keywords: $('meta[name="keywords"]').attr('content')?.trim(),
        headings: this.extractHeadings($),
        images: this.analyzeImages($),
        links: this.analyzeLinks($, url),
        socialMedia: this.analyzeSocialMedia($),
        issues: [],
        suggestions: [],
        score: 0
      };

      // Perform SEO checks
      this.performSEOChecks(analysis, $);
      
      // Calculate SEO score
      analysis.score = this.calculateSEOScore(analysis);

      return analysis;
    } catch (error) {
      throw new Error(`Failed to analyze URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractHeadings($: cheerio.CheerioAPI) {
    return {
      h1: $('h1').map((_, el) => $(el).text().trim()).get(),
      h2: $('h2').map((_, el) => $(el).text().trim()).get(),
      h3: $('h3').map((_, el) => $(el).text().trim()).get(),
      h4: $('h4').map((_, el) => $(el).text().trim()).get(),
      h5: $('h5').map((_, el) => $(el).text().trim()).get(),
      h6: $('h6').map((_, el) => $(el).text().trim()).get(),
    };
  }

  private analyzeImages($: cheerio.CheerioAPI) {
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
  }

  private analyzeLinks($: cheerio.CheerioAPI, baseUrl: string) {
    const links = $('a[href]');
    let internal = 0;
    let external = 0;

    const baseDomain = new URL(baseUrl).hostname;

    links.each((_, link) => {
      const href = $(link).attr('href');
      if (href) {
        if (href.startsWith('http')) {
          const linkDomain = new URL(href).hostname;
          if (linkDomain === baseDomain) {
            internal++;
          } else {
            external++;
          }
        } else if (href.startsWith('/') || !href.includes('://')) {
          internal++;
        }
      }
    });

    return { internal, external };
  }

  private analyzeSocialMedia($: cheerio.CheerioAPI) {
    return {
      ogTitle: $('meta[property="og:title"]').attr('content'),
      ogDescription: $('meta[property="og:description"]').attr('content'),
      ogImage: $('meta[property="og:image"]').attr('content'),
      twitterTitle: $('meta[name="twitter:title"]').attr('content'),
      twitterDescription: $('meta[name="twitter:description"]').attr('content'),
      twitterImage: $('meta[name="twitter:image"]').attr('content'),
    };
  }

  private performSEOChecks(analysis: SEOAnalysis, $: cheerio.CheerioAPI) {
    // Title checks
    if (!analysis.title) {
      analysis.issues.push('Missing page title');
      analysis.suggestions.push('Add a descriptive page title');
    } else if (analysis.title.length < 30) {
      analysis.issues.push('Page title is too short');
      analysis.suggestions.push('Extend page title to 30-60 characters');
    } else if (analysis.title.length > 60) {
      analysis.issues.push('Page title is too long');
      analysis.suggestions.push('Shorten page title to under 60 characters');
    }

    // Description checks
    if (!analysis.description) {
      analysis.issues.push('Missing meta description');
      analysis.suggestions.push('Add a meta description');
    } else if (analysis.description.length < 120) {
      analysis.issues.push('Meta description is too short');
      analysis.suggestions.push('Extend meta description to 120-160 characters');
    } else if (analysis.description.length > 160) {
      analysis.issues.push('Meta description is too long');
      analysis.suggestions.push('Shorten meta description to under 160 characters');
    }

    // Heading checks
    if (analysis.headings.h1.length === 0) {
      analysis.issues.push('Missing H1 tag');
      analysis.suggestions.push('Add an H1 tag to your page');
    } else if (analysis.headings.h1.length > 1) {
      analysis.issues.push('Multiple H1 tags found');
      analysis.suggestions.push('Use only one H1 tag per page');
    }

    // Image checks
    if (analysis.images.withoutAlt > 0) {
      analysis.issues.push(`${analysis.images.withoutAlt} images missing alt text`);
      analysis.suggestions.push('Add alt text to all images for accessibility');
    }

    // Social media checks
    if (!analysis.socialMedia.ogTitle) {
      analysis.issues.push('Missing Open Graph title');
      analysis.suggestions.push('Add Open Graph meta tags for social sharing');
    }

    if (!analysis.socialMedia.ogDescription) {
      analysis.issues.push('Missing Open Graph description');
      analysis.suggestions.push('Add Open Graph description for social sharing');
    }
  }

  private calculateSEOScore(analysis: SEOAnalysis): number {
    let score = 100;
    
    // Deduct points for issues
    score -= analysis.issues.length * 5;
    
    // Bonus points for good practices
    if (analysis.title && analysis.title.length >= 30 && analysis.title.length <= 60) score += 5;
    if (analysis.description && analysis.description.length >= 120 && analysis.description.length <= 160) score += 5;
    if (analysis.headings.h1.length === 1) score += 5;
    if (analysis.images.withoutAlt === 0 && analysis.images.total > 0) score += 5;
    if (analysis.socialMedia.ogTitle && analysis.socialMedia.ogDescription) score += 10;
    
    return Math.max(0, Math.min(100, score));
  }
}