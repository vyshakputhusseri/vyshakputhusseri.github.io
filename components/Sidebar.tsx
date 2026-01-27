import React from 'react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeTool: string;
  setActiveTool: (tool: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, activeTool, setActiveTool }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'about', label: 'About Me', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    // { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 7h10' },
    { id: 'tools', label: 'Tools', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'resume', label: 'Resume', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'accessibility', label: 'Accessibility', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const toolsSubItems = [
    'JSON Formatter',
    'Stringify JSON',
    'De-stringify JSON',
    // 'DDoS Simulator',
    'Zoho OAuth',
  ];

  const aboutSubItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[var(--border-main)] flex flex-col bg-[var(--bg-main)] overflow-y-auto z-40 transition-all duration-300">
      <div className="p-8">
        <div
          className="text-3xl font-black text-[var(--text-main)] mb-10 flex items-center gap-1 cursor-pointer transition-all duration-500 hover:text-[var(--primary)] hover:scale-105 origin-left tracking-tighter"
          onClick={() => setActiveSection('home')}
        >
          tYson
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id} className="group">
              <button
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.id === 'tools' && !activeTool) setActiveTool('JSON Formatter');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 transform group-hover:translate-x-1 ${activeSection === item.id
                  ? 'bg-[var(--primary-light)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-main)] opacity-70 hover:opacity-100 hover:bg-[var(--bg-panel)] hover:text-[var(--primary)]'
                  }`}
              >
                <svg className={`w-5 h-5 transition-all duration-500 ${activeSection === item.id ? 'rotate-12 scale-110 text-[var(--primary)]' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
                </svg>
                {item.label}
              </button>

              {/* Tools Submenu */}
              {item.id === 'tools' && activeSection === 'tools' && (
                <div className="ml-12 mt-2 space-y-2 pb-4 animate-fadeIn">
                  {toolsSubItems.map(tool => (
                    <button
                      key={tool}
                      onClick={() => setActiveTool(tool)}
                      className={`block w-full text-left text-[11px] font-medium py-1.5 transition-all duration-300 hover:translate-x-1 ${activeTool === tool ? 'text-[var(--primary)]' : 'text-[var(--text-main)] opacity-60 hover:text-[var(--primary)] hover:opacity-100'
                        }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              )}

              {/* About Submenu */}
              {item.id === 'about' && activeSection === 'about' && (
                <div className="ml-12 mt-2 space-y-2 pb-4 animate-fadeIn">
                  {aboutSubItems.map(subItem => (
                    <button
                      key={subItem.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection(subItem.id);
                      }}
                      className="block w-full text-left text-[11px] font-medium py-1.5 transition-all duration-300 hover:translate-x-1 text-[var(--text-main)] opacity-60 hover:text-[var(--primary)] hover:opacity-100"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-8">
        <div className="flex gap-6 px-4">
          <a href="https://github.com/vyshakputhusseri" target="_blank" className="text-[var(--text-main)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-125">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/vyshakputhusseri" className="text-[var(--text-main)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-all duration-300 transform hover:scale-125">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
