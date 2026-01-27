import React, { useState } from 'react';

type StringifyJsonProps = {};

const StringifyJson: React.FC<StringifyJsonProps> = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleStringify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(JSON.stringify(parsed)));
      setError('');
    } catch (e) {
      setError('Invalid JSON input');
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
      <div className="flex flex-col space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="flex-1 bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-2xl p-6 font-mono text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none resize-none transition-all shadow-inner text-[var(--text-main)]"
        />
      </div>
      <div className="flex flex-col space-y-2 mt-12">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Output</label>
        <div className={`flex-1 border rounded-2xl p-6 font-mono text-sm overflow-auto whitespace-pre transition-all shadow-sm ${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-700'}`}>
          {error || output || 'Stringified JSON will appear here...'}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handleStringify}
          className="absolute top-4 right-4 px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors shadow-md shadow-[var(--primary-light)]"
        >
          Stringify JSON
        </button>
      </div>
    </div>
  );
};

export default StringifyJson;
