import React from 'react';
import type { Project, Skill } from './types';

// SVG Icon Components
export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.91 0-1.38.61-1.38 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 3.99V19z" />
  </svg>
);

export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v9.75a1.5 1.5 0 001.5 1.5h3.75a1.5 1.5 0 001.5-1.5V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v5.25a1.5 1.5 0 001.5 1.5h3.75a1.5 1.5 0 001.5-1.5V10.5M4.5 12.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.92a2.25 2.25 0 01-2.15-2.092l-.64-6.32a2.25 2.25 0 012.15-2.408H18a2.25 2.25 0 012.25 2.25v.32" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75h-9a1.5 1.5 0 00-1.5 1.5v1.5h12V8.25a1.5 1.5 0 00-1.5-1.5z" />
  </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 9.75v1.5m0 0v1.5m0-1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m1.5-6.75v1.5m0 0v1.5m0-1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m6.75 1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m1.5 6.75v1.5m0 0v1.5m0-1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m6.75-1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0" />
    </svg>
);

export const PinIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 3.75a.75.75 0 01.75.75v11.19l3.47-3.47a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.47 3.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        <path d="M6 3.75A2.25 2.25 0 018.25 6v12a2.25 2.25 0 01-4.5 0V6A2.25 2.25 0 016 3.75z" />
    </svg>
);

export const PinOffIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25c0-3.31-2.69-6-6-6h-1.5c-.38 0-.75.04-1.12.12M8.25 4.5c-.43 0-.85.06-1.25.16a6 6 0 00-4.34 8.09l-.16.32a6 6 0 008.09 4.34l.32-.16c.86-.43 1.63-.99 2.28-1.63M15 12.75a3 3 0 01-4.24-4.24" />
    </svg>
);

// DATA
export const SOCIAL_LINKS = {
  github: 'https://github.com/vyshakputhusseri',
  linkedin: 'https://www.linkedin.com/in/vyshakputhusseri/',
};

export const SKILLS: Skill[] = [
  { name: 'React', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="h-10 w-10"/> },
  { name: 'TypeScript', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-10 w-10"/> },
  { name: 'JavaScript', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-10 w-10"/> },
  { name: 'Node.js', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-10 w-10"/> },
  { name: 'Tailwind CSS', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" className="h-10 w-10"/> },
  { name: 'HTML5', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" className="h-10 w-10"/> },
  { name: 'CSS3', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" className="h-10 w-10"/> },
  { name: 'Git', icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" alt="Git" className="h-10 w-10"/> },
];

export const PROJECTS: Project[] = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application for project management, featuring real-time collaboration and task tracking.',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    imageUrl: 'https://picsum.photos/seed/alpha/400/300',
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
  {
    title: 'E-commerce Storefront',
    description: 'A modern, responsive e-commerce platform with a custom CMS and integration with Stripe for payments.',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'GraphQL'],
    imageUrl: 'https://picsum.photos/seed/ecommerce/400/300',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js, providing insights through dynamic charts.',
    tags: ['React', 'D3.js', 'Python', 'Flask'],
    imageUrl: 'https://picsum.photos/seed/dashboard/400/300',
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
   {
    title: 'Personal Blog Platform',
    description: 'A lightweight and fast blog built with a static site generator, focused on performance and SEO.',
    tags: ['Gatsby', 'React', 'Markdown', 'Netlify'],
    imageUrl: 'https://picsum.photos/seed/blog/400/300',
    githubUrl: 'https://github.com',
  },
];