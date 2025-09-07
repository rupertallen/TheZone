
import React from 'react';
import { ENGLISH_WORD_LISTS } from '../data/english-word-lists';
import { SingleWordList } from '../types';

interface SingleLanguageListSelectionScreenProps {
  onSelectList: (list: SingleWordList) => void;
  onGoBack: () => void;
}

export const SingleLanguageListSelectionScreen: React.FC<SingleLanguageListSelectionScreenProps> = ({ onSelectList, onGoBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-4xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-4">
            Choose a Spelling List
          </h1>
          <p className="text-lg text-slate-600">Select a category to begin.</p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGLISH_WORD_LISTS.map((list) => (
            <button
              key={list.id}
              onClick={() => onSelectList(list)}
              className="bg-white rounded-2xl shadow-lg p-5 text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col h-full"
              aria-label={`Start game with ${list.name} word list`}
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">{list.name}</h2>
              <p className="text-slate-500 flex-grow">{list.description}</p>
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
