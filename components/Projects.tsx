import React from 'react';
import { GitHubRepo } from '../types';
import RepoCard from './RepoCard';

interface ProjectsProps {
    repos: GitHubRepo[];
}

const Projects: React.FC<ProjectsProps> = ({ repos }) => {
    return (
        <div className="py-24 space-y-12 animate-fadeIn">
            <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter text-[var(--text-main)] animate-slideUp">Featured Projects</h2>
                <p className="text-xl text-[var(--text-muted)] font-medium animate-slideUp stagger-2">
                    A collection of my open-source work and experiments
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo, index) => (
                    <div key={repo.id} className={`animate-slideUp stagger-${Math.min(index + 1, 6)}`}>
                        <RepoCard repo={repo} />
                    </div>
                ))}
            </div>
            {repos.length === 0 && (
                <div className="text-center py-16 text-[var(--text-muted)]">
                    <div className="text-4xl mb-4">📦</div>
                    <p className="font-bold">No repositories found</p>
                    <p className="text-sm mt-1 opacity-75">Check back later for updates</p>
                </div>
            )}
        </div>
    );
};

export default Projects;
