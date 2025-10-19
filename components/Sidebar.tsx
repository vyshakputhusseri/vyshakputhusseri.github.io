import React, { useState, useEffect } from 'react';
import type { NavItemConfig } from '../App';
import { GithubIcon, LinkedInIcon, SOCIAL_LINKS, PinIcon, PinOffIcon } from '../constants';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  navConfig: NavItemConfig[];
  activeView: { main: string; sub?: string };
  setActiveView: (view: { main: string; sub?: string }) => void;
  isPinned: boolean;
  togglePin: () => void;
  onExpansionChange: (isExpanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navConfig, activeView, setActiveView, isPinned, togglePin, onExpansionChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isPinned || isHovered;

  useEffect(() => {
    onExpansionChange(isExpanded);
  }, [isExpanded, onExpansionChange]);

  const handleNavClick = (item: NavItemConfig) => {
    if (item.subItems) {
      setActiveView({ main: item.id, sub: item.subItems[0].id });
    } else {
      setActiveView({ main: item.id });
    }
  };

  const handleSubNavClick = (mainItem: NavItemConfig, subItem: Omit<NavItemConfig, 'icon' | 'subItems'>) => {
    setActiveView({ main: mainItem.id, sub: subItem.id });
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/50 flex flex-col justify-between p-4 transition-all duration-300 z-40 ${isExpanded ? 'w-56' : 'w-20'}`}
      onMouseEnter={() => !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isPinned && setIsHovered(false)}
    >
      <div>
        {/* Logo */}
        <div className={`flex items-center mb-10 transition-all duration-300 ${!isExpanded ? 'justify-center' : 'justify-start pl-2'}`}>
          <a href="/#/home" onClick={(e) => { e.preventDefault(); setActiveView({ main: 'home' }); }} className="text-2xl font-bold text-slate-800 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
            <span className="text-sky-500 dark:text-sky-400">&lt;</span>
            <span className={!isExpanded ? 'hidden' : 'inline'}>VP</span>
            <span className={!isExpanded ? 'hidden' : 'inline'}></span>
            <span className="text-sky-500 dark:text-sky-400">/&gt;</span>
          </a>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navConfig.map((item) => {
            const Icon = item.icon;
            return (
            <React.Fragment key={item.id}>
              <button
                onClick={() => handleNavClick(item)}
                className={`group relative w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${!isExpanded ? 'justify-center' : ''} ${
                  activeView.main === item.id
                    ? 'bg-sky-500/10 text-sky-500 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                aria-label={item.label}
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-medium text-sm transition-opacity duration-200 ${!isExpanded ? 'opacity-0 hidden' : 'opacity-100'}`}>{item.label}</span>
                <span className={`absolute left-full ml-4 hidden group-hover:block bg-slate-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 ${isExpanded ? 'lg:hidden' : ''}`}>
                  {item.label}
                </span>
              </button>
              {/* Sub Navigation */}
              {isExpanded && item.subItems && (
                 <div className="pl-8 flex flex-col space-y-1">
                    {item.subItems.map(subItem => (
                       <button
                         key={subItem.id}
                         onClick={() => handleSubNavClick(item, subItem)}
                         className={`text-left text-sm py-2 px-4 rounded-md transition-colors ${
                            activeView.sub === subItem.id && activeView.main === item.id
                              ? 'font-semibold text-sky-500 dark:text-sky-400'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                         }`}
                       >
                         {subItem.label}
                       </button>
                    ))}
                 </div>
              )}
            </React.Fragment>
          )})}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col items-center space-y-4">
         <div className={`flex items-center justify-center ${!isExpanded ? 'flex-col space-y-4' : 'space-x-4'}`}>
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" aria-label="GitHub Profile">
                 <GithubIcon className="h-6 w-6" />
             </a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" aria-label="LinkedIn Profile">
                 <LinkedInIcon className="h-6 w-6" />
             </a>
         </div>
         <ThemeToggle />
         <button
            onClick={togglePin}
            className="w-full flex justify-center p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
         >
            {isPinned ? <PinIcon /> : <PinOffIcon />}
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;