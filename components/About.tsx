import React from 'react';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
          About Me
        </h2>
        <div className="text-lg text-slate-600 dark:text-slate-400 text-center leading-relaxed">
          <p className="mb-6">
            Hello! I'm a passionate Software Developer currently contributing to innovative projects at Zoho. With a strong foundation in modern web technologies, I specialize in building dynamic and responsive user interfaces with React and TypeScript.
          </p>
          <p>
            My journey in software development is driven by a constant desire to learn and adapt. I thrive in collaborative environments and enjoy tackling challenges that push me to grow my technical expertise. When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">My Skills</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-lg w-32 h-32 justify-center transition-transform transform hover:-translate-y-2 shadow-md hover:shadow-xl hover:shadow-sky-500/20">
                {skill.icon}
                <span className="mt-3 text-sm font-medium text-slate-800 dark:text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;