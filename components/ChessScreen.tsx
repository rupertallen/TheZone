import React, { useState } from 'react';
import { ChessSandbox } from './chess/ChessSandbox';
import { ChessOpenings } from './chess/ChessOpenings';
import { ChessNotation } from './chess/ChessNotation';
import { ChessTimer } from './chess/ChessTimer';
import { FamousMatches } from './chess/FamousMatches';

interface ChessScreenProps {
  onGoBack: () => void;
}

export const ChessScreen: React.FC<ChessScreenProps> = ({ onGoBack }) => {
  const [mode, setMode] = useState<'menu' | 'play' | 'openings' | 'notation' | 'timer' | 'matches'>('menu');

  if (mode === 'play') {
    return <ChessSandbox onBack={() => setMode('menu')} />;
  }

  if (mode === 'openings') {
    return <ChessOpenings onBack={() => setMode('menu')} />;
  }

  if (mode === 'notation') {
    return <ChessNotation onBack={() => setMode('menu')} />;
  }

  if (mode === 'timer') {
    return <ChessTimer onBack={() => setMode('menu')} />;
  }

  if (mode === 'matches') {
    return <FamousMatches onBack={() => setMode('menu')} />;
  }

  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="grid grid-cols-8 grid-rows-8 w-[150%] h-[150%] -rotate-12 -translate-x-10 -translate-y-10">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`aspect-square ${((Math.floor(i / 8) + i) % 2 === 0) ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl w-full text-center z-10 space-y-8">
        <header className="space-y-4">
          <div className="mx-auto bg-white/20 p-6 rounded-full w-24 h-24 flex items-center justify-center backdrop-blur-md border border-white/30 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M9 3h6m-3 7c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0l-3 10h6l-3-10zm-6 10h12m-13 3h14" />
            </svg>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">Chess</h1>
          <p className="text-indigo-200 text-xl font-medium">Strategy, puzzles, and tactics.</p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => setMode('play')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-indigo-100 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Sandbox</h2>
              <p className="text-slate-500 text-xs italic">Interactive play.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('openings')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-emerald-100 p-3 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Openings</h2>
              <p className="text-slate-500 text-xs italic">Move library.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('notation')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-amber-100 p-3 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Notation</h2>
              <p className="text-slate-500 text-xs italic">Learn squares.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('matches')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-sky-100 p-3 rounded-2xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Famous Matches</h2>
              <p className="text-slate-500 text-xs italic">Review the legends.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('timer')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-rose-100 p-3 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Chess Timer</h2>
              <p className="text-slate-500 text-xs italic">Side-by-side clock.</p>
            </div>
          </button>
        </main>

        <footer className="pt-8">
          <button 
            onClick={onGoBack} 
            className="px-12 py-4 bg-white/10 text-white border border-white/20 font-bold text-lg rounded-2xl hover:bg-white/20 transform transition-all"
          >
            Back to The Zone
          </button>
        </footer>
      </div>
    </div>
  );
};
