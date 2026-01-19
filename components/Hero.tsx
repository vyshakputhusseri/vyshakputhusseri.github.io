
import React from 'react';
import { GitHubProfile } from '../types';

interface HeroProps {
  profile: GitHubProfile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 animate-fadeIn">
      <div className="relative mb-10 group">
        <div className="absolute -inset-4 bg-blue-100/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative">
          <img 
            src={profile.avatar_url} 
            alt={profile.name} 
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white shadow-2xl object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-3 ring-0 group-hover:ring-8 group-hover:ring-blue-50/50"
          />
        </div>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 transition-all duration-500 hover:tracking-normal cursor-default">
          {profile.name || profile.login}
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-gray-400 tracking-tight italic transition-colors hover:text-gray-600 duration-300">
          "An average human, who loves solving uncertainty"
        </h2>
        
        <div className="flex justify-center gap-3">
          <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-gray-100 hover:border-blue-200 hover:text-blue-500 transition-all duration-300 cursor-default">
            Developer
          </span>
          <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-gray-100 hover:border-blue-200 hover:text-blue-500 transition-all duration-300 cursor-default">
            Security Researcher
          </span>
        </div>

        {/* <p className="text-lg text-gray-400 leading-relaxed pt-6 font-medium max-w-2xl mx-auto transition-all duration-500 hover:text-gray-500">
          Applying rigorous engineering principles and security research to navigate complex technical challenges. I thrive in the space where robust development meets proactive problem solving.
        </p> */}
      </div>
    </section>
  );
};

export default Hero;
