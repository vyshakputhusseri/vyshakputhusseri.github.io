
export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
  blog: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface PortfolioInsights {
  professionalSummary: string;
  keyStrengths: string[];
  suggestedFocus: string;
  techStackAnalysis: {
    language: string;
    proficiency: string;
    description: string;
  }[];
}
