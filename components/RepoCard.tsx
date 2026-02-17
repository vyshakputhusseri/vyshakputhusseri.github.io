
import React from 'react';
import { GitHubRepo } from '../types';

interface RepoCardProps {
  repo: GitHubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <article className="bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl p-6 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full ring-1 ring-[var(--border-main)] hover:ring-[var(--primary-light)] animate-slideUp">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-[var(--bg-panel)] rounded-xl flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-panel)] rounded-full text-[10px] font-bold text-[var(--text-muted)] group-hover:bg-[var(--primary-light)] group-hover:text-[var(--primary)] transition-colors duration-300">
            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span aria-label={`${repo.stargazers_count} stars`}>{repo.stargazers_count}</span>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors duration-300">
            {repo.name}
          </h4>
          <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed line-clamp-2 transition-colors duration-300">
            {repo.description || "Building something amazing in the realm of security and development."}
          </p>
        </div>
      </div>
      
      <div className="pt-6 mt-auto flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full ${repo.language ? 'bg-[var(--primary)] opacity-50 group-hover:opacity-100' : 'bg-[var(--border-main)]'} transition-colors duration-500`} aria-hidden="true"></span>
          {repo.language || 'Documentation'}
        </span>
        <a 
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-125"
          aria-label={`View ${repo.name} on GitHub`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </article>
  );
};

export default RepoCard;
