
import React, { useState } from 'react';

type ToolType = 'JSON Formatter' | 'Stringify JSON' | 'De-stringify JSON' | 'DDoS Simulator';

interface ToolPanelProps {
  activeTool: ToolType;
}

const Tools: React.FC<ToolPanelProps> = ({ activeTool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleJsonFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON input');
    }
  };

  const handleStringify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(JSON.stringify(parsed)));
      setError('');
    } catch (e) {
      setError('Invalid JSON input');
    }
  };

  const handleDestringify = () => {
    try {
      // Remove surrounding quotes if present and unescape
      const unquoted = input.trim().replace(/^"|"$/g, '').replace(/\\"/g, '"');
      const parsed = JSON.parse(unquoted);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid Stringified JSON');
    }
  };

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

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{activeTool}</h2>
          <p className="text-gray-500">Utility for security researchers and developers.</p>
        </div>
        <div className="flex gap-2">
          {activeTool !== 'DDoS Simulator' && (
            <button 
              onClick={() => {
                if(activeTool === 'JSON Formatter') handleJsonFormat();
                if(activeTool === 'Stringify JSON') handleStringify();
                if(activeTool === 'De-stringify JSON') handleDestringify();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10"
            >
              Process
            </button>
          )}
          <button 
            onClick={() => { setInput(''); setOutput(''); setError(''); }}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {activeTool === 'DDoS Simulator' ? renderSimulator() : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your data here..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all shadow-inner"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Output</label>
            <div className={`flex-1 border rounded-2xl p-6 font-mono text-sm overflow-auto whitespace-pre transition-all shadow-sm ${error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-700'}`}>
              {error || output || 'Processed results will appear here...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
