import React, { useState } from 'react';
import JsonFormatter from './tools/JsonFormatter';
import StringifyJson from './tools/StringifyJson';
import DestringifyJson from './tools/DestringifyJson';
import OAuthTool from './tools/OAuthTool';

type ToolType = 'JSON Formatter' | 'Stringify JSON' | 'De-stringify JSON' | 'DDoS Simulator' | 'Zoho OAuth';

interface ToolPanelProps {
  activeTool: ToolType;
}

const Tools: React.FC<ToolPanelProps> = ({ activeTool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  // Zoho OAuth states
  const [serverType, setServerType] = useState<'production'|'local'|'development'>('production');
  const [clientID, setClientID] = useState('');
  const [scope, setScope] = useState('AaaServer.profile.READ');
  const [redirectURL, setRedirectURL] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [scopeHistory, setScopeHistory] = useState<string[]>([]);
  const intervalRef = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);

  const renderSimulator = () => (
    <div className="space-y-6">
      <div className="p-8 bg-black rounded-2xl relative overflow-hidden h-64 flex items-center justify-center border border-gray-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="text-center space-y-4 z-10">
          <div className="text-red-500 font-mono text-xl animate-pulse">SYSTEM UNDER LOAD: 0.0%</div>
          <div className="flex gap-1 justify-center">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-12 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Traffic Analysis Visualization</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Incoming PPS</div>
          <div className="text-xl font-bold">0</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Blocked IPs</div>
          <div className="text-xl font-bold">412</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Status</div>
          <div className="text-xl font-bold text-green-500">SECURE</div>
        </div>
      </div>
    </div>
  );

  const initializeOAuthState = () => {
    try {
      const sc = localStorage.getItem('scopeHistory');
      if (sc) {
        const arr = sc.split(';').filter(Boolean);
        setScopeHistory(arr);
      }
      const prod = localStorage.getItem('productionClientID');
      const local = localStorage.getItem('localClientID');
      const dev = localStorage.getItem('developmentClientID');
      const lastScope = localStorage.getItem('lastUsedScope');
      const redirect = localStorage.getItem('redirectURL');
      const storedAccess = localStorage.getItem('access_code');
      if (prod) setClientID(prod);
      else if (local) setClientID(local);
      else if (dev) setClientID(dev);
      if (lastScope) setScope(lastScope);
      if (redirect) setRedirectURL(redirect);
      if (storedAccess) setAccessCode(storedAccess);
    } catch (e) {
      // ignore
    }
  };

  React.useEffect(() => {
    initializeOAuthState();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = async (str: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(str); return true; } catch (e) { }
    }
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(el);
    return true;
  };

  const clearHistory = () => {
    localStorage.clear();
    setScopeHistory([]);
    setClientID('');
    setScope('');
    setRedirectURL('');
    setAccessCode('');
  };

  const changeClientIDBasedOnServer = (stype: typeof serverType) => {
    setServerType(stype);
    if (stype === 'production') {
      const v = localStorage.getItem('productionClientID');
      if (v) setClientID(v);
      else setClientID('');
    } else if (stype === 'local') {
      const v = localStorage.getItem('localClientID');
      if (v) setClientID(v);
      else setClientID('');
    } else {
      const v = localStorage.getItem('developmentClientID');
      if (v) setClientID(v);
      else setClientID('');
    }
  };

  const generateAuthenticationCode = () => {
    let sc = scope.trim();
    if (sc.endsWith(',')) sc = sc.slice(0, -1);
    if (sc.indexOf(' ') !== -1) { setError('Remove the spaces in scope'); return; }
    if (!clientID || !redirectURL) { setError('Provide client ID and redirect URL'); return; }
    // persist
    localStorage.setItem('redirectURL', redirectURL);
    localStorage.setItem('lastUsedScope', sc);
    if (!scopeHistory.includes(sc)) {
      const next = [...scopeHistory, sc];
      setScopeHistory(next);
      localStorage.setItem('scopeHistory', next.join(';') + ';');
    }

    if (serverType === 'production') {
      localStorage.setItem('productionClientID', clientID);
    } else if (serverType === 'local') {
      localStorage.setItem('localClientID', clientID);
    } else {
      localStorage.setItem('developmentClientID', clientID);
    }

    let url = '';
    if (serverType === 'production') url = `https://accounts.zoho.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(clientID)}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;
    else if (serverType === 'local') url = `https://accounts.localzoho.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(clientID)}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;
    else url = `https://accounts.csez.zohocorpin.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(clientID)}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;

    const authorizationWindow = window.open(url, '_blank');
    if (!authorizationWindow) { setError('Popup blocked'); return; }

    intervalRef.current = window.setInterval(() => {
      try {
        const hash_data = (authorizationWindow as Window).location.hash;
        if (hash_data) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          try { authorizationWindow.close(); } catch (e) {}
          const match = hash_data.match('[#&]access_token=*[^&]*');
          if (match && match[0]) {
            const access_token = match[0].split('=')[1];
            setAccessCode(access_token);
            localStorage.setItem('access_code', access_token);
            setError('');
          } else {
            setError('No access_token found in redirect');
          }
        }
      } catch (e) {
        // cross-origin until redirected back to allowed redirect URL
      }
    }, 1000);

    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      try { authorizationWindow.close(); } catch (e) {}
      setError('Authorization timed out');
    }, 50000);
  };

  const loadScopeFromHistory = (s: string) => { setScope(s); };

  const handleStringify = () => {
    // Add your stringify logic here
    console.log('Stringify button clicked');
  };

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{activeTool}</h2>
          <p className="text-gray-500">Utility for security researchers and developers.</p>
        </div>
      </div>

      {activeTool === 'JSON Formatter' && <JsonFormatter />}
      {activeTool === 'Stringify JSON' && <StringifyJson />}
      {activeTool === 'De-stringify JSON' && <DestringifyJson />}
      {activeTool === 'DDoS Simulator' && renderSimulator()}
      {activeTool === 'Zoho OAuth' && <OAuthTool />}
    </div>
  );
};

export default Tools;
