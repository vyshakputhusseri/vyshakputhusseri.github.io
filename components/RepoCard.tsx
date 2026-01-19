
import React from 'react';
import { GitHubRepo } from '../types';

interface RepoCardProps {
  repo: GitHubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group flex flex-col h-full ring-1 ring-gray-100 hover:ring-blue-100/50">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            {repo.stargazers_count}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {repo.name}
          </h4>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-2 group-hover:text-gray-500 transition-colors duration-300">
            {repo.description || "Building something amazing in the realm of security and development."}
          </p>
        </div>
      </div>
      
      <div className="pt-6 mt-auto flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full ${repo.language ? 'bg-blue-400/50 group-hover:bg-blue-500' : 'bg-gray-200'} transition-colors duration-500`}></span>
          {repo.language || 'Documentation'}
        </span>
        <a 
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500 transition-all duration-300 transform hover:scale-125"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
