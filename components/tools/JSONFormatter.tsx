import React, { useState, useEffect } from 'react';

const JSON_FORMATTER_STORAGE_KEY = 'jsonFormatterInput';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState(() => localStorage.getItem(JSON_FORMATTER_STORAGE_KEY) || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(JSON_FORMATTER_STORAGE_KEY, input);
  }, [input]);

  useEffect(() => {
    if (input.trim() === '') {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e: any) {
      setOutput('');
      setError(`Invalid JSON: ${e.message}`);
    }
  }, [input]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-12">
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
          JSON Formatter
      </h2>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="json-input" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Input JSON
            </label>
            <textarea
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here...'
              className="w-full h-full flex-grow p-3 font-mono text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              spellCheck="false"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="json-output" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Formatted JSON
              </label>
              <button
                onClick={handleCopy}
                disabled={!output || !!error}
                className="px-3 py-1 text-xs font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition"
              >
                Copy
              </button>
            </div>
            <pre className="w-full h-full flex-grow p-3 font-mono text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md overflow-auto relative">
              {error ? (
                <code className="text-red-500">{error}</code>
              ) : (
                <code className="text-slate-800 dark:text-slate-200">{output}</code>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;