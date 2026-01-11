
import React from 'react';
import { WORD_LISTS } from '../data/words';
import { DEFINITION_LISTS } from '../data/definitions';
import { CASE_LISTS } from '../data/cases';
import { VERB_LISTS } from '../data/verbs';
import { HISTORY_LISTS } from '../data/history-events';
import { AcademicYear, AcademicTerm, GameType } from '../types';

interface ListSelectionScreenProps {
  onSelectList: (list: any) => void;
  onGoBack: () => void;
  year: AcademicYear;
  term: AcademicTerm;
  gameType: GameType | null;
}

export const ListSelectionScreen: React.FC<ListSelectionScreenProps> = ({ onSelectList, onGoBack, year, term, gameType }) => {
  let filteredLists: any[] = [];
  let iconColor = 'sky';
  let title = 'Choose a List';

  if (gameType === 'wordMatch') {
    filteredLists = [
      ...WORD_LISTS.filter(l => l.year === year && l.term === term),
      ...DEFINITION_LISTS.filter(l => l.year === year && l.term === term),
      ...CASE_LISTS.filter(l => l.year === year && l.term === term)
    ];
    iconColor = 'emerald';
    title = 'Choose a Word List';
  } else if (gameType === 'spellingBee') {
    // Exclude definitions and cases from spelling
    filteredLists = WORD_LISTS.filter(l => l.year === year && l.term === term);
    iconColor = 'amber';
    title = 'Choose a Word List';
  } else if (gameType === 'verbGame') {
    filteredLists = VERB_LISTS.filter(list => list.year === year && list.term === term);
    iconColor = 'purple';
    title = 'Choose a Verb Set';
  } else if (gameType === 'historyMatch') {
    filteredLists = HISTORY_LISTS.filter(list => list.year === year && list.term === term);
    iconColor = 'rose';
    title = 'Choose a History Timeline';
  }

  const getIcon = () => {
    switch (gameType) {
      case 'verbGame':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />;
      case 'historyMatch':
        return <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
      default:
        return <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />;
    }
  };

  const bgColors: any = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
    rose: 'bg-rose-100 text-rose-600'
  };

  const focusColors: any = {
    sky: 'focus:ring-sky-300',
    emerald: 'focus:ring-emerald-300',
    amber: 'focus:ring-amber-300',
    purple: 'focus:ring-purple-300',
    rose: 'focus:ring-rose-300'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {title}
          </h1>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-slate-200">
            <span className="font-bold text-slate-500">{year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="font-bold text-sky-600">{term} Term</span>
          </div>
        </header>
        <main className="flex flex-col items-center gap-6">
          {filteredLists.length > 0 ? (
            filteredLists.map((list) => (
              <button
                key={list.id}
                onClick={() => onSelectList(list)}
                className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 ${focusColors[iconColor]}`}
                aria-label={`Select ${list.name}`}
              >
                <div className="flex items-center">
                  <div className={`${bgColors[iconColor]} p-4 rounded-xl mr-5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {getIcon()}
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{list.name}</h2>
                    <p className="text-slate-500">{list.description}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow text-center w-full max-w-sm">
              <p className="text-slate-500 mb-2 italic">No resources found for this term.</p>
              <button onClick={onGoBack} className="text-sky-600 font-bold hover:underline">Change Year/Term</button>
            </div>
          )}
        </main>
         <footer className="mt-10">
            <button
              onClick={onGoBack}
              className="px-8 py-3 bg-slate-200 text-slate-700 font-bold text-lg rounded-xl shadow-lg hover:bg-slate-300 transition-all"
            >
              Back to Menu
            </button>
        </footer>
      </div>
    </div>
  );
};
