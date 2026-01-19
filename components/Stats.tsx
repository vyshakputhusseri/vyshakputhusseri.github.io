
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GitHubProfile, PortfolioInsights } from '../types';

interface StatsProps {
  profile: GitHubProfile;
  insights: PortfolioInsights | null;
}

const Stats: React.FC<StatsProps> = ({ profile, insights }) => {
  const chartData = insights?.techStackAnalysis.map(tech => ({
    subject: tech.language,
    A: tech.proficiency.includes('Advanced') ? 100 : tech.proficiency.includes('Intermediate') ? 70 : 40,
    fullMark: 150,
  })) || [
      { subject: 'Security', A: 95, fullMark: 100 },
      { subject: 'Backend', A: 85, fullMark: 100 },
      { subject: 'Frontend', A: 75, fullMark: 100 },
      { subject: 'DevOps', A: 70, fullMark: 100 },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900">Developer Metrics</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="text-4xl font-black text-blue-500">{profile.public_repos}</div>
            <div className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Repositories</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="text-4xl font-black text-purple-500">{profile.followers}</div>
            <div className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Followers</div>
          </div>
        </div>
        
        <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-400 mb-4 uppercase tracking-widest">Core Strengths</h4>
          <div className="flex flex-wrap gap-3">
            {(insights?.keyStrengths || ['Penetration Testing', 'Cloud Security', 'Threat Modeling']).map((strength, i) => (
              <span key={i} className="px-4 py-2 bg-white text-blue-600 border border-blue-100 rounded-xl text-sm font-semibold shadow-sm">
                {strength}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-8">Skill Proficiency</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="#0ea5e9"
                strokeWidth={3}
                fill="#0ea5e9"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Stats;
