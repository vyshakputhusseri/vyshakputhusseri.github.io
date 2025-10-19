import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import JSONFormatter from './components/tools/JSONFormatter';
import StringifyJSON from './components/tools/StringifyJSON';
import DestringifyJSON from './components/tools/DestringifyJSON';
import { HomeIcon, UserIcon, BriefcaseIcon, CogIcon, MailIcon } from './constants';

export interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component?: React.ComponentType<any>;
  subItems?: Omit<NavItemConfig, 'icon' | 'subItems'>[];
}

const NAV_CONFIG: NavItemConfig[] = [
  { id: 'home', label: 'Home', icon: HomeIcon, component: Home },
  { id: 'about', label: 'About Me', icon: UserIcon, component: About },
  { id: 'projects', label: 'Projects', icon: BriefcaseIcon, component: Projects },
  {
    id: 'tools',
    label: 'Tools',
    icon: CogIcon,
    subItems: [
      { id: 'json-formatter', label: 'JSON Formatter', component: JSONFormatter },
      { id: 'stringify-json', label: 'Stringify JSON', component: StringifyJSON },
      { id: 'destringify-json', label: 'De-stringify JSON', component: DestringifyJSON },
    ],
  },
  { id: 'contact', label: 'Contact', icon: MailIcon, component: Contact },
];

function App() {
  const [activeView, setActiveView] = useState<{ main: string; sub?: string }>({ main: 'home' });
  const [displayedView, setDisplayedView] = useState(activeView);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(() => {
    return localStorage.getItem('sidebarPinned') === 'true';
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // --- HASH ROUTING ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2); // remove #/
      if (!hash) {
        setActiveView({ main: 'home' });
        return;
      }
      const [main, sub] = hash.split('/');
      const mainNavItem = NAV_CONFIG.find(item => item.id === main);

      if (mainNavItem) {
        if (sub) {
            const subItemExists = mainNavItem.subItems?.some(item => item.id === sub);
            setActiveView({ main, sub: subItemExists ? sub : mainNavItem.subItems?.[0].id });
        } else {
            setActiveView({ main });
        }
      } else {
        setActiveView({ main: 'home' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const { main, sub } = activeView;
    let newHash = `/${main}`;
    if (sub) {
      newHash += `/${sub}`;
    }
    if (window.location.hash !== `#${newHash}`) {
      window.location.hash = newHash;
    }
  }, [activeView]);

  // --- TRANSITION EFFECT ---
  useEffect(() => {
    const isSameView = activeView.main === displayedView.main && activeView.sub === displayedView.sub;
    if (!isSameView) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayedView(activeView);
        setIsTransitioning(false);
      }, 200); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [activeView, displayedView]);

  // --- SIDEBAR STATE ---
  useEffect(() => {
    localStorage.setItem('sidebarPinned', String(isSidebarPinned));
  }, [isSidebarPinned]);

  const toggleSidebarPin = () => {
    setIsSidebarPinned(prev => !prev);
  };

  const renderContent = () => {
    const viewToRender = displayedView;
    const mainNavItem = NAV_CONFIG.find(item => item.id === viewToRender.main);
    const DefaultComponent = Home;

    if (!mainNavItem) return <DefaultComponent setActiveView={setActiveView} />;

    if (mainNavItem.subItems && viewToRender.sub) {
      const subItem = mainNavItem.subItems.find(item => item.id === viewToRender.sub);
      const SubComponent = subItem?.component || mainNavItem.subItems[0]?.component;
      return SubComponent ? <SubComponent /> : <div>Select a tool</div>;
    }
    
    const MainComponent = mainNavItem.component;
    if (MainComponent) {
      return <MainComponent setActiveView={setActiveView} />;
    }
    
    return <DefaultComponent setActiveView={setActiveView} />;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <div className="flex min-h-screen">
        <Sidebar
          navConfig={NAV_CONFIG}
          activeView={activeView}
          setActiveView={setActiveView}
          isPinned={isSidebarPinned}
          togglePin={toggleSidebarPin}
          onExpansionChange={setIsSidebarExpanded}
        />
        <main className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'pl-56' : 'pl-20'}`}>
          <div className={`h-full w-full transition-all duration-200 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
