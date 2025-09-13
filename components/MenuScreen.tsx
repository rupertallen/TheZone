
import React from 'react';
import { GameType } from '../types';

interface MenuScreenProps {
  onStartGame: (game: GameType) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-4">
            Learning Zone
          </h1>
          <p className="text-lg text-slate-600">Choose a game to play!</p>
        </header>
        <main>
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => onStartGame('wordMatch')}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300"
              aria-label="Start Word Match game"
            >
              <div className="flex items-center">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h4l4 4zM7 8H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h4a2 2 0 002-2V4a2 2 0 00-2-2h-4L7 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Word Match</h2>
                  <p className="text-slate-500">Match the words in two languages.</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onStartGame('spellingBee')}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
              aria-label="Start Spelling Bee game"
            >
              <div className="flex items-center">
                <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mr-5">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Spelling Bee</h2>
                  <p className="text-slate-500">Spell the words in another language.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('verbGame')}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              aria-label="Start Verb Challenge game"
            >
              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-xl mr-5">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Verb Challenge</h2>
                  <p className="text-slate-500">Learn your Latin verb conjugations.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('singleLanguageSpelling')}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              aria-label="Start Listen And Spell game"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 text-indigo-600 p-4 rounded-xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Listen And Spell</h2>
                  <p className="text-slate-500">Listen to a word and spell it.</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => onStartGame('historyMatch')}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-rose-300"
              aria-label="Start History Match game"
            >
              <div className="flex items-center">
                <div className="bg-rose-100 text-rose-600 p-4 rounded-xl mr-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">History Match</h2>
                  <p className="text-slate-500">Match historical events to dates.</p>
                </div>
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
