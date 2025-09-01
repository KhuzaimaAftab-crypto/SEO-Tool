'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { GitHubRepo } from '@/types';
import { GitHubService } from '@/services/github';
import { SEOAnalyzer } from '@/services/seo-analyzer';
import { cn } from '@/lib/utils';

export default function GitHubIntegration() {
  const [token, setToken] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [analyzingRepo, setAnalyzingRepo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const githubService = new GitHubService();
  const seoAnalyzer = new SEOAnalyzer();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only access localStorage after component is mounted (client-side)
    if (mounted) {
      const savedToken = localStorage.getItem('github-token');
      if (savedToken) {
        setToken(savedToken);
        setIsTokenSet(true);
        githubService.setToken(savedToken);
      }
    }
  }, [mounted]);

  const handleSetToken = () => {
    if (!token.trim() || !mounted) return;
    
    localStorage.setItem('github-token', token);
    setIsTokenSet(true);
    githubService.setToken(token);
    fetchRepos();
  };

  const handleClearToken = () => {
    if (!mounted) return;
    
    localStorage.removeItem('github-token');
    setToken('');
    setIsTokenSet(false);
    setRepos([]);
    setError('');
  };

  const fetchRepos = async () => {
    setLoading(true);
    setError('');
    
    try {
      const userRepos = await githubService.getUserRepos();
      setRepos(userRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const analyzeRepoPages = async (repo: GitHubRepo) => {
    setAnalyzingRepo(repo.full_name);
    
    try {
      const [owner, repoName] = repo.full_name.split('/');
      const pages = await githubService.getRepoPages(owner, repoName);
      
      if (pages.length > 0) {
        // Analyze the first page (usually the main GitHub Pages site)
        const analysis = await seoAnalyzer.analyzeURL(pages[0]);
        console.log('SEO Analysis for', repo.name, ':', analysis);
        alert(`SEO Analysis completed for ${repo.name}. Check console for details.`);
      } else {
        alert(`No GitHub Pages found for ${repo.name}. Make sure GitHub Pages is enabled for this repository.`);
      }
    } catch (err) {
      alert(`Failed to analyze ${repo.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setAnalyzingRepo(null);
    }
  };

  const formatDate = (dateString: string) => {
    // Only format date client-side to prevent hydration mismatch
    if (!mounted) return dateString;
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg shadow-md p-4 border border-slate-700">
          <h2 className="text-lg font-semibold text-slate-100 mb-3 flex items-center space-x-2">
            <Github className="h-4 w-4" />
            <span>GitHub Integration</span>
          </h2>
          <div className="text-center py-3">
            <div className="animate-pulse">
              <div className="h-3 bg-slate-700 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Token Input Section */}
      <div className="bg-slate-800 rounded-lg shadow-md p-4 border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-100 mb-3 flex items-center space-x-2">
          <Github className="h-4 w-4" />
          <span>GitHub Integration</span>
        </h2>
        
        {!isTokenSet ? (
          <div className="space-y-3">
            <p className="text-slate-400 text-xs sm:text-sm">
              Enter your GitHub Personal Access Token to analyze your repositories with GitHub Pages.
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="flex-1 px-2.5 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-slate-100 placeholder-slate-500 text-sm sm:px-3 sm:py-2.5"
              />
              <button
                onClick={handleSetToken}
                disabled={!token.trim()}
                className="px-3 py-2 bg-blue-600 text-slate-100 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:px-4 sm:py-2.5"
              >
                Connect
              </button>
            </div>
            <div className="bg-blue-900/30 border border-blue-800 rounded-md p-2.5 sm:p-3">
              <p className="text-blue-300 text-xs sm:text-sm">
                <strong>How to get a GitHub token:</strong><br />
                1. Go to GitHub Settings → Developer settings → Personal access tokens<br />
                2. Generate a new token with &apos;repo&apos; and &apos;pages:read&apos; permissions<br />
                3. Copy and paste the token here
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm">GitHub token configured</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchRepos}
                disabled={loading}
                className="px-2.5 py-1.5 bg-blue-600 text-slate-100 rounded text-xs hover:bg-blue-700 disabled:opacity-50 text-sm sm:px-3 sm:py-2"
              >
                Refresh Repos
              </button>
              <button
                onClick={handleClearToken}
                className="px-2.5 py-1.5 bg-rose-600 text-slate-100 rounded text-xs hover:bg-rose-700 text-sm sm:px-3 sm:py-2"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-rose-900/30 border border-rose-800 rounded-md p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-rose-400" />
            <p className="text-rose-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-blue-900/30 border border-blue-800 rounded-md p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <p className="text-blue-300 text-sm">Fetching your repositories...</p>
          </div>
        </div>
      )}

      {/* Repositories List */}
      {repos.length > 0 && (
        <div className="bg-slate-800 rounded-lg shadow-md p-4 border border-slate-700">
          <h3 className="text-base font-semibold text-slate-100 mb-3">Your Repositories</h3>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <div
                key={repo.full_name}
                className="border border-slate-700 rounded-lg p-3 hover:shadow-lg transition-all bg-slate-700/30 hover:bg-slate-700/50 sm:p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-100 truncate flex-1 text-sm sm:text-base">{repo.name}</h4>
                  {repo.language && (
                    <span className="ml-2 px-1.5 py-0.5 bg-slate-700 text-slate-300 text-[0.6rem] rounded sm:px-2 sm:py-1 sm:text-xs">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                {repo.description && (
                  <p className="text-xs text-slate-400 mb-2 line-clamp-2 sm:text-sm sm:mb-3">{repo.description}</p>
                )}
                
                <div className="flex items-center space-x-3 text-[0.6rem] text-slate-500 mb-3 sm:text-xs sm:mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded text-center hover:bg-slate-600 flex items-center justify-center space-x-1 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>View</span>
                  </a>
                  <button
                    onClick={() => analyzeRepoPages(repo)}
                    disabled={analyzingRepo === repo.full_name}
                    className="flex-1 px-2 py-1 bg-blue-600 text-slate-100 text-xs rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-1 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    <Globe className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>
                      {analyzingRepo === repo.full_name ? 'Analyzing...' : 'Analyze SEO'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}