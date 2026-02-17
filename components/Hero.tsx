
import React from 'react';
import { GitHubProfile } from '../types';

interface HeroProps {
  profile: GitHubProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4" aria-label="Introduction">
      <div className="relative mb-10 group animate-scaleIn">
        <div className="absolute -inset-4 bg-[var(--primary-light)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden="true"></div>
        <div className="relative">
          <img 
            src={profile.avatar_url} 
            alt={`Profile photo of ${profile.name || profile.login}`}
            loading="eager"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-[var(--bg-main)] shadow-2xl object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-3 ring-0 group-hover:ring-8 group-hover:ring-[var(--primary-light)]"
          />
        </div>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--text-main)] transition-all duration-500 hover:tracking-normal cursor-default animate-slideUp">
          {profile.name || profile.login}
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-muted)] tracking-tight italic transition-colors hover:text-[var(--text-main)] duration-300 animate-slideUp stagger-2">
          "An average human, who loves solving uncertainty"
        </h2>
        
        <div className="flex justify-center gap-3 animate-slideUp stagger-3">
          <span className="px-4 py-1.5 bg-[var(--bg-panel)] text-[var(--text-muted)] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[var(--border-main)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 cursor-default">
            Developer
          </span>
          <span className="px-4 py-1.5 bg-[var(--bg-panel)] text-[var(--text-muted)] rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[var(--border-main)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 cursor-default">
            Security Researcher
          </span>
        </div>

        <p className="text-lg text-[var(--text-muted)] leading-relaxed pt-6 font-medium max-w-2xl mx-auto transition-all duration-500 hover:text-[var(--text-main)] animate-slideUp stagger-4">
          Building trust with secure and rigorous engineering.
        </p>
      </div>
    </section>
  );
};

export default Hero;
