import axios from 'axios';
import { GitHubRepo } from '@/types';

export class GitHubService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    if (!this.token) {
      throw new Error('GitHub token not set');
    }

    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        params: {
          sort: 'updated',
          per_page: 50
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch GitHub repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getRepoPages(owner: string, repo: string): Promise<string[]> {
    if (!this.token) {
      throw new Error('GitHub token not set');
    }

    try {
      // Check if GitHub Pages is enabled
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pages`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.data && response.data.html_url) {
        return [response.data.html_url];
      }
      
      return [];
    } catch (error) {
      // Pages might not be enabled
      return [];
    }
  }

  async getRepoReadme(owner: string, repo: string): Promise<string | null> {
    if (!this.token) {
      throw new Error('GitHub token not set');
    }

    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.raw'
        }
      });

      return response.data;
    } catch (error) {
      return null;
    }
  }
}