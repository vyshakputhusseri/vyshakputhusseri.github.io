import React, { useState } from 'react';
import PeekView from './PeekView';

interface TimelineItemProps {
    id: string;
    title: string;
    subtitle: string;
    date?: string;
    preview: string;
    icon?: string;
    onOpenPeek: (id: string) => void;
}

interface ExpandableCardProps {
    title: string;
    subtitle: string;
    icon: string;
    children: React.ReactNode;
}

const AboutMe: React.FC = () => {
    const [peekState, setPeekState] = useState<{ isOpen: boolean; id: string | null; title: string, content: React.ReactNode }>({
        isOpen: false,
        id: null,
        title: '',
        content: null
    });

    const openPeek = (id: string, title: string, content: React.ReactNode) => {
        setPeekState({ isOpen: true, id, title, content });
    };

    const closePeek = () => {
        setPeekState(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="py-24 space-y-20 animate-fadeIn max-w-4xl relative pb-64">

            {/* About Me Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">👨‍💻</span>
                    <h2 className="text-5xl font-black tracking-tighter text-[var(--text-main)]">About Me</h2>
                </div>
                <div className="text-xl text-[var(--text-muted)] leading-relaxed font-medium space-y-6 bg-[var(--bg-panel)] p-8 rounded-3xl border border-gray-100/10 shadow-sm">
                    <p>
                        I am a software engineer driven by a deep curiosity for how complex systems work and a desire to build tools that solve real-world problems. My approach to technology is rooted in a strong mathematical foundation and a love for continuous learning.
                    </p>
                    {/* <p>
                        I enjoy the challenge of turning abstract ideas into functional, secure, and efficient code.
                    </p> */}
                </div>
            </section>

            <div className="space-y-24">

                {/* Experience Section */}
                <div id="experience" className="scroll-mt-24 space-y-10">
                    <div className="flex items-center gap-3 border-b border-gray-200/20 pb-4">
                        <span className="text-2xl">🛠</span>
                        <h3 className="text-3xl font-black tracking-tight">Experience</h3>
                    </div>

                    <div className="space-y-12 border-l-2 border-[var(--border-main)] pl-8 ml-3 relative">
                        <TimelineItem
                            id="exp-1"
                            title="Member Technical Staff"
                            subtitle="Zoho"
                            date="March 2021 – Ongoing"
                            icon="💼"
                            preview="Building robust backend systems and security protocols."
                            onOpenPeek={() => openPeek(
                                'exp-1',
                                'Member Technical Staff',
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-2xl">💼</div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[var(--text-main)]">Zoho Corporation</h3>
                                                <p className="text-[var(--text-muted)]">Chennai, India</p>
                                            </div>
                                        </div>
                                        <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-black uppercase rounded-full tracking-wider">
                                            March 2021 – Present
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-[var(--text-main)] border-b border-[var(--border-main)] pb-2">Overview</h4>
                                        <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                                            With a focus on building robust backend systems, I have spent my career developing tools that handle data at scale. My work has spanned from creating analytics dashboards for API usage to creating security protocols and red team activities.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-[var(--text-main)] border-b border-[var(--border-main)] pb-2">Key Competencies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge>Python</Badge>
                                            <Badge>Java</Badge>
                                            <Badge>SQL</Badge>
                                            <Badge>Kafka</Badge>
                                            <Badge>Redis</Badge>
                                            <Badge>Security Protocols</Badge>
                                            <Badge>System Design</Badge>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Education Section */}
                <div id="education" className="scroll-mt-24 space-y-10">
                    <div className="flex items-center gap-3 border-b border-gray-200/20 pb-4">
                        <span className="text-2xl">🎓</span>
                        <h3 className="text-3xl font-black tracking-tight">Education</h3>
                    </div>

                    <div className="space-y-16 border-l-2 border-[var(--border-main)] pl-8 ml-3 relative">
                        <TimelineItem
                            id="edu-1"
                            title="Master of Computer Application (MCA)"
                            subtitle="College of Engineering Trivandrum (KTU)"
                            date="2017 - 2020"
                            icon="🏫"
                            preview="Class Topper."
                            onOpenPeek={() => openPeek(
                                'edu-1',
                                'Master of Computer Application',
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-2xl">🏫</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--text-main)]">College of Engineering Trivandrum (KTU)</h3>
                                            <p className="text-[var(--text-muted)]">Kerala, India</p>
                                        </div>
                                    </div>

                                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-main)]">
                                        <div className="text-sm font-black uppercase text-[var(--text-muted)] tracking-widest mb-2">Performance</div>
                                        <div className="text-3xl font-black text-[var(--primary)] mb-1">8.77 <span className="text-lg text-[var(--text-muted)] font-bold">/ 10.0</span></div>
                                        <div className="text-[var(--text-main)] font-medium">Class Topper</div>
                                    </div>

                                    {/* <p className="text-[var(--text-muted)] leading-relaxed">
                                        Specialized in Advanced Computing, Data Structures, and Algorithms. Demonstrated consistent academic excellence and leadership in technical symposiums.
                                    </p> */}
                                </div>
                            )}
                        />

                        <TimelineItem
                            id="edu-2"
                            title="B.S. in Computer Science"
                            subtitle="MG College (Kannur University)"
                            date="2014 - 2017"
                            icon="🎓"
                            preview="Graduated with Distinction."
                            onOpenPeek={() => openPeek(
                                'edu-2',
                                'B.S. in Computer Science',
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-2xl">🎓</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--text-main)]">MG College (Kannur University)</h3>
                                            <p className="text-[var(--text-muted)]">Kannur, Kerala</p>
                                        </div>
                                    </div>

                                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-main)]">
                                        <div className="text-sm font-black uppercase text-[var(--text-muted)] tracking-widest mb-2">Score</div>
                                        <div className="text-3xl font-black text-[var(--primary)] mb-1">84.72%</div>
                                        <div className="text-[var(--text-main)] font-medium">Distinction</div>
                                    </div>
                                </div>
                            )}
                        />

                        <TimelineItem
                            id="edu-3"
                            title="Higher Secondary Education"
                            subtitle="Kerala HSE"
                            date="2012 - 2014"
                            icon="📚"
                            preview="Academic Excellence."
                            onOpenPeek={() => openPeek(
                                'edu-3',
                                'Higher Secondary Education',
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-2xl">📚</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[var(--text-main)]">Kerala HSE</h3>
                                            <p className="text-[var(--text-muted)]">Computer Science Stream</p>
                                        </div>
                                    </div>

                                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-main)]">
                                        <div className="text-sm font-black uppercase text-[var(--text-muted)] tracking-widest mb-2">Score</div>
                                        <div className="text-3xl font-black text-[var(--primary)] mb-1">95.75%</div>
                                        {/* <div className="text-[var(--text-main)] font-medium">Top 1%</div> */}
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Certifications Section */}
                <div id="certifications" className="scroll-mt-24 space-y-10">
                    <div className="flex items-center gap-3 border-b border-gray-200/20 pb-4">
                        <span className="text-2xl">📜</span>
                        <h3 className="text-3xl font-black tracking-tight">Certifications & Achievements</h3>
                    </div>

                    <div className="space-y-6">
                        <ExpandableCard
                            title="Neo4j Certified Professional"
                            subtitle="Expert in graph database management."
                            icon="📜"
                        >
                            <div className="space-y-4 pt-4">
                                <p className="text-[var(--text-muted)] leading-relaxed">
                                    Demonstrated expertise in Neo4j graph database management, Cypher query language optimization, and graph data modeling. Capable of designing efficient graph solutions for complex connected data problems.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge>Graph Modeling</Badge>
                                    <Badge>Cypher Query Language</Badge>
                                    <Badge>Graph Data Science</Badge>
                                    <Badge>Neo4j Administration</Badge>
                                </div>
                            </div>
                        </ExpandableCard>

                        <ExpandableCard
                            title="Deep Learning Specialization"
                            subtitle="Certified by DeepLearning.AI (Coursera) and Udacity."
                            icon="🧠"
                        >
                            <div className="space-y-4 pt-4">
                                <p className="text-[var(--text-muted)] leading-relaxed">
                                    Comprehensive training in neural networks, deep learning, structuring machine learning projects, and applying these algorithms to real-world problems.
                                </p>
                                <ul className="space-y-2 text-[var(--text-muted)] list-disc pl-5">
                                    <li>Neural Networks and Deep Learning</li>
                                    <li>Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization</li>
                                    <li>Structuring Machine Learning Projects</li>
                                    <li>Convolutional Neural Networks (CNNs)</li>
                                    <li>Sequence Models (RNNs, LSTMs)</li>
                                </ul>
                            </div>
                        </ExpandableCard>

                        <ExpandableCard
                            title="National Level Recognition"
                            subtitle="UGC NET Qualification (2019 & 2020)."
                            icon="🏆"
                        >
                            <div className="space-y-4 pt-4">
                                <p className="text-[var(--text-muted)] leading-relaxed">
                                    Qualified for UGC NET (Assistant Professor) in Computer Science twice. This is one of the most competitive exams in India for determining eligibility for Assistant Professor/Lectureship positions.
                                </p>
                                <div className="inline-block px-3 py-1 bg-[var(--bg-secondary)] text-[var(--primary)] text-sm font-bold rounded-lg border border-[var(--border-main)]">
                                    Assistant Professor Eligibility
                                </div>
                            </div>
                        </ExpandableCard>

                        <ExpandableCard
                            title="Additional Expertise"
                            subtitle="Continuous Learning in AI and Hardware."
                            icon="🚀"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-xl border border-[var(--border-main)] hover:border-[var(--primary)]/30 transition-colors bg-[var(--bg-secondary)]/50">
                                    <h4 className="font-bold text-[var(--text-main)]">Machine Learning</h4>
                                    <p className="text-sm text-[var(--text-muted)] mt-1">Foundation in predictive modeling and data analysis.</p>
                                </div>
                                <div className="p-4 rounded-xl border border-[var(--border-main)] hover:border-[var(--primary)]/30 transition-colors bg-[var(--bg-secondary)]/50">
                                    <h4 className="font-bold text-[var(--text-main)]">Programming in Python</h4>
                                    <p className="text-sm text-[var(--text-muted)] mt-1">NPTEL Certification demonstrating proficiency.</p>
                                </div>
                                <div className="p-4 rounded-xl border border-[var(--border-main)] hover:border-[var(--primary)]/30 transition-colors bg-[var(--bg-secondary)]/50">
                                    <h4 className="font-bold text-[var(--text-main)]">PC Hardware & Networking</h4>
                                    <p className="text-sm text-[var(--text-muted)] mt-1">Hardware troubleshooting and network configuration.</p>
                                </div>
                            </div>
                        </ExpandableCard>
                    </div>
                </div>
            </div>

            <PeekView
                isOpen={peekState.isOpen}
                onClose={closePeek}
                title={peekState.title}
            >
                {peekState.content}
            </PeekView>
        </div>
    );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ id, title, subtitle, date, preview, onOpenPeek }) => {

    return (
        <div className="relative group">
            <div
                className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 shadow-sm cursor-pointer z-10 bg-[var(--bg-main)] border-[var(--primary)] group-hover:scale-125 transition-transform duration-300"
                onClick={() => onOpenPeek(id)}
            />

            <div className="space-y-4 cursor-pointer transition-all hover:translate-x-2 duration-300" onClick={() => onOpenPeek(id)}>
                <div>
                    <h4 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">{title}</h4>
                    <div className="text-[var(--text-main)] font-medium opacity-80">{subtitle}</div>
                </div>

                <div className="text-[var(--text-muted)] text-sm font-medium pr-8 leading-relaxed max-w-xl line-clamp-2">{preview}</div>

                {date && <div className="text-xs font-black tracking-widest uppercase text-[var(--text-muted)] bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap w-fit">{date}</div>}
            </div>
        </div>
    );
};

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, subtitle, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[var(--bg-panel)] rounded-2xl border border-gray-100/5 overflow-hidden transition-all duration-300 hover:border-[var(--primary)]/30 shadow-sm">
            <div
                className="p-6 flex items-center justify-between cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-xl shadow-inner text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                        {icon}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">{title}</h4>
                        <p className="text-[var(--text-muted)] text-sm font-medium">{subtitle}</p>
                    </div>
                </div>

                <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[var(--primary)] text-white rotate-180' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}
                    aria-label={isOpen ? "Collapse" : "Expand"}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 border-t border-[var(--border-main)]/50">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-main)] border border-[var(--border-main)] text-xs font-bold rounded-lg tracking-wide">
        {children}
    </span>
);

export default AboutMe;
