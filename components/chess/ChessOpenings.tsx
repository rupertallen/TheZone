
import React, { useState, useEffect, useCallback } from 'react';
import { Opening, INITIAL_BOARD, PIECE_ICONS, MiniBoard } from './ChessTypes';
import { OPENINGS } from '../../data/chessOpenings';

interface ChessOpeningsProps {
  onBack: () => void;
}

export const ChessOpenings: React.FC<ChessOpeningsProps> = ({ onBack }) => {
  const [activeOpening, setActiveOpening] = useState<Opening | null>(null);
  const [openingStep, setOpeningStep] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [activeOpening]);

  const handleOpeningSelect = (op: Opening) => {
    setActiveOpening(op);
    setOpeningStep(0);
  };

  const getOpeningBoardState = (op: Opening, step: number) => {
    const b = JSON.parse(JSON.stringify(INITIAL_BOARD));
    for (let i = 0; i < step; i++) {
      const turn = op.boardMoves[i];
      turn.forEach(([fr, fc, tr, tc]) => {
        if (b[fr][fc]) {
          b[tr][tc] = b[fr][fc];
          b[fr][fc] = null;
        }
      });
    }
    return b;
  };

  const handleReadAloud = useCallback(() => {
    if (!activeOpening) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const textToRead = `${activeOpening.name}. ${activeOpening.description} ${activeOpening.history}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [activeOpening, isSpeaking]);

  if (activeOpening) {
    const currentBoard = getOpeningBoardState(activeOpening, openingStep);
    const lastMoveNotation = openingStep > 0 ? activeOpening.notations[openingStep - 1] : "Starting position";
    const lastMoveAtomic = openingStep > 0 ? activeOpening.boardMoves[openingStep - 1] : [];

    const isLastMoveTarget = (r: number, c: number) => {
      return lastMoveAtomic.some(m => m[2] === r && m[3] === c);
    };

    const isLastMoveSource = (r: number, c: number) => {
      return lastMoveAtomic.some(m => m[0] === r && m[1] === c);
    };

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
           <button 
            onClick={() => setActiveOpening(null)}
            className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Library
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">{activeOpening.name}</h1>
            <p className="text-indigo-400 text-sm font-mono tracking-widest uppercase">{activeOpening.category}</p>
          </div>
          <button 
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all border shadow-lg ${isSpeaking ? 'bg-rose-500 border-rose-300 animate-pulse' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
          >
            {isSpeaking ? 'Stop' : 'Read Aloud'}
          </button>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-12">
          <div className="flex flex-col items-center gap-8 bg-slate-800/40 p-6 sm:p-10 rounded-[40px] border border-white/5 backdrop-blur-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-8 border-8 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]">
              {currentBoard.map((row, rIdx) => row.map((piece, cIdx) => {
                const isDark = (rIdx + cIdx) % 2 === 1;
                const highlightTarget = isLastMoveTarget(rIdx, cIdx);
                const highlightSource = isLastMoveSource(rIdx, cIdx);
                return (
                  <div key={`${rIdx}-${cIdx}`} className={`relative flex items-center justify-center text-3xl sm:text-5xl select-none ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'} ${highlightTarget ? 'bg-yellow-200/60 ring-inset ring-2 ring-yellow-400' : ''} ${highlightSource ? 'bg-yellow-400/20' : ''}`}>
                    {piece && <span className={piece.color === 'w' ? 'text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]' : 'text-slate-900'}>{PIECE_ICONS[`${piece.color}-${piece.type}`]}</span>}
                  </div>
                );
              }))}
            </div>
            <div className="flex items-center gap-6 bg-slate-900/80 p-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
               <button onClick={() => setOpeningStep(0)} disabled={openingStep === 0} className="p-4 hover:bg-white/10 text-white rounded-full disabled:opacity-20">I</button>
               <button onClick={() => setOpeningStep(s => Math.max(0, s - 1))} disabled={openingStep === 0} className="p-4 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-full disabled:opacity-20">&larr;</button>
               <div className="flex flex-col items-center min-w-[100px]">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Step</span>
                <div className="font-mono font-black text-2xl text-white">{openingStep} / {activeOpening.boardMoves.length}</div>
              </div>
              <button onClick={() => setOpeningStep(s => Math.min(activeOpening.boardMoves.length, s + 1))} disabled={openingStep === activeOpening.boardMoves.length} className="p-4 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-full disabled:opacity-20">&rarr;</button>
              <button onClick={() => setOpeningStep(activeOpening.boardMoves.length)} disabled={openingStep === activeOpening.boardMoves.length} className="p-4 hover:bg-white/10 text-white rounded-full disabled:opacity-20">XI</button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] shadow-xl backdrop-blur-sm">
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Current Move</h3>
              <div className="flex items-center gap-6">
                <div className="text-5xl font-black tracking-tighter text-white">{openingStep === 0 ? "..." : lastMoveNotation}</div>
                <div className="h-10 w-px bg-white/10" />
                <p className="text-slate-400 leading-tight italic max-w-[140px]">{openingStep === 0 ? "Game start." : `Move ${openingStep}`}</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] shadow-xl space-y-8">
              <p className="text-slate-300 leading-relaxed text-lg">{activeOpening.description}</p>
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-black text-rose-400 uppercase tracking-[0.2em] mb-4">History</h3>
                <p className="text-slate-400 leading-relaxed italic text-base">{activeOpening.history}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const categories = Array.from(new Set(OPENINGS.map(o => o.category)));
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6 sm:p-10 font-sans text-slate-800">
      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
         <button onClick={onBack} className="text-indigo-600 font-bold flex items-center gap-2 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Chess Menu
        </button>
        <h1 className="text-3xl font-black text-indigo-900 tracking-tighter uppercase italic text-center px-4">Opening Library</h1>
        <div className="hidden sm:block w-20" />
      </header>
      <main className="w-full max-w-5xl space-y-12">
        {categories.map(category => (
          <div key={category} className="space-y-6">
            <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest pl-2 border-l-4 border-indigo-500">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OPENINGS.filter(o => o.category === category).map(opening => (
                <button key={opening.id} onClick={() => handleOpeningSelect(opening)} className="group bg-white rounded-3xl p-6 shadow-xl border border-slate-200 flex flex-col gap-4 text-left hover:-translate-y-2 transition-all duration-300">
                  <div className="w-full max-w-[160px] mx-auto pointer-events-none group-hover:scale-105 transition-transform">
                    <MiniBoard moves={opening.boardMoves} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{opening.name}</h3>
                    <div className="text-indigo-600 font-mono text-xs bg-indigo-50 py-1 px-3 rounded-lg inline-block">{opening.moves}</div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{opening.description}</p>
                  </div>
                  <div className="mt-auto text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1">Learn moves &rarr;</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
