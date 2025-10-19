import React, { useState, useEffect } from 'react';

const DESTRINGIFY_JSON_STORAGE_KEY = 'destringifyJsonInput';

const DestringifyJSON: React.FC = () => {
  const [input, setInput] = useState(() => localStorage.getItem(DESTRINGIFY_JSON_STORAGE_KEY) || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(DESTRINGIFY_JSON_STORAGE_KEY, input);
  }, [input]);

  const handleDestringify = () => {
    if (input.trim() === '') {
      setOutput('');
      setError('');
      return;
    }

    try {
      // First parse: get the raw string from the JSON string literal
      const rawString = JSON.parse(input);
      // Second parse: parse the raw string into a JSON object
      if (typeof rawString !== 'string') {
        throw new Error('Input is valid JSON, but not a string literal containing JSON. Try JSON Formatter.');
      }
      const parsedObject = JSON.parse(rawString);
      // Format it for display
      const formatted = JSON.stringify(parsedObject, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e: any) {
      setOutput('');
      setError(`Error: ${e.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-12">
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
          De-stringify JSON
      </h2>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col space-y-4 flex-grow">
          <div className="flex flex-col flex-grow">
            <label htmlFor="destringify-input" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Input String Containing JSON
            </label>
            <textarea
              id="destringify-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='"{\\"key\\":\\"value\\"}"'
              className="w-full h-full flex-grow p-3 font-mono text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              spellCheck="false"
            />
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleDestringify}
              className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-600 transition"
            >
              Parse and Format
            </button>
          </div>

          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="destringify-output" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Formatted JSON Output
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

export default DestringifyJSON;