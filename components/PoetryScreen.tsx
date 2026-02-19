
import React, { useState } from 'react';
import { Poem } from '../types';

interface PoetryScreenProps {
  onGoBack: () => void;
}

const SAMPLE_POEMS: Poem[] = [
  {
    id: 'mayfly-may',
    title: 'Mayfly May',
    author: 'Chrissie Gittins',
    lines: [
      'Mayfly May, may only fly for a day,',
      'but she has the most delicate wings –',
      'lacy, transparent, exquisite, fine,',
      'drawn with the thinnest black line.',
      '',
      'Mayfly May has no need of a mouth,',
      'she has no need of food –',
      'she must find a mate before the afternoon gets late,',
      'then lay her eggs on the water.',
      '',
      'Her eggs drift down to the river’s ground',
      'where they hatch into nymphs by the thousand.',
      'They shed their skin over twenty times,',
      'two years later they rise in the water.',
      '',
      'May’s mayflies flit in the bright sunlight',
      'with the myriads flicking across woodland.',
      'May may have flown for only one day –',
      'but millions of mayfly will follow.'
    ]
  },
  {
    id: 'tyger',
    title: 'The Tyger',
    author: 'William Blake',
    lines: [
      'Tyger Tyger, burning bright,',
      'In the forests of the night;',
      'What immortal hand or eye,',
      'Could frame thy fearful symmetry?',
      '',
      'In what distant deeps or skies.',
      'Burnt the fire of thine eyes?',
      'On what wings dare he aspire?',
      'What the hand, dare seize the fire?',
      '',
      'And what shoulder, & what art,',
      'Could twist the sinews of thy heart?',
      'And when thy heart began to beat,',
      'What dread hand? & what dread feet?',
      '',
      'What the hammer? what the chain,',
      'In what furnace was thy brain?',
      'What the anvil? what dread grasp,',
      'Dare its deadly terrors clasp!',
      '',
      'When the stars threw down their spears',
      'And water\'d heaven with their tears:',
      'Did he smile his work to see?',
      'Did he who made the Lamb make thee?',
      '',
      'Tyger Tyger burning bright,',
      'In the forests of the night:',
      'What immortal hand or eye,',
      'Dare frame thy fearful symmetry?'
    ]
  },
  {
    id: 'daffodils',
    title: 'I Wandered Lonely as a Cloud',
    author: 'William Wordsworth',
    lines: [
      'I wandered lonely as a cloud',
      'That floats on high o\'er vales and hills,',
      'When all at once I saw a crowd,',
      'A host, of golden daffodils;',
      'Beside the lake, beneath the trees,',
      'Fluttering and dancing in the breeze.',
      '',
      'Continuous as the stars that shine',
      'And twinkle on the milky way,',
      'They stretched in never-ending line',
      'Along the margin of a bay:',
      'Ten thousand saw I at a glance,',
      'Tossing their heads in sprightly dance.'
    ]
  }
];

export const PoetryScreen: React.FC<PoetryScreenProps> = ({ onGoBack }) => {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  if (selectedPoem) {
    return (
      <div className="min-h-screen bg-rose-50 p-6 md:p-12 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 relative">
          <button 
            onClick={() => setSelectedPoem(null)}
            className="absolute top-6 left-6 text-rose-600 font-bold flex items-center gap-1 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <header className="text-center mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-2">{selectedPoem.title}</h1>
            <p className="text-rose-600 font-serif italic text-xl">{selectedPoem.author}</p>
          </header>

          <article className="font-serif text-lg md:text-xl text-slate-700 leading-relaxed whitespace-pre-wrap text-center">
            {selectedPoem.lines.join('\n')}
          </article>

          <footer className="mt-12 pt-8 border-t border-rose-100 text-center">
             <button onClick={() => setSelectedPoem(null)} className="px-8 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors">
               Finish Reading
             </button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-rose-600 tracking-tight mb-4">Poetry</h1>
          <p className="text-xl text-slate-600">The beauty of language in verse.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_POEMS.map(poem => (
            <button
              key={poem.id}
              onClick={() => setSelectedPoem(poem)}
              className="bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-rose-300 transition-all text-left flex flex-col items-start"
            >
              <div className="bg-rose-50 p-3 rounded-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{poem.title}</h2>
              <p className="text-slate-500 italic mb-4">{poem.author}</p>
              <span className="mt-auto text-rose-600 font-bold text-sm uppercase tracking-widest">Read Now →</span>
            </button>
          ))}
        </main>

        <footer className="mt-12 text-center">
          <button onClick={onGoBack} className="px-10 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-colors">
            Back to The Zone
          </button>
        </footer>
      </div>
    </div>
  );
};
