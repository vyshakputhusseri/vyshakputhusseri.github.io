import React from 'react';
import { SOCIAL_LINKS, GithubIcon, LinkedInIcon } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="h-full flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          I'm always open to discussing about the topics that I know or dont know. But under one condition, either of us should have the confidence of learning something from each other.
        </p>
        <a 
          href="mailto:vyshakputhusseri@gmail.com"
          className="inline-block bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-lg mb-12"
        >
          Say Hello
        </a>
        <div className="flex justify-center space-x-6">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" aria-label="GitHub Profile">
            <GithubIcon className="h-8 w-8" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" aria-label="LinkedIn Profile">
            <LinkedInIcon className="h-8 w-8" />
          </a>
        </div>
    </section>
  );
};

export default Contact;