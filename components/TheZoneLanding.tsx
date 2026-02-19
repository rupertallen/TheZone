
import React from 'react';
import { Screen } from '../types';

interface TheZoneLandingProps {
  onNavigate: (screen: Screen) => void;
}

export const TheZoneLanding: React.FC<TheZoneLandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-10 font-sans text-slate-800">
      <div className="max-w-4xl w-full text-center space-y-12">
        <header className="space-y-4 animate-in fade-in slide-in-from-top-10 duration-700">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-indigo-700">
            THE ZONE
          </h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {/* Learning */}
          <button
            onClick={() => onNavigate('menu')}
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:border-sky-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center space-y-6"
          >
            <div className="bg-emerald-100 text-emerald-600 p-5 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Learning</h2>
              <p className="text-slate-500 mt-2">Languages, History, Spelling and more.</p>
            </div>
            <div className="pt-4 flex items-center text-sky-600 font-bold group-hover:gap-2 transition-all">
              <span>Enter</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          {/* Poetry */}
          <button
            onClick={() => onNavigate('poetry')}
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:border-rose-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center space-y-6"
          >
            <div className="bg-rose-100 text-rose-600 p-5 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Poetry</h2>
              <p className="text-slate-500 mt-2">Discover classic and modern verses.</p>
            </div>
            <div className="pt-4 flex items-center text-rose-600 font-bold group-hover:gap-2 transition-all">
              <span>Read</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          {/* Chess */}
          <button
            onClick={() => onNavigate('chess')}
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center space-y-6"
          >
            <div className="bg-indigo-100 text-indigo-600 p-5 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M9 3h6m-3 7c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0l-3 10h6l-3-10zm-6 10h12m-13 3h14" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Chess</h2>
              <p className="text-slate-500 mt-2">Strategy, puzzles, and tactics.</p>
            </div>
            <div className="pt-4 flex items-center text-indigo-600 font-bold group-hover:gap-2 transition-all">
              <span>Play</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </main>
      </div>
    </div>
  );
};
