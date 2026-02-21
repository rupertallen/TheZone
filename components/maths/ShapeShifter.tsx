
import React, { useState } from 'react';
import { GeometryGuides } from './GeometryGuides';
import { GeometryQuiz } from './GeometryQuiz';

interface ShapeShifterProps {
  onBack: () => void;
}

export const ShapeShifter: React.FC<ShapeShifterProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'menu' | 'learn' | 'quiz'>('menu');

  if (mode === 'learn') {
    return <GeometryGuides onBack={() => setMode('menu')} />;
  }

  if (mode === 'quiz') {
    return <GeometryQuiz onBack={() => setMode('menu')} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans overflow-hidden relative">
      {/* Decorative Geometry Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="10,10 30,10 20,30" fill="white" className="animate-pulse" />
          <circle cx="80" cy="20" r="10" stroke="white" strokeWidth="0.5" fill="none" />
          <rect x="10" y="70" width="20" height="20" stroke="white" strokeWidth="0.5" fill="none" transform="rotate(15 20 80)" />
          <path d="M70,70 L90,70 L80,90 Z" fill="white" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl w-full text-center z-10 space-y-12">
        <header className="space-y-4">
          <div className="mx-auto bg-emerald-500/20 p-6 rounded-[2.5rem] w-24 h-24 flex items-center justify-center backdrop-blur-md border border-emerald-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">Shape Shifter</h1>
          <p className="text-slate-400 text-xl font-medium">Master the world of Geometry.</p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
          <button
            onClick={() => setMode('learn')}
            className="group relative bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-emerald-500 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col items-center space-y-4"
          >
            <div className="bg-emerald-500/20 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-3xl font-black italic uppercase tracking-tighter">Learn</div>
            <p className="text-slate-400 group-hover:text-white/80 text-sm font-medium">Study guides and visuals.</p>
          </button>

          <button
            onClick={() => setMode('quiz')}
            className="group relative bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col items-center space-y-4"
          >
            <div className="bg-orange-500/20 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="text-3xl font-black italic uppercase tracking-tighter">Challenge</div>
            <p className="text-slate-400 group-hover:text-white/80 text-sm font-medium">Test your knowledge.</p>
          </button>
        </main>

        <button onClick={onBack} className="text-slate-500 font-bold hover:text-white transition-colors underline decoration-2 underline-offset-8">
          Back to Maths Menu
        </button>
      </div>
    </div>
  );
};
