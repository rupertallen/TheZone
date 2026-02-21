
import React, { useState } from 'react';
import { GEOMETRY_LESSONS, GeometryLesson } from '../../data/geometryData';

interface GeometryGuidesProps {
  onBack: () => void;
}

export const GeometryGuides: React.FC<GeometryGuidesProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<'Angles' | 'Symmetry' | 'Shapes'>('Angles');
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const lessons = GEOMETRY_LESSONS.filter(l => l.category === activeCategory);
  const currentLesson = lessons[activeLessonIdx];

  const handleCategoryChange = (cat: 'Angles' | 'Symmetry' | 'Shapes') => {
    setActiveCategory(cat);
    setActiveLessonIdx(0);
  };

  const renderVisual = (id: string) => {
    switch (id) {
      case 'angle-types':
        return (
          <svg viewBox="0 0 200 120" className="w-full max-w-md mx-auto">
            {/* Acute */}
            <g transform="translate(10, 10)">
              <path d="M 0 40 L 40 40 L 30 10" stroke="currentColor" fill="none" strokeWidth="2" />
              <text x="20" y="55" className="text-[8px] fill-slate-400 text-center" textAnchor="middle">Acute</text>
            </g>
            {/* Right */}
            <g transform="translate(70, 10)">
              <path d="M 0 10 L 0 40 L 30 40" stroke="currentColor" fill="none" strokeWidth="2" />
              <rect x="0" y="32" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="15" y="55" className="text-[8px] fill-slate-400 text-center" textAnchor="middle">Right (90°)</text>
            </g>
            {/* Obtuse */}
            <g transform="translate(130, 10)">
              <path d="M 0 10 L 20 40 L 50 40" stroke="currentColor" fill="none" strokeWidth="2" />
              <text x="25" y="55" className="text-[8px] fill-slate-400 text-center" textAnchor="middle">Obtuse</text>
            </g>
          </svg>
        );
      case 'angle-sums':
        return (
          <svg viewBox="0 0 200 100" className="w-full max-w-sm mx-auto">
             <polygon points="100,10 40,80 160,80" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
             <text x="100" y="55" className="text-[10px] fill-emerald-500 font-black" textAnchor="middle">TRIANGLE = 180°</text>
          </svg>
        );
      case 'line-symmetry':
        return (
          <svg viewBox="0 0 200 100" className="w-full max-w-sm mx-auto">
             <rect x="60" y="20" width="80" height="60" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
             <line x1="100" y1="10" x2="100" y2="90" stroke="rose" strokeWidth="1" strokeDasharray="4" className="text-rose-500" />
             <line x1="50" y1="50" x2="150" y2="50" stroke="rose" strokeWidth="1" strokeDasharray="4" className="text-rose-500" />
             <text x="100" y="95" className="text-[8px] fill-rose-500 uppercase font-bold" textAnchor="middle">Lines of Symmetry</text>
          </svg>
        );
      case 'rotational-symmetry':
        return (
          <div className="flex items-center justify-center p-4">
             <div className="w-20 h-20 border-4 border-sky-500 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                <div className="w-2 h-2 bg-sky-500 rounded-full" />
             </div>
             <div className="ml-8 text-left text-xs font-mono text-sky-400">
                Turn 90° - Same!<br/>
                Turn 180° - Same!<br/>
                Turn 270° - Same!<br/>
                Turn 360° - Same!<br/>
                Order = 4
             </div>
          </div>
        );
      case 'shape-types':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
              <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,5 5,35 35,35" fill="none" stroke="#fbbf24" strokeWidth="2" /></svg>
              <span className="text-[10px] mt-1 text-amber-400 font-bold uppercase">Equilateral</span>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-xl border border-white/5 flex flex-col items-center">
              <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,5 15,35 25,35" fill="none" stroke="#fbbf24" strokeWidth="2" /></svg>
              <span className="text-[10px] mt-1 text-amber-400 font-bold uppercase">Isosceles</span>
            </div>
          </div>
        );
      default:
        return <div className="h-32 bg-slate-800 rounded-xl flex items-center justify-center italic text-slate-500">Visual coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-8 font-sans text-white overflow-y-auto">
      <header className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <button onClick={onBack} className="text-emerald-500 font-bold flex items-center gap-2 hover:text-emerald-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Menu
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Guide Room</h2>
          <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase">Learning Geometry</p>
        </div>
        <div className="w-20 hidden sm:block" />
      </header>

      <main className="w-full max-w-5xl flex flex-col items-center gap-10 pb-12">
        <nav className="flex flex-wrap justify-center gap-4 bg-slate-800 p-2 rounded-full border border-white/5">
          {(['Angles', 'Symmetry', 'Shapes'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-8 py-2 rounded-full font-black uppercase text-xs tracking-widest transition-all ${activeCategory === cat ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-stretch">
          {/* Content Card */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 sm:p-12 shadow-2xl backdrop-blur-sm space-y-8 flex flex-col">
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-white italic tracking-tighter leading-tight">{currentLesson.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed">{currentLesson.content}</p>
            </div>
            
            <ul className="space-y-4 flex-grow">
              {currentLesson.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-slate-200 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button 
                onClick={() => setActiveLessonIdx(idx => Math.max(0, idx - 1))}
                disabled={activeLessonIdx === 0}
                className="text-slate-500 font-bold hover:text-white disabled:opacity-20 flex items-center gap-2"
              >
                &larr; Prev
              </button>
              <div className="text-xs font-mono text-slate-500">Lesson {activeLessonIdx + 1} of {lessons.length}</div>
              <button 
                onClick={() => setActiveLessonIdx(idx => Math.min(lessons.length - 1, idx + 1))}
                disabled={activeLessonIdx === lessons.length - 1}
                className="text-emerald-500 font-bold hover:text-emerald-400 disabled:opacity-20 flex items-center gap-2"
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Visual Card */}
          <div className="bg-slate-800 rounded-[40px] border-4 border-slate-700 shadow-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 z-10">Interactive Visual</h3>
            <div className="w-full text-emerald-400 z-10 animate-in fade-in duration-700 scale-125">
              {renderVisual(currentLesson.visualId)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
