import React, { useState, useEffect, useCallback } from 'react';
import JsonFormatter from './tools/JsonFormatter';
import StringifyJson from './tools/StringifyJson';
import DestringifyJson from './tools/DestringifyJson';

type ToolType = 'JSON Formatter' | 'Stringify JSON' | 'De-stringify JSON' | 'DDoS Simulator' | 'Zoho OAuth';

interface ToolPanelProps {
  activeTool: ToolType;
}

const TOOL_DESCRIPTIONS: Record<string, string> = {
  'JSON Formatter': 'Beautify and format raw JSON data with proper indentation.',
  'Stringify JSON': 'Convert JSON objects into escaped string format.',
  'De-stringify JSON': 'Parse stringified JSON back into readable format.',
  'DDoS Simulator': 'Traffic analysis visualization tool.',
  'Zoho OAuth': 'Generate and manage Zoho OAuth access tokens.',
};

const Tools: React.FC<ToolPanelProps> = ({ activeTool }) => {

  const renderSimulator = () => (
    <div className="space-y-6">
      <div className="p-8 bg-[var(--bg-panel)] rounded-2xl relative overflow-hidden h-64 flex items-center justify-center border border-[var(--border-main)]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true"></div>
        <div className="text-center space-y-4 z-10">
          <div className="text-red-500 font-mono text-xl animate-pulse">SYSTEM UNDER LOAD: 0.0%</div>
          <div className="flex gap-1 justify-center" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-12 bg-[var(--primary)] opacity-20 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <p className="text-[var(--text-muted)] text-sm font-mono uppercase tracking-widest">Traffic Analysis Visualization</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-[var(--bg-panel)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Incoming PPS</div>
          <div className="text-xl font-bold text-[var(--text-main)]">0</div>
        </div>
        <div className="p-4 bg-[var(--bg-panel)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Blocked IPs</div>
          <div className="text-xl font-bold text-[var(--text-main)]">412</div>
        </div>
        <div className="p-4 bg-[var(--bg-panel)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Status</div>
          <div className="text-xl font-bold text-green-500">SECURE</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)]">{activeTool}</h2>
          <p className="text-[var(--text-muted)]">{TOOL_DESCRIPTIONS[activeTool] || 'Utility for security researchers and developers.'}</p>
        </div>
      </div>

      {activeTool === 'JSON Formatter' && <JsonFormatter />}
      {activeTool === 'Stringify JSON' && <StringifyJson />}
      {activeTool === 'De-stringify JSON' && <DestringifyJson />}
      {activeTool === 'DDoS Simulator' && renderSimulator()}
      {activeTool === 'Zoho OAuth' && <ZohoOAuthLauncher />}
    </div>
  );
};

/** Launches the standalone Zoho-OAuth page and listens for the token via shared localStorage (same origin on GitHub Pages) */
const ZohoOAuthLauncher: React.FC = () => {
  const OAUTH_URL = 'https://vyshakputhusseri.github.io/Zoho-OAuth/';
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('access_code') || '');
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const refreshToken = useCallback(() => {
    const token = localStorage.getItem('access_code') || '';
    if (token !== accessToken) {
      setAccessToken(token);
      if (token) setIsOpen(false);
    }
  }, [accessToken]);

  // storage event fires when another tab/window on the same origin writes to localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_code' && e.newValue) {
        setAccessToken(e.newValue);
        setIsOpen(false);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Re-check when user switches back to this tab
  useEffect(() => {
    const onFocus = () => refreshToken();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refreshToken();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [refreshToken]);

  // Poll while the OAuth window is open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => refreshToken(), 1500);
    return () => clearInterval(interval);
  }, [isOpen, refreshToken]);

  const handleLaunch = useCallback(() => {
    setIsOpen(true);
    window.open(OAUTH_URL, 'zoho-oauth', 'width=700,height=600,scrollbars=yes,resizable=yes');
  }, []);

  const handleCopy = useCallback(() => {
    if (!accessToken) return;
    navigator.clipboard.writeText(accessToken).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [accessToken]);

  return (
    <div className="space-y-8 animate-slideUp">
      {/* Launcher card */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-3xl p-8 md:p-10 space-y-6">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] shrink-0">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[var(--text-main)]">Zoho OAuth Token Generator</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Opens your dedicated OAuth tool in a new window. Configure the client ID, scope and server type there.
              Once a token is generated, it will automatically appear below.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLaunch}
            className="px-8 py-3.5 bg-[var(--primary)] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3"
            aria-label="Open Zoho OAuth tool in new window"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {isOpen ? 'Launched — Waiting for token...' : 'Launch OAuth Tool'}
          </button>

          <a
            href={OAUTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-main)] rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2"
          >
            Open in Tab
          </a>
        </div>

        {isOpen && (
          <div className="flex items-center gap-3 text-sm text-[var(--primary)] animate-fadeIn">
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" aria-hidden="true"></span>
            <span className="font-medium">OAuth window is open — generate a token and it will appear here automatically</span>
          </div>
        )}
      </div>

      {/* Token display */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-3xl p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${accessToken ? 'bg-green-500' : 'bg-[var(--border-main)]'}`} aria-hidden="true"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-muted)]">Access Token</h4>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshToken}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-main)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              title="Check for new token"
            >
              ↻ Refresh
            </button>
            {accessToken && (
              <button
                onClick={handleCopy}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--border-main)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
        <div className="bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl p-5 font-mono text-sm break-all min-h-[80px] flex items-center">
          {accessToken ? (
            <span className="text-[var(--text-main)]">{accessToken}</span>
          ) : (
            <span className="text-[var(--text-muted)] opacity-50 italic">No token yet — launch the OAuth tool to generate one</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
