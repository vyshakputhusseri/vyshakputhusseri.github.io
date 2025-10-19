import React from 'react';

interface HomeProps {
  setActiveView: (view: { main: string; sub?: string }) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveView }) => {
  return (
    <section id="home" className="h-full flex flex-col items-center justify-center p-6 text-center">
        <img 
          src="https://picsum.photos/seed/portfolio-dev/150/150" 
          alt="Profile" 
          className="w-40 h-40 rounded-full border-4 border-sky-400 shadow-lg mb-6"
        />
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-2">
          Hi, I'm <span className="text-sky-500 dark:text-sky-400">Vyshak Puthusseri</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-300 mb-4">
          Product Security at Zoho
        </h2>

        {/* Dual Role Highlight */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
            Blue Team Defender
          </span>
        </div>

        <p className="max-w-3xl text-lg text-slate-500 dark:text-slate-400 mb-8">
          Just an average human, wandering through uncertainty in silence. I listen more than I speak, but in every quiet moment, I find something worth understanding.
        </p>
        <a
          href="#contact"
          className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            setActiveView({ main: 'contact' });
          }}
        >
          Contact Me
        </a>
    </section>
  );
};

export default Home;