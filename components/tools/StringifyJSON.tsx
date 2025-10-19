import React, { useState, useEffect } from 'react';

const STRINGIFY_JSON_STORAGE_KEY = 'stringifyJsonInput';

const StringifyJSON: React.FC = () => {
  const [input, setInput] = useState(() => localStorage.getItem(STRINGIFY_JSON_STORAGE_KEY) || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(STRINGIFY_JSON_STORAGE_KEY, input);
  }, [input]);

  const handleStringify = () => {
    if (input.trim() === '') {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const stringified = JSON.stringify(parsed);
      setOutput(stringified);
      setError('');
    } catch (e: any) {
      setOutput('');
      setError(`Invalid JSON input: ${e.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-12">
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Stringify (Minify) JSON
      </h2>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col space-y-4 flex-grow">
          <div className="flex flex-col flex-grow">
            <label htmlFor="stringify-input" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Input Pretty-Printed JSON
            </label>
            <textarea
              id="stringify-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`{\n  "key": "value"\n}`}
              className="w-full h-full flex-grow p-3 font-mono text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              spellCheck="false"
            />
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleStringify}
              className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 transition"
            >
              Minify / Compact
            </button>
          </div>

          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="stringify-output" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Compacted JSON String
              </label>
              <button
                onClick={handleCopy}
                disabled={!output || !!error}
                className="px-3 py-1 text-xs font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition"
              >
                Copy
              </button>
            </div>
            <textarea
              id="stringify-output"
              value={error || output}
              readOnly
              className={`w-full h-full flex-grow p-3 font-mono text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md transition ${error ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'}`}
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringifyJSON;