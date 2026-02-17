import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { fetchGitHubProfile, fetchGitHubRepos } from './services/githubService';
import { GitHubProfile, GitHubRepo } from './types';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Accessibility, { AccessibilitySettings, DEFAULT_SETTINGS } from './components/Accessibility';

// Lazy load heavy components for code-splitting
const Tools = lazy(() => import('./components/Tools'));
const CVViewer = lazy(() => import('./components/CVViewer'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));
const Projects = lazy(() => import('./components/Projects'));

const SECTION_TITLES: Record<string, string> = {
  home: 'Home',
  about: 'About Me',
  projects: 'Projects',
  tools: 'Tools',
  resume: 'Resume',
  accessibility: 'Accessibility',
  contact: 'Contact',
};

const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-32">
    <div className="space-y-4 text-center">
      <div className="w-10 h-10 border-4 border-[var(--border-main)] border-t-[var(--primary)] rounded-full animate-spin mx-auto"></div>
      <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

const VALID_SECTIONS = new Set(Object.keys(SECTION_TITLES));

const getHashSection = (): string => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return VALID_SECTIONS.has(hash) ? hash : 'home';
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState(getHashSection);
  const [activeTool, setActiveTool] = useState<'JSON Formatter' | 'Stringify JSON' | 'De-stringify JSON' | 'DDoS Simulator' | 'Zoho OAuth'>('Zoho OAuth');
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load initial settings from localStorage or fallback to defaults
  const [a11y, setA11y] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('a11y-settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  // Persist settings changes
  useEffect(() => {
    localStorage.setItem('a11y-settings', JSON.stringify(a11y));
  }, [a11y]);

  // Update document title when section changes
  useEffect(() => {
    const sectionTitle = SECTION_TITLES[activeSection] || 'Home';
    document.title = `${sectionTitle} — Vyshak Puthusseri`;
  }, [activeSection]);

  // Sync hash → state on browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const section = getHashSection();
      setActiveSection(section);
      setSidebarOpen(false);
      scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Close sidebar on section change (mobile)
  const handleSetActiveSection = useCallback((section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
    // Update URL hash so the link is shareable
    window.history.pushState(null, '', `#${section}`);
    // Scroll to top of content
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const loadData = async (user: string) => {
    setLoading(true);
    try {
      const profileData = await fetchGitHubProfile(user);
      const repoData = await fetchGitHubRepos(user);
      setProfile(profileData);
      setRepos(repoData);
    } catch (err: any) {
      setProfile({
        login: user,
        name: "Vyshak Puthusseri",
        avatar_url: `https://github.com/${user}.png`,
        bio: "An average human, who loves solving uncertainty",
        public_repos: 12,
        followers: 42,
        following: 10,
        html_url: `https://github.com/${user}`,
        location: "India",
        blog: ""
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData('vyshakputhusseri');
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    // Apply CSS variables
    root.style.setProperty('--text-scale', a11y.textScale.toString());
    root.style.setProperty('--line-height', a11y.lineHeight.toString());
    root.style.setProperty('--letter-spacing', `${a11y.letterSpacing}px`);
    root.style.setProperty('--word-spacing', `${a11y.wordSpacing}px`);
    root.style.setProperty('--mask-height', `${a11y.maskHeight}px`);
    root.style.setProperty('--mask-opacity', a11y.maskOpacity.toString());
    root.style.setProperty('--zoom-level', a11y.zoomLevel.toString());

    // Resolve Theme Mode
    const resolveMode = () => {
      if (a11y.themeMode === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return a11y.themeMode;
    };

    const mode = resolveMode();
    const classList = [
      mode === 'dark' ? 'dark' : '',
      `theme-${a11y.accentTheme}`,
      a11y.contrast === 'high' ? 'high-contrast' : '',
      a11y.contrast === 'monochrome' ? 'monochrome' : '',
      a11y.dyslexicFont ? 'dyslexic-font' : '',
      a11y.focusRing ? 'focus-ring' : '',
      a11y.largeTargets ? 'large-targets' : '',
      a11y.reduceMotion ? 'reduce-motion' : '',
      a11y.underlineLinks ? 'underline-links' : '',
      a11y.customCursor ? 'use-custom-cursor' : '',
      a11y.colorBlindMode !== 'none' ? a11y.colorBlindMode : '',
    ].filter(Boolean);

    root.className = classList.join(' ');

    const handleMouseMove = (e: MouseEvent) => {
      root.style.setProperty('--mask-y', `${e.clientY}px`);
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [a11y]);

  const handleReadPage = () => {
    if (!mainRef.current) return;
    window.speechSynthesis.cancel();
    const contentText = mainRef.current.innerText.substring(0, 3000);
    const utterance = new SpeechSynthesisUtterance(contentText);
    window.speechSynthesis.speak(utterance);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="w-12 h-12 border-4 border-[var(--border-main)] border-t-[var(--primary)] rounded-full animate-spin"></div>
        <p className="text-[var(--text-muted)] font-black text-[10px] uppercase tracking-[0.3em]">Authenticating Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative overflow-hidden transition-colors duration-300">
      <div id="app-root" className="flex w-full min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {a11y.readingMask && <div className="reading-mask" aria-hidden="true" />}
        {a11y.readingRuler && <div className="reading-ruler" aria-hidden="true" />}
        <div className="custom-cursor" aria-hidden="true" />

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn fixed top-4 left-4 z-50 p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-main)] shadow-lg text-[var(--text-main)] hover:text-[var(--primary)] transition-all active:scale-95"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        {/* Mobile overlay */}
        <div
          className={`mobile-overlay fixed inset-0 bg-black/30 backdrop-blur-sm z-30 ${sidebarOpen ? 'sidebar-open' : ''}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleSetActiveSection}
          activeTool={activeTool}
          setActiveTool={(tool) => { setActiveTool(tool); handleSetActiveSection('tools'); }}
          isOpen={sidebarOpen}
        />

        <div id="main-scroll-area" ref={scrollAreaRef} className="flex-1 ml-64 min-h-screen overflow-y-auto">
          <main id="main-content" ref={mainRef} className="max-w-5xl mx-auto px-4 sm:px-8" role="main" aria-label={`${SECTION_TITLES[activeSection]} section`}>
            <Suspense fallback={<SectionLoader />}>
              {activeSection === 'home' && profile && <Hero profile={profile} />}
              {activeSection === 'about' && <AboutMe />}
              {activeSection === 'projects' && <Projects repos={repos} />}
              {activeSection === 'tools' && <div className="py-16"><Tools activeTool={activeTool} /></div>}
              {activeSection === 'resume' && <CVViewer />}
              {activeSection === 'accessibility' && <div className="py-16"><Accessibility settings={a11y} updateSettings={(s) => setA11y(prev => ({ ...prev, ...s }))} /></div>}
              {activeSection === 'contact' && <Contact />}
            </Suspense>
          </main>
          {a11y.ttsEnabled && (
            <button
              onClick={handleReadPage}
              className="fixed bottom-28 left-72 px-8 py-4 bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--primary)] rounded-2xl shadow-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 z-50 transition-all hover:scale-105 active:scale-95"
              aria-label="Read page content aloud"
            >
              <span className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" aria-hidden="true"></span>
              Speak Page Content
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
