
import React from 'react';

interface MenuScreenProps {
  onStartGame: (game: 'wordMatch' | 'spellingBee') => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-4">
            Hedley's Learning Zone
          </h1>
          <p className="text-lg text-slate-600">Choose a game to play!</p>
        </header>
        <main>
          <div className="flex flex-col items-center">
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
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300 mt-6"
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
          </div>
        </main>
      </div>
    </div>
  );
};
