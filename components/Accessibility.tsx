
import React, { useState } from 'react';

export interface AccessibilitySettings {
  textScale: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  contrast: 'standard' | 'high' | 'monochrome';
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  dyslexicFont: boolean;
  grayscale: boolean;
  reduceMotion: boolean;
  largeTargets: boolean;
  readingMask: boolean;
  readingRuler: boolean;
  maskHeight: number;
  maskOpacity: number;
  ttsEnabled: boolean;
  underlineLinks: boolean;
  focusRing: boolean;
  onOffLabels: boolean;
  strikethroughDisabled: boolean;
  zoomLevel: number;
  customCursor: boolean;
  accessibleScrollbar: boolean;
  language: 'EN' | 'ES' | 'HI';
  activePersonas: string[];
  themeMode: 'light' | 'dark' | 'auto';
  accentTheme: 'blue' | 'red' | 'green' | 'yellow' | 'orange';
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: 1,
  lineHeight: 1.5,
  letterSpacing: 0,
  wordSpacing: 0,
  contrast: 'standard',
  colorBlindMode: 'none',
  dyslexicFont: false,
  grayscale: false,
  reduceMotion: false,
  largeTargets: false,
  readingMask: false,
  readingRuler: false,
  maskHeight: 150,
  maskOpacity: 0.5,
  ttsEnabled: false,
  underlineLinks: false,
  focusRing: false,
  onOffLabels: true,
  strikethroughDisabled: false,
  zoomLevel: 1,
  customCursor: false,
  accessibleScrollbar: false,
  language: 'EN',
  activePersonas: [],
  themeMode: 'light',
  accentTheme: 'blue',
};

interface Persona {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  settings: Partial<AccessibilitySettings>;
}

const PERSONAS: Persona[] = [
  {
    id: 'adhd',
    label: 'ADHD Friendly',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    description: "Reduces distractions and creates a more focused reading experience.",
    features: ["Reading Mask Active", "Focus Ring On", "Reduced Motion", "Increased Line Height"],
    settings: { readingMask: true, focusRing: true, reduceMotion: true, lineHeight: 1.8 }
  },
  {
    id: 'astigmatism',
    label: 'Astigmatism',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    description: "Enhances clarity and reduces visual glare for sensitive eyes.",
    features: ["High Contrast", "Increased Line Height", "Large Targets", "Word Spacing"],
    settings: { contrast: 'high', lineHeight: 1.8, largeTargets: true, wordSpacing: 2 }
  },
  {
    id: 'epilepsy',
    label: 'Epilepsy Safe',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    description: "Stops all animations and intensive color shifts to prevent triggers.",
    features: ["Reduce Motion", "Monochrome Mode", "Reduced Intensity"],
    settings: { reduceMotion: true, contrast: 'monochrome' }
  },
  {
    id: 'older',
    label: 'For Older Users',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    description: "Maximizes legibility and clickable target sizes for ease of use.",
    features: ["Text Scale 1.2x", "Large Targets", "High Contrast", "Focus Ring"],
    settings: { textScale: 1.2, largeTargets: true, contrast: 'high', focusRing: true }
  },

  {
    id: 'motor',
    label: 'Motor Disabilities',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
    description: "Designed for users with limited mobility or precision issues.",
    features: ["Large Targets", "Accessible Scrollbar", "Focus Ring", "No Motion"],
    settings: { largeTargets: true, accessibleScrollbar: true, focusRing: true, reduceMotion: true }
  },
  {
    id: 'dyslexia',
    label: 'Dyslexia Friendly',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    description: "Applies OpenDyslexic typeface and optimal spatial layout.",
    features: ["Dyslexic Font", "Wide Line Height", "Word Spacing", "Large Targets"],
    settings: { dyslexicFont: true, lineHeight: 1.8, wordSpacing: 2, largeTargets: true }
  },
  {
    id: 'seizure',
    label: 'Seizure Safe',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    description: "Completely eliminates flashing and intensive movement.",
    features: ["Reduce Motion", "Monochrome", "High Contrast"],
    settings: { reduceMotion: true, contrast: 'monochrome' }
  },
];

const THEME_COLORS = [
  { id: 'blue', primary: '#2563eb', secondary: '#6366f1' },
  { id: 'red', primary: '#ef4444', secondary: '#dc2626' },
  { id: 'green', primary: '#22c55e', secondary: '#16a34a' },
  { id: 'yellow', primary: '#eab308', secondary: '#ca8a04' },
  { id: 'orange', primary: '#f97316', secondary: '#ea580c' },
] as const;

interface AccessibilityProps {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
}

const Accessibility: React.FC<AccessibilityProps> = ({ settings, updateSettings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInfoFor, setShowInfoFor] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    appearance: true,
    personas: true,
    reading: true,
    vision: true,
    navigation: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const togglePersona = (persona: Persona) => {
    const isActive = settings.activePersonas.includes(persona.id);
    if (isActive) {
      const newActive = settings.activePersonas.filter(id => id !== persona.id);
      const reverts: Partial<AccessibilitySettings> = {};
      Object.keys(persona.settings).forEach(key => {
        (reverts as any)[key] = (DEFAULT_SETTINGS as any)[key];
      });
      updateSettings({ ...reverts, activePersonas: newActive });
    } else {
      updateSettings({ ...persona.settings, activePersonas: [...settings.activePersonas, persona.id] });
    }
  };

  const ControlInfo = ({ id, text }: { id: string, text: string }) => (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setShowInfoFor(id)}
        onMouseLeave={() => setShowInfoFor(null)}
        onClick={() => setShowInfoFor(showInfoFor === id ? null : id)}
        className="ml-2 w-6 h-6 rounded-full border border-[var(--border-main)] text-[11px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors bg-[var(--bg-panel)] font-bold shadow-sm"
        aria-label="Information"
      >i</button>
      {showInfoFor === id && (
        <div className="absolute z-[100] left-8 top-0 w-64 bg-[var(--bg-panel)] text-[var(--text-main)] p-4 rounded-2xl text-[11px] shadow-2xl animate-fadeIn border border-[var(--border-main)] pointer-events-none">
          <div className="font-bold mb-1 uppercase tracking-widest text-[9px] text-[var(--primary)]">Information</div>
          {text}
          <div className="absolute top-2 -left-2 w-4 h-4 bg-[var(--bg-panel)] rotate-45 border-l border-b border-[var(--border-main)]"></div>
        </div>
      )}
    </div>
  );

  const Toggle = ({ value, onChange, id, label, info }: { value: boolean, onChange: () => void, id: string, label: string, info: string }) => {
    if (searchTerm && !label.toLowerCase().includes(searchTerm.toLowerCase()) && !info.toLowerCase().includes(searchTerm.toLowerCase())) return null;
    return (
      <div className="flex items-center justify-between py-4 border-b border-[var(--border-main)] last:border-0 group">
        <div className="flex items-center">
          <span className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">{label}</span>
          <ControlInfo id={id} text={info} />
        </div>
        <button
          role="switch" aria-checked={value}
          onClick={onChange}
          className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 shadow-inner ${value ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>
    );
  };

  const Slider = ({ label, value, min, max, step, suffix, onChange, id, info }: { label: string, value: number, min: number, max: number, step: number, suffix: string, onChange: (val: number) => void, id: string, info: string }) => {
    if (searchTerm && !label.toLowerCase().includes(searchTerm.toLowerCase()) && !info.toLowerCase().includes(searchTerm.toLowerCase())) return null;
    return (
      <div className="py-5 border-b border-[var(--border-main)] last:border-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm font-bold text-[var(--text-main)]">{label}</span>
            <ControlInfo id={id} text={info} />
          </div>
          <span className="text-xs font-black text-[var(--primary)] bg-[var(--primary-light)] px-3 py-1.5 rounded-lg min-w-[55px] text-center shadow-sm">
            {value.toFixed(value < 10 ? 1 : 0)}{suffix}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onChange(Math.max(min, value - step))}
            className="w-10 h-10 rounded-2xl bg-[var(--bg-panel)] flex items-center justify-center font-black text-xl hover:text-[var(--primary)] active:scale-90 transition-all text-[var(--text-muted)] border border-[var(--border-main)] no-underline"
            aria-label={`Decrease ${label}`}
          >-</button>
          <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="flex-1 cursor-pointer"
          />
          <button
            onClick={() => onChange(Math.min(max, value + step))}
            className="w-10 h-10 rounded-2xl bg-[var(--bg-panel)] flex items-center justify-center font-black text-xl hover:text-[var(--primary)] active:scale-90 transition-all text-[var(--text-muted)] border border-[var(--border-main)] no-underline"
            aria-label={`Increase ${label}`}
          >+</button>
        </div>
      </div>
    );
  };

  const filteredPersonas = PERSONAS.filter(p => p.label.toLowerCase().includes(searchTerm.toLowerCase()));

  // Dynamic colors for the Preview Card based on settings
  const isDarkMode = settings.themeMode === 'dark' || (settings.themeMode === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const previewBg = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const previewInnerBg = isDarkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-slate-50 border-slate-100';

  const [isPinned, setIsPinned] = useState(false);

  return (
    <div className="w-full px-4 md:px-10 space-y-10 bg-[var(--bg-main)] pb-64">
      {/* Header with Pin Support */}
      <div className={`${isPinned ? 'sticky top-0 z-50 bg-[var(--bg-main)]/95 backdrop-blur-2xl border-b border-[var(--border-main)] pb-8 -mx-10 px-10 pt-4 md:pt-0 shadow-sm' : 'relative'} space-y-8 transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tighter">Preferences</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2.5 rounded-2xl border transition-all ${isPinned ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-transparent text-[var(--text-muted)] border-[var(--border-main)] hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
              title={isPinned ? "Unpin Header" : "Pin Header"}
            >
              <svg className="w-5 h-5" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={() => updateSettings(DEFAULT_SETTINGS)}
              className="text-[11px] font-black text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-2xl border border-red-100 uppercase tracking-widest transition-all no-underline"
            >Reset All</button>
          </div>
        </div>

        {/* Shrunk Preview Card */}
        <div className={`rounded-[2rem] p-5 border shadow-xl space-y-3 relative overflow-hidden transition-all ${previewBg}`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
            <div className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.25em]">Validation Mode</div>
          </div>
          <div className={`p-4 rounded-2xl border relative z-10 ${previewInnerBg}`}>
            <p className="text-xs font-medium leading-relaxed mb-4 text-[var(--text-muted)]">
              Validate <span className="text-[var(--primary)] font-black">Two-Tone Themes</span> and <strong>Layout Spacing</strong> in real-time.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 bg-[var(--primary)] text-white text-[10px] font-black rounded-xl shadow-lg hover:brightness-110 no-underline uppercase tracking-widest transition-all">Action</button>
              <button disabled className="px-5 py-2 bg-[var(--bg-main)] text-[var(--secondary)] border border-[var(--secondary)] text-[10px] font-black rounded-xl opacity-40 uppercase tracking-widest no-underline">Secondary</button>
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search keywords (e.g. 'zoom', 'contrast')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--bg-panel)] border-2 border-transparent focus:border-[var(--primary-light)] focus:bg-[var(--bg-main)] rounded-2xl py-4 px-12 text-sm outline-none transition-all font-semibold placeholder:text-[var(--text-muted)] shadow-sm"
          />
          <svg className="w-5 h-5 text-[var(--text-muted)] absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* Two-column layout on larger screens (xl and up) */}
      <div className="grid grid-cols-1 gap-y-12">
        {/* Appearance Section */}
        <section className="space-y-6">
          <SectionHeader id="appearance" label="Appearance & Theme" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} toggleSection={toggleSection} isOpen={openSections.appearance} />
          {openSections.appearance && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5" strokeWidth="2.5" /><path d="M12 1v2m0 18v2" strokeWidth="2.5" /></svg> },
                  { id: 'dark', label: 'Dark', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2.5" /></svg> },
                  { id: 'auto', label: 'System', icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2.5" /><path d="M12 3v18" strokeWidth="2.5" /></svg> }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => updateSettings({ themeMode: mode.id as any })}
                    className={`flex flex-col items-center gap-3 p-3 rounded-2xl border-2 transition-all active:scale-95 no-underline ${settings.themeMode === mode.id ? 'border-[var(--primary)] bg-[var(--primary-light)]' : 'border-[var(--border-main)] hover:border-[var(--primary)] bg-[var(--bg-panel)]'}`}
                  >
                    <div className={settings.themeMode === mode.id ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}>{mode.icon}</div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${settings.themeMode === mode.id ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`}>{mode.label}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-5">
                <div className="flex items-center">
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.25em]">Dual-Tone Selection</span>
                  <ControlInfo id="info-accent" text="Each theme consists of a Primary (button fills) and Secondary (borders/accents) color pair." />
                </div>
                <div className="flex gap-4 flex-wrap">
                  {THEME_COLORS.map(color => (
                    <button
                      key={color.id}
                      onClick={() => updateSettings({ accentTheme: color.id })}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg relative overflow-hidden group ${settings.accentTheme === color.id ? 'ring-4 ring-offset-4 ring-[var(--primary-light)] scale-110 shadow-xl' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                      aria-label={`Select ${color.id} theme`}
                    >
                      <div className="absolute inset-0 flex rotate-45 scale-150">
                        <div style={{ backgroundColor: color.primary }} className="w-1/2 h-full"></div>
                        <div style={{ backgroundColor: color.secondary }} className="w-1/2 h-full"></div>
                      </div>
                      {settings.accentTheme === color.id && <svg className="w-6 h-6 text-white relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M5 13l4 4L19 7" /></svg>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Personas Section */}
        <section className="space-y-6">
          <SectionHeader id="personas" label="Smart Profiles" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} toggleSection={toggleSection} isOpen={openSections.personas} />
          {openSections.personas && (
            <div className="grid grid-cols-1 gap-3 animate-fadeIn">
              {filteredPersonas.map(p => (
                <div key={p.id} className="relative">
                  <div className={`flex items-center justify-between p-4 rounded-3xl transition-all border ${settings.activePersonas.includes(p.id) ? 'bg-[var(--primary-light)] border-[var(--primary)]' : 'border-transparent hover:bg-[var(--bg-panel)]'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-2xl transition-colors ${settings.activePersonas.includes(p.id) ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-panel)] text-[var(--text-muted)]'}`}>{p.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[var(--text-main)]">{p.label}</span>
                          <button
                            onMouseEnter={() => setShowInfoFor(p.id)} onMouseLeave={() => setShowInfoFor(null)}
                            className="w-5 h-5 rounded-full border border-[var(--border-main)] text-[10px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] font-bold transition-all"
                          >i</button>
                        </div>
                      </div>
                      {showInfoFor === p.id && (
                        <div className="absolute z-[110] left-36 w-64 bg-[var(--bg-panel)] text-[var(--text-main)] p-5 rounded-3xl text-[11px] shadow-2xl animate-fadeIn border border-[var(--border-main)] pointer-events-none">
                          <div className="font-black text-[var(--primary)] mb-2 uppercase tracking-widest text-[9px]">{p.label} Persona</div>
                          <p className="opacity-80 leading-relaxed mb-4">{p.description}</p>
                          <div className="border-t border-[var(--border-main)] pt-3 space-y-1.5">
                            {p.features.map(f => <div key={f} className="flex items-center gap-2 text-[10px]"><span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>{f}</div>)}
                          </div>
                        </div>
                      )}
                    </div>
                    <button role="switch" aria-checked={settings.activePersonas.includes(p.id)} onClick={() => togglePersona(p)} className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 shadow-inner ${settings.activePersonas.includes(p.id) ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${settings.activePersonas.includes(p.id) ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reading Support */}
        <section className="space-y-6">
          <SectionHeader id="reading" label="Reading & Layout" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} toggleSection={toggleSection} isOpen={openSections.reading} />
          {openSections.reading && (
            <div className="space-y-4 animate-fadeIn">
              <Toggle id="dyslexic" label="OpenDyslexic Font" value={settings.dyslexicFont} onChange={() => updateSettings({ dyslexicFont: !settings.dyslexicFont })} info="Switches system font to OpenDyslexic to aid reading comprehension." />
              <Toggle id="mask" label="Focus Mask" value={settings.readingMask} onChange={() => updateSettings({ readingMask: !settings.readingMask })} info="Dark overlay with a transparent focus band tracking the cursor." />
              <Toggle id="ruler" label="Reading Ruler" value={settings.readingRuler} onChange={() => updateSettings({ readingRuler: !settings.readingRuler })} info="A horizontal line that follows the mouse cursor to help stay on the current line." />
              <Slider id="text-scale" label="Text Size" value={settings.textScale} min={0.8} max={2.0} step={0.1} suffix="x" onChange={(v) => updateSettings({ textScale: v })} info="Scales all text elements for easier viewing." />
              <Slider id="line-h" label="Line Height" value={settings.lineHeight} min={1.0} max={3.0} step={0.1} suffix="x" onChange={(v) => updateSettings({ lineHeight: v })} info="Vertical distance between lines of text." />
              <Slider id="word-s" label="Word Spacing" value={settings.wordSpacing} min={0} max={15} step={1} suffix="px" onChange={(v) => updateSettings({ wordSpacing: v })} info="Adjusts horizontal distance between individual words." />
            </div>
          )}
        </section>

        {/* Vision Section */}
        <section className="space-y-6">
          <SectionHeader id="vision" label="Vision Filtering" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} toggleSection={toggleSection} isOpen={openSections.vision} />
          {openSections.vision && (
            <div className="space-y-4 animate-fadeIn">
              <Toggle id="h-contrast" label="High Contrast" value={settings.contrast === 'high'} onChange={() => updateSettings({ contrast: settings.contrast === 'high' ? 'standard' : 'high' })} info="Forces high contrast (White on Black) for maximum clarity." />
              <Toggle id="monochrome" label="Monochrome" value={settings.contrast === 'monochrome'} onChange={() => updateSettings({ contrast: settings.contrast === 'monochrome' ? 'standard' : 'monochrome' })} info="Removes all color data, rendering the app in grayscale." />
              <div className="py-4 border-b border-[var(--border-main)]">
                <div className="flex items-center mb-3">
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.25em]">Color Deficiency</span>
                  <ControlInfo id="info-colorblind" text="SVG filters to compensate for various types of color blindness." />
                </div>
                <select
                  value={settings.colorBlindMode}
                  onChange={(e) => updateSettings({ colorBlindMode: e.target.value as any })}
                  className="w-full bg-[var(--bg-panel)] border-2 border-[var(--border-main)] rounded-2xl p-4 text-xs font-black outline-none appearance-none cursor-pointer"
                  style={{ backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%2394a3b8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 8l4 4 4-4"/></svg>')`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="none">Standard (Off)</option>
                  <option value="protanopia">Protanopia</option>
                  <option value="deuteranopia">Deuteranopia</option>
                  <option value="tritanopia">Tritanopia</option>
                </select>
              </div>
              <Toggle id="cursor" label="Large Cursor" value={settings.customCursor} onChange={() => updateSettings({ customCursor: !settings.customCursor })} info="Enlarged, theme-colored ring around the mouse cursor." />
            </div>
          )}
        </section>

        {/* Navigation Section */}
        <section className="space-y-6">
          <SectionHeader id="navigation" label="Navigation Settings" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>} toggleSection={toggleSection} isOpen={openSections.navigation} />
          {openSections.navigation && (
            <div className="space-y-4 animate-fadeIn">
              <Toggle id="focus-ring" label="Focus Ring" value={settings.focusRing} onChange={() => updateSettings({ focusRing: !settings.focusRing })} info="Thick theme-colored ring around all focused elements." />
              <Toggle id="links" label="Force Underlines" value={settings.underlineLinks} onChange={() => updateSettings({ underlineLinks: !settings.underlineLinks })} info="Persistent underlines on all navigation and text links." />
              <Toggle id="motion" label="Stop Motion" value={settings.reduceMotion} onChange={() => updateSettings({ reduceMotion: !settings.reduceMotion })} info="Disables all transitions and animations to prevent nausea." />
              <Toggle id="targets" label="Large Hit-Areas" value={settings.largeTargets} onChange={() => updateSettings({ largeTargets: !settings.largeTargets })} info="Increases the clickable surface area for buttons and icons." />
              <Slider id="zoom-v" label="Interface Zoom" value={settings.zoomLevel} min={0.8} max={1.4} step={0.05} suffix="x" onChange={(v) => updateSettings({ zoomLevel: v })} info="Enlarges the entire app interface." />
            </div>
          )}
        </section>
      </div>

      <div className="pt-24 border-t border-[var(--border-main)] flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <div className="w-12 h-1.5 rounded-full bg-[var(--primary)]"></div>
          <div className="w-12 h-1.5 rounded-full bg-[var(--secondary)]"></div>
          <div className="w-12 h-1.5 rounded-full bg-[var(--primary-light)]"></div>
        </div>
        <div className="max-w-2xl text-center space-y-4">
          <p className="text-lg font-medium text-[var(--text-main)] italic leading-relaxed">
            "I understood the importance of accessibility from my colleagues at ZohoDesk, while we were preparing for WCAG compliance. And I'm so grateful to learn about it."
          </p>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ id, label, icon, toggleSection, isOpen }: { id: string, label: string, icon: React.ReactNode, toggleSection: (id: string) => void, isOpen: boolean }) => (
  <button
    onClick={() => toggleSection(id)}
    className={`flex items-center justify-between w-full py-4 border-b transition-colors group text-left no-underline ${isOpen ? 'border-[var(--primary)]' : 'border-[var(--border-main)] hover:border-[var(--text-muted)]'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-2xl transition-all ${isOpen ? 'bg-[var(--primary)] text-white shadow-lg' : 'bg-[var(--bg-panel)] text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>{icon}</div>
      <h3 className={`text-base font-black uppercase tracking-[0.15em] transition-colors ${isOpen ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>{label}</h3>
    </div>
    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[var(--primary-light)] rotate-180' : 'bg-[var(--bg-panel)]'}`}>
      <svg className={`w-5 h-5 transition-colors ${isOpen ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </button>
);

export default Accessibility;
