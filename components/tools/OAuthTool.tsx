import React, { useState, useEffect, useRef } from 'react';

const OAuthTool: React.FC = () => {
  const [serverType, setServerType] = useState<'production' | 'local' | 'development'>('production');
  const [clientID, setClientID] = useState('');
  const [scope, setScope] = useState('AaaServer.profile.READ');
  const [redirectURL, setRedirectURL] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [scopeHistory, setScopeHistory] = useState<string[]>([]);
  const [error, setError] = useState('');
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    initializeOAuthState();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateAuthenticationCode = () => {
    let sc = scope.trim();
    if (sc.endsWith(',')) sc = sc.slice(0, -1);
    if (sc.indexOf(' ') !== -1) {
      setError('Remove the spaces in scope');
      return;
    }
    if (!clientID || !redirectURL) {
      setError('Provide client ID and redirect URL');
      return;
    }
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
    if (serverType === 'production')
      url = `https://accounts.zoho.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(
        clientID
      )}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;
    else if (serverType === 'local')
      url = `https://accounts.localzoho.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(
        clientID
      )}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;
    else
      url = `https://accounts.csez.zohocorpin.com/oauth/v2/auth?response_type=token&client_id=${encodeURIComponent(
        clientID
      )}&scope=${encodeURIComponent(sc)}&redirect_uri=${encodeURIComponent(redirectURL)}`;

    const authorizationWindow = window.open(url, '_blank');
    if (!authorizationWindow) {
      setError('Popup blocked');
      return;
    }

    intervalRef.current = window.setInterval(() => {
      try {
        const hash_data = (authorizationWindow as Window).location.hash;
        if (hash_data) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          try {
            authorizationWindow.close();
          } catch (e) {}
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
      try {
        authorizationWindow.close();
      } catch (e) {}
      setError('Authorization timed out');
    }, 50000);
  };

  const clearHistory = () => {
    localStorage.clear();
    setScopeHistory([]);
    setClientID('');
    setScope('');
    setRedirectURL('');
    setAccessCode('');
  };

  const loadScopeFromHistory = (s: string) => {
    setScope(s);
  };

  return (
    <div className="space-y-6 bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="text-sm font-semibold">Server</div>
          <div className="flex gap-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="serverType"
                checked={serverType === 'production'}
                onChange={() => setServerType('production')}
                className="mr-2"
              />
              Production
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="serverType"
                checked={serverType === 'local'}
                onChange={() => setServerType('local')}
                className="mr-2"
              />
              Local
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="serverType"
                checked={serverType === 'development'}
                onChange={() => setServerType('development')}
                className="mr-2"
              />
              Development
            </label>
          </div>

          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Client ID</label>
          <input
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
            placeholder="Client ID"
            className="w-full p-3 rounded-lg border border-gray-200"
          />

          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Scope</label>
          <div className="flex gap-2">
            <input
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="scope1,scope2"
              className="flex-1 p-3 rounded-lg border border-gray-200"
            />
            <button
              onClick={() => {
                if (scopeHistory.length) setScope(scopeHistory[scopeHistory.length - 1]);
              }}
              className="px-3 bg-gray-100 rounded-lg"
            >
              Last
            </button>
          </div>

          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Redirect URL</label>
          <input
            value={redirectURL}
            onChange={(e) => setRedirectURL(e.target.value)}
            placeholder="https://your.redirect.url/callback"
            className="w-full p-3 rounded-lg border border-gray-200"
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => generateAuthenticationCode()}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
            >
              Generate
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(accessCode);
              }}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              Copy Token
            </button>
            <button
              onClick={() => clearHistory()}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg"
            >
              Clear History
            </button>
          </div>
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold">Access Token</div>
          <textarea
            value={accessCode}
            readOnly
            placeholder="Access token will appear here"
            className="w-full h-40 p-3 rounded-lg border border-gray-200 font-mono"
          />

          <div>
            <div className="text-sm font-semibold">Scope History</div>
            <div className="flex gap-2 mt-2">
              <select
                onChange={(e) => loadScopeFromHistory(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              >
                <option value="">-- select previous scope --</option>
                {scopeHistory.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setScopeHistory([]);
                  localStorage.removeItem('scopeHistory');
                }}
                className="px-3 bg-gray-100 rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthTool;
