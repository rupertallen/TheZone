
import React, { useMemo } from 'react';
import { AcademicYear, AcademicTerm } from '../types';
import { WORD_LISTS } from '../data/words';
import { DEFINITION_LISTS } from '../data/definitions';
import { CASE_LISTS } from '../data/cases';
import { VERB_LISTS } from '../data/verbs';
import { ENGLISH_WORD_LISTS } from '../data/english-word-lists';
import { HISTORY_LISTS } from '../data/history-events';

interface ReelsViewerProps {
  year: AcademicYear;
  term: AcademicTerm;
  onGoHome: () => void;
}

interface ReelItem {
  id: string;
  type: 'word' | 'verb' | 'history' | 'spelling' | 'definition' | 'case';
  content: string;
  subContent?: string;
  accent: string;
}

const GRADIENTS = [
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-rose-600',
  'from-purple-500 to-fuchsia-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
];

export const ReelsViewer: React.FC<ReelsViewerProps> = ({ year, term, onGoHome }) => {
  const reelItems = useMemo(() => {
    const items: ReelItem[] = [];
    let counter = 0;

    const getGradient = () => GRADIENTS[counter++ % GRADIENTS.length];

    // 1. Process Words
    WORD_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      const language = list.name.split(':')[0] || 'word';
      list.words.forEach(pair => {
        items.push({
          id: `word-${pair.id}`,
          type: 'word',
          content: `The ${language} for '${pair.lang1}' is:`,
          subContent: pair.lang2,
          accent: getGradient(),
        });
      });
    });

    // 2. Process Definitions
    DEFINITION_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      list.definitions.forEach(def => {
        items.push({
          id: `def-${def.id}`,
          type: 'definition',
          content: `The meaning of '${def.term}' is:`,
          subContent: def.meaning,
          accent: getGradient(),
        });
      });
    });

    // 3. Process Cases
    CASE_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      list.cases.forEach(c => {
        items.push({
          id: `case-${c.id}-sing`,
          type: 'case',
          content: `The Latin for '${list.rootWord}' in the ${c.caseName} Singular is:`,
          subContent: c.latinSingular,
          accent: getGradient(),
        });
        items.push({
          id: `case-${c.id}-plur`,
          type: 'case',
          content: `The Latin for '${list.rootWord}' in the ${c.caseName} Plural is:`,
          subContent: c.latinPlural,
          accent: getGradient(),
        });
      });
    });

    // 4. Process Verbs
    VERB_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      list.verbs.forEach(verb => {
        items.push({
          id: `verb-${verb.id}`,
          type: 'verb',
          content: `Latin for '${verb.person} ${verb.number}' (${verb.english}) is:`,
          subContent: verb.latin,
          accent: getGradient(),
        });
      });
    });

    // 5. Process History
    HISTORY_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      list.events.forEach(event => {
        items.push({
          id: `hist-${event.id}`,
          type: 'history',
          content: `In ${event.date}:`,
          subContent: event.event,
          accent: getGradient(),
        });
      });
    });

    // 6. Process Spelling
    ENGLISH_WORD_LISTS.filter(l => l.year === year && l.term === term).forEach(list => {
      list.words.forEach(word => {
        items.push({
          id: `spell-${word}`,
          type: 'spelling',
          content: `The spelling of '${word}' is:`,
          subContent: word.split('').join('-').toLowerCase(),
          accent: getGradient(),
        });
      });
    });

    // Shuffle items for a more interesting "feed"
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }, [year, term]);

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto snap-y snap-mandatory scrollbar-hide">
      {/* Overlay Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 pointer-events-none">
        <div className="bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30 text-white text-xs sm:text-sm font-bold pointer-events-auto shadow-xl">
          {year} Reels • {term}
        </div>
        <button 
          onClick={onGoHome}
          className="bg-white/20 backdrop-blur-lg p-2.5 rounded-full border border-white/30 text-white pointer-events-auto hover:bg-white/40 transition-all shadow-xl active:scale-90"
          aria-label="Close Reels"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {reelItems.length > 0 ? (
        reelItems.map((item) => (
          <section 
            key={item.id} 
            className={`h-screen w-full snap-start flex flex-col items-center justify-center p-6 sm:p-10 text-white relative overflow-hidden bg-gradient-to-br ${item.accent}`}
          >
            {/* Background Icon Watermark */}
            <div className="absolute -bottom-16 -right-16 opacity-10 pointer-events-none select-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 sm:h-96 sm:w-96" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
               </svg>
            </div>

            <div className="w-full max-w-lg text-center z-10 space-y-6 sm:space-y-10 animate-in fade-in zoom-in duration-500">
               <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase border border-white/20">
                 Quick Fact
               </span>
               
               <div className="space-y-4">
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug sm:leading-relaxed opacity-90">
                   {item.content}
                 </h2>
                 <div className="text-4xl sm:text-6xl md:text-7xl font-black drop-shadow-2xl tracking-tight leading-tight break-words" style={{ overflowWrap: 'anywhere' }}>
                   {item.subContent}
                 </div>
               </div>
            </div>

            {/* Hint to scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40 pointer-events-none">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Swipe</span>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7-7-7" />
               </svg>
            </div>
          </section>
        ))
      ) : (
        <div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white p-8 text-center">
          <div className="space-y-4">
            <p className="text-xl font-bold opacity-50">No reels found for this term yet.</p>
            <button onClick={onGoHome} className="text-sky-400 font-bold underline">Go back to Menu</button>
          </div>
        </div>
      )}
    </div>
  );
};
