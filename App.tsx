import React, { useState, useEffect, useRef } from 'react';
import { fetchGitHubProfile, fetchGitHubRepos } from './services/githubService';
import { speakContent } from './services/geminiService';
import { GitHubProfile, GitHubRepo } from './types';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Accessibility, { AccessibilitySettings, DEFAULT_SETTINGS } from './components/Accessibility';
import CVViewer from './components/CVViewer';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Projects from './components/Projects';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTool, setActiveTool] = useState<'JSON Formatter' | 'Stringify JSON' | 'De-stringify JSON' | 'DDoS Simulator' | 'Zoho OAuth'>('Zoho OAuth');
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
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

  const handleReadPage = async () => {
    if (!mainRef.current) return;
    const contentText = mainRef.current.innerText.substring(0, 3000);
    await speakContent(contentText);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">Authenticating Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative overflow-hidden transition-colors duration-300">
      <div id="app-root" className="flex w-full min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {a11y.readingMask && <div className="reading-mask" />}
        {a11y.readingRuler && <div className="reading-ruler" />}
        <div className="custom-cursor" />

        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeTool={activeTool}
          setActiveTool={(tool) => { setActiveTool(tool); setActiveSection('tools'); }}
        />

        <div id="main-scroll-area" ref={scrollAreaRef} className="flex-1 ml-64 min-h-screen overflow-y-auto">
          <main id="main-content" ref={mainRef} className="max-w-5xl mx-auto px-8">
            {activeSection === 'home' && profile && <Hero profile={profile} />}
            {activeSection === 'about' && <AboutMe />}
            {activeSection === 'projects' && <Projects repos={repos} />}
            {activeSection === 'tools' && <div className="py-16"><Tools activeTool={activeTool} /></div>}
            {activeSection === 'resume' && <CVViewer />}
            {activeSection === 'accessibility' && <div className="py-16"><Accessibility settings={a11y} updateSettings={(s) => setA11y(prev => ({ ...prev, ...s }))} /></div>}
            {activeSection === 'contact' && <Contact />}
          </main>
          {a11y.ttsEnabled && (
            <button onClick={handleReadPage} className="fixed bottom-28 left-72 px-8 py-4 bg-white border border-blue-100 text-blue-600 rounded-2xl shadow-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 z-50 transition-all hover:scale-105 active:scale-95">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              Speak Page Content
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
