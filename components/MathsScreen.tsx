
import React, { useState } from 'react';
import { TableMaster } from './maths/TableMaster';
import { LogicGates } from './maths/LogicGates';
import { ShapeShifter } from './maths/ShapeShifter';

interface MathsScreenProps {
  onGoBack: () => void;
}

const MATHS_ACTIVITIES = [
  {
    id: 'table-master',
    title: 'Table Master',
    description: 'Perfect your times tables from 1 to 12. Fill in the gaps as fast as you can!',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    color: 'bg-orange-100 text-orange-600',
    hoverBorder: 'hover:border-orange-400',
    status: 'Ready'
  },
  {
    id: 'logic-puzzles',
    title: 'Logic Gates',
    description: 'Sharpen your reasoning with brain-teasing mathematical puzzles.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600',
    hoverBorder: 'hover:border-purple-400',
    status: 'Ready'
  },
  {
    id: 'shape-shifter',
    title: 'Shape Shifter',
    description: 'Explore angles, symmetry, and geometric properties.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      </svg>
    ),
    color: 'bg-emerald-100 text-emerald-600',
    hoverBorder: 'hover:border-emerald-400',
    status: 'Ready'
  },
  {
    id: 'mental-arithmetic',
    title: 'Quick Calc',
    description: 'Master the basics with speed-based arithmetic challenges.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600',
    hoverBorder: 'hover:border-amber-400',
    status: 'TBD'
  }
];

export const MathsScreen: React.FC<MathsScreenProps> = ({ onGoBack }) => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  if (activeActivity === 'table-master') {
    return <TableMaster onBack={() => setActiveActivity(null)} />;
  }

  if (activeActivity === 'logic-puzzles') {
    return <LogicGates onBack={() => setActiveActivity(null)} />;
  }

  if (activeActivity === 'shape-shifter') {
    return <ShapeShifter onBack={() => setActiveActivity(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 sm:p-10 font-sans text-slate-800 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <header className="flex flex-col items-center mb-16 relative">
          <button 
            onClick={onGoBack} 
            className="absolute left-0 top-0 text-amber-600 font-bold flex items-center gap-2 hover:underline p-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to The Zone
          </button>
          
          <div className="bg-amber-100 text-amber-600 p-6 rounded-[2.5rem] mb-6 shadow-inner animate-in zoom-in duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter uppercase italic text-center">
            Maths
          </h1>
          <p className="text-xl text-slate-500 mt-2 font-medium">Numbers, patterns, and logic.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATHS_ACTIVITIES.map(activity => (
            <button
              key={activity.id}
              disabled={activity.status === 'TBD'}
              onClick={() => setActiveActivity(activity.id)}
              className={`group bg-white rounded-[40px] p-8 shadow-xl border-2 border-transparent transition-all duration-300 ${activity.hoverBorder} flex flex-col h-full relative overflow-hidden text-left ${activity.status === 'TBD' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {activity.icon}
              </div>

              <div className={`${activity.color} p-4 rounded-2xl w-fit mb-6 transition-all group-hover:scale-110`}>
                {activity.icon}
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{activity.title}</h2>
                <span className={`${activity.status === 'Ready' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'} text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-slate-200 shadow-sm`}>
                  {activity.status}
                </span>
              </div>
              
              <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                {activity.description}
              </p>
              
              <div 
                className={`w-full py-4 text-center font-black uppercase tracking-widest text-xs rounded-2xl border transition-all ${activity.status === 'TBD' ? 'bg-slate-50 text-slate-300 border-slate-200' : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600'}`}
              >
                {activity.status === 'TBD' ? 'Coming Soon' : 'Start Activity'}
              </div>
            </button>
          ))}
        </main>

        <footer className="mt-20 text-center pb-10">
          <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.4em]">More activities being calculated</p>
        </footer>
      </div>
    </div>
  );
};
