
import { GitHubProfile, GitHubRepo } from '../types';

export const fetchGitHubProfile = async (username: string): Promise<GitHubProfile> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
};

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};
