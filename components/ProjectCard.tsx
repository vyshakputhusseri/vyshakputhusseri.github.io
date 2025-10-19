import React from 'react';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, tags, imageUrl, githubUrl, liveUrl } = project;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-sky-500/30 hover:-translate-y-2 flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover"/>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-4">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors flex items-center gap-2">
            <GithubIcon />
            <span>Code</span>
          </a>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors flex items-center gap-2">
              <ExternalLinkIcon />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;