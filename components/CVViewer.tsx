import React from 'react';

const CVViewer: React.FC = () => {
    const cvUrl = "https://github.com/vyshakputhusseri/CV/raw/56f82d0c2278f992e59ec9af66a2b465134ae737/VyshakPuthusseri_CV.pdf";
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(cvUrl)}&embedded=true`;

    return (
        <div className="py-24 space-y-12 animate-fadeIn h-full flex flex-col">
            <div className="flex justify-between items-center border-b border-gray-100 pb-10">
                <h2 className="text-5xl font-black tracking-tighter">My Resume</h2>
                <a
                    href={cvUrl}
                    download
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </a>
            </div>

            <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100" style={{ height: '1200px' }}>
                <iframe
                    src={googleDocsViewerUrl}
                    className="w-full h-full border-none rounded-3xl"
                    title="CV Viewer"
                />
            </div>
        </div>
    );
};

export default CVViewer;
