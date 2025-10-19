import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
              My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
        </div>
    </section>
  );
};

export default Projects;