import React, { useState } from 'react';
import JSONFormatter from './tools/JSONFormatter';
import StringifyJSON from './tools/StringifyJSON';
import DestringifyJSON from './tools/DestringifyJSON';

interface Tool {
  id: string;
  label: string;
  component: React.ReactElement;
}

const tools: Tool[] = [
  { id: 'json-formatter', label: 'JSON Formatter', component: <JSONFormatter /> },
  { id: 'stringify', label: 'Stringify JSON', component: <StringifyJSON /> },
  { id: 'destringify', label: 'De-stringify JSON', component: <DestringifyJSON /> },
];

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState(tools[0].id);

  const ActiveToolComponent = tools.find(tool => tool.id === activeTool)?.component;

  return (
    <section id="tools" className="p-6 md:p-12 h-full flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col">
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Developer Tools
        </h2>

        {/* Sub-navigation tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`${
                  activeTool === tool.id
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:border-slate-300 dark:hover:text-slate-300 dark:hover:border-slate-500'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                aria-current={activeTool === tool.id ? 'page' : undefined}
              >
                {tool.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Tool Content */}
        <div className="flex-grow">
            {ActiveToolComponent}
        </div>
      </div>
    </section>
  );
};

export default Tools;
