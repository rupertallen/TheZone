
import React, { useMemo } from 'react';
import { GameType, AcademicYear, AcademicTerm } from '../types';
import { WORD_LISTS } from '../data/words';
import { DEFINITION_LISTS } from '../data/definitions';
import { CASE_LISTS } from '../data/cases';
import { VERB_LISTS } from '../data/verbs';
import { ENGLISH_WORD_LISTS } from '../data/english-word-lists';
import { HISTORY_LISTS } from '../data/history-events';

interface MenuScreenProps {
  onStartGame: (game: GameType) => void;
  year: AcademicYear;
  term: AcademicTerm;
  onYearChange: (year: AcademicYear) => void;
  onTermChange: (term: AcademicTerm) => void;
  onGoBack: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ 
  onStartGame, 
  year, 
  term, 
  onYearChange, 
  onTermChange,
  onGoBack
}) => {
  const years: AcademicYear[] = ['Year 5', 'Year 6', 'Year 7', 'Year 8'];
  const terms: AcademicTerm[] = ['Autumn', 'Spring', 'Summer'];

  const yearDisplayMap: Record<AcademicYear, string> = {
    'Year 5': 'Five',
    'Year 6': 'Six',
    'Year 7': 'Seven',
    'Year 8': 'Eight',
  };

  const termColors = {
    Autumn: 'bg-orange-500 border-orange-600',
    Spring: 'bg-emerald-500 border-emerald-600',
    Summer: 'bg-sky-500 border-sky-600'
  };

  const isYearAvailable = useMemo(() => {
    return (y: AcademicYear) => {
      return [
        ...WORD_LISTS,
        ...DEFINITION_LISTS,
        ...CASE_LISTS,
        ...VERB_LISTS,
        ...ENGLISH_WORD_LISTS,
        ...HISTORY_LISTS
      ].some(list => list.year === y);
    };
  }, []);

  const isTermAvailable = useMemo(() => {
    return (t: AcademicTerm) => {
      return [
        ...WORD_LISTS,
        ...DEFINITION_LISTS,
        ...CASE_LISTS,
        ...VERB_LISTS,
        ...ENGLISH_WORD_LISTS,
        ...HISTORY_LISTS
      ].some(list => list.year === year && list.term === t);
    };
  }, [year]);

  const isGameAvailable = useMemo(() => {
    return (game: GameType) => {
      switch (game) {
        case 'wordMatch':
          return [
            ...WORD_LISTS,
            ...DEFINITION_LISTS,
            ...CASE_LISTS
          ].some(l => l.year === year && l.term === term);
        case 'spellingBee':
          return WORD_LISTS.some(l => l.year === year && l.term === term);
        case 'verbGame':
          return VERB_LISTS.some(l => l.year === year && l.term === term);
        case 'singleLanguageSpelling':
          return ENGLISH_WORD_LISTS.some(l => l.year === year && l.term === term);
        case 'historyMatch':
          return HISTORY_LISTS.some(l => l.year === year && l.term === term);
        case 'reels':
          return [
            ...WORD_LISTS,
            ...DEFINITION_LISTS,
            ...CASE_LISTS,
            ...VERB_LISTS,
            ...ENGLISH_WORD_LISTS,
            ...HISTORY_LISTS
          ].some(l => l.year === year && l.term === term);
        default:
          return false;
      }
    };
  }, [year, term]);

  const getButtonClasses = (game: GameType, colorClass: string) => {
    const available = isGameAvailable(game);
    const base = "bg-white rounded-2xl shadow-lg p-6 text-left transform transition-all duration-200 focus:outline-none focus:ring-4 w-full h-full";
    if (!available) {
      return `${base} opacity-50 grayscale cursor-not-allowed pointer-events-none`;
    }
    return `${base} hover:scale-105 ${colorClass}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800 bg-slate-100">
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        <header className="mb-8 w-full relative">
          <button 
            onClick={onGoBack} 
            className="absolute left-0 top-0 text-sky-600 font-bold flex items-center gap-1 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-2 mt-8 md:mt-0">
            Learning
          </h1>
          <p className="text-lg text-slate-600 mb-6">Choose your year and term to see your specific activities.</p>
          
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 bg-white p-6 rounded-3xl shadow-md border border-slate-200">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider text-left">Academic Year</span>
              <div className="flex flex-wrap gap-2">
                {years.map(y => {
                  const available = isYearAvailable(y);
                  return (
                    <button
                      key={y}
                      onClick={() => available && onYearChange(y)}
                      disabled={!available}
                      className={`px-4 py-2 rounded-xl font-bold transition-all min-w-[70px] ${
                        year === y 
                          ? 'bg-sky-600 text-white shadow-lg scale-105' 
                          : available 
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {yearDisplayMap[y]}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="h-px md:h-12 w-full md:w-px bg-slate-200 my-2 md:my-0"></div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider text-left">Term</span>
              <div className="flex flex-wrap gap-2">
                {terms.map(t => {
                  const available = isTermAvailable(t);
                  return (
                    <button
                      key={t}
                      onClick={() => available && onTermChange(t)}
                      disabled={!available}
                      className={`px-4 py-2 rounded-xl font-bold transition-all ${
                        term === t 
                          ? `${termColors[t]} text-white shadow-lg scale-105` 
                          : available 
                            ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <main className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
            <button
              onClick={() => onStartGame('wordMatch')}
              disabled={!isGameAvailable('wordMatch')}
              className={getButtonClasses('wordMatch', 'focus:ring-sky-300')}
            >
              <div className="flex items-center">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-xl mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h4l4 4zM7 8H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h4a2 2 0 002-2V4a2 2 0 00-2-2h-4L7 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Word Match</h2>
                  <p className="text-slate-500 text-sm">Match the words in two languages.</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onStartGame('spellingBee')}
              disabled={!isGameAvailable('spellingBee')}
              className={getButtonClasses('spellingBee', 'focus:ring-amber-300')}
            >
              <div className="flex items-center">
                <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mr-5 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Spelling Bee</h2>
                  <p className="text-slate-500 text-sm">Spell the words in another language.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('verbGame')}
              disabled={!isGameAvailable('verbGame')}
              className={getButtonClasses('verbGame', 'focus:ring-purple-300')}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-xl mr-5 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Verb Challenge</h2>
                  <p className="text-slate-500 text-sm">Latin verb conjugations.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('singleLanguageSpelling')}
              disabled={!isGameAvailable('singleLanguageSpelling')}
              className={getButtonClasses('singleLanguageSpelling', 'focus:ring-indigo-300')}
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 text-indigo-600 p-4 rounded-xl mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Listen And Spell</h2>
                  <p className="text-slate-500 text-sm">Listen to a word and spell it.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('historyMatch')}
              disabled={!isGameAvailable('historyMatch')}
              className={getButtonClasses('historyMatch', 'focus:ring-rose-300')}
            >
              <div className="flex items-center">
                <div className="bg-rose-100 text-rose-600 p-4 rounded-xl mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">History Match</h2>
                  <p className="text-slate-500 text-sm">Match historical events to dates.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onStartGame('reels')}
              disabled={!isGameAvailable('reels')}
              className={getButtonClasses('reels', 'focus:ring-cyan-300')}
            >
              <div className="flex items-center">
                <div className="bg-cyan-100 text-cyan-600 p-4 rounded-xl mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Reels</h2>
                  <p className="text-slate-500 text-sm">Swipe through bite-sized learning cards.</p>
                </div>
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
