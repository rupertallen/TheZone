
import React from 'react';
import { ENGLISH_WORD_LISTS } from '../data/english-word-lists';
import { SingleWordList, AcademicYear, AcademicTerm } from '../types';

interface SingleLanguageListSelectionScreenProps {
  onSelectList: (list: SingleWordList) => void;
  onGoBack: () => void;
  year: AcademicYear;
  term: AcademicTerm;
}

export const SingleLanguageListSelectionScreen: React.FC<SingleLanguageListSelectionScreenProps> = ({ onSelectList, onGoBack, year, term }) => {
  const filteredLists = ENGLISH_WORD_LISTS.filter(list => list.year === year && list.term === term);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-4xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-4">
            Choose a Spelling List
          </h1>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-slate-200">
            <span className="font-bold text-slate-500">{year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="font-bold text-sky-600">{term} Term</span>
          </div>
          <p className="text-lg text-slate-600">Select a category to begin.</p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.length > 0 ? (
            filteredLists.map((list) => (
              <button
                key={list.id}
                onClick={() => onSelectList(list)}
                className="bg-white rounded-2xl shadow-lg p-5 text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col h-full"
                aria-label={`Start game with ${list.name} word list`}
              >
                <h2 className="text-xl font-bold text-slate-800 mb-2">{list.name}</h2>
                <p className="text-slate-500 flex-grow">{list.description}</p>
              </button>
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow text-center col-span-full mx-auto w-full max-w-sm">
              <p className="text-slate-500 mb-2 italic">No spelling lists found for this year and term.</p>
              <button onClick={onGoBack} className="text-sky-600 font-bold hover:underline">Go back to change settings</button>
            </div>
          )}
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
