
import React from 'react';
import { WORD_LISTS } from '../data/words';
import { WordList } from '../types';

interface ListSelectionScreenProps {
  onSelectList: (list: WordList) => void;
  onGoBack: () => void;
}

export const ListSelectionScreen: React.FC<ListSelectionScreenProps> = ({ onSelectList, onGoBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-4">
            Choose a Word List
          </h1>
          <p className="text-lg text-slate-600">Select a category to begin.</p>
        </header>
        <main className="flex flex-col items-center gap-6">
          {WORD_LISTS.map((list) => (
            <button
              key={list.id}
              onClick={() => onSelectList(list)}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300"
              aria-label={`Start game with ${list.name} word list`}
            >
              <div className="flex items-center">
                <div className="bg-sky-100 text-sky-600 p-4 rounded-xl mr-5">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{list.name}</h2>
                  <p className="text-slate-500">{list.description}</p>
                </div>
              </div>
            </button>
          ))}
        </main>
         <footer className="mt-10">
            <button
              onClick={onGoBack}
              className="px-8 py-3 bg-slate-200 text-slate-700 font-bold text-lg rounded-xl shadow-lg hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-400 transform hover:scale-105 transition-transform duration-200"
            >
              Back to Menu
            </button>
        </footer>
      </div>
    </div>
  );
};
