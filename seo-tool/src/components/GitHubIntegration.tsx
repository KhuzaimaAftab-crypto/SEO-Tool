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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Token Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Github className="h-5 w-5" />
          <span>GitHub Integration</span>
        </h2>
        
        {!isTokenSet ? (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Enter your GitHub Personal Access Token to analyze your repositories with GitHub Pages.
            </p>
            <div className="flex space-x-2">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSetToken}
                disabled={!token.trim()}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Connect
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-blue-700 text-sm">
                <strong>How to get a GitHub token:</strong><br />
                1. Go to GitHub Settings → Developer settings → Personal access tokens<br />
                2. Generate a new token with &apos;repo&apos; and &apos;pages:read&apos; permissions<br />
                3. Copy and paste the token here
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700">GitHub token configured</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchRepos}
                disabled={loading}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Refresh Repos
              </button>
              <button
                onClick={handleClearToken}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <p className="text-blue-700">Fetching your repositories...</p>
          </div>
        </div>
      )}

      {/* Repositories List */}
      {repos.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Repositories</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <div
                key={repo.full_name}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 truncate flex-1">{repo.name}</h4>
                  {repo.language && (
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                {repo.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{repo.description}</p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-3 w-3" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded text-center hover:bg-gray-200 flex items-center justify-center space-x-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>View</span>
                  </a>
                  <button
                    onClick={() => analyzeRepoPages(repo)}
                    disabled={analyzingRepo === repo.full_name}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-1"
                  >
                    <Globe className="h-3 w-3" />
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