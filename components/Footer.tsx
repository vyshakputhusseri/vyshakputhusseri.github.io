
import React from 'react';
import { SOCIAL_LINKS, GithubIcon, LinkedInIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Vyshak Puthusseri. No Rights Reserved. Do what ever you want :)
          </p>
          <p className="text-xs text-slate-500">
            With love for react
          </p>
        </div>
        <div className="flex space-x-6">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
            <GithubIcon className="h-6 w-6" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;