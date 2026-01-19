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
                <h2 className="text-5xl font-black tracking-tighter text-[var(--text-main)]">Featured Projects</h2>
                <p className="text-xl text-[var(--text-muted)] font-medium">
                    A collection of my open-source work and experiments
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
            </div>
        </div>
    );
};

export default Projects;
