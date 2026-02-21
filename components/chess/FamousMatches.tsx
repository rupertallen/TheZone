import React, { useState, useEffect, useCallback } from 'react';
import { FamousMatch, INITIAL_BOARD, PIECE_ICONS, AtomicMove } from './ChessTypes';
import { FAMOUS_MATCHES } from '../../data/famousMatches';

interface FamousMatchesProps {
  onBack: () => void;
}

export const FamousMatches: React.FC<FamousMatchesProps> = ({ onBack }) => {
  const [activeMatch, setActiveMatch] = useState<FamousMatch | null>(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [activeMatch]);

  const handleMatchSelect = (m: FamousMatch) => {
    setActiveMatch(m);
    setMoveIndex(0);
  };

  const getBoardStateAtMove = (m: FamousMatch, idx: number) => {
    const b = JSON.parse(JSON.stringify(INITIAL_BOARD));
    for (let i = 0; i < idx; i++) {
      const turnMoves = m.moves[i].boardMove;
      turnMoves.forEach(([fr, fc, tr, tc]) => {
        if (b[fr][fc]) {
          b[tr][tc] = b[fr][fc];
          b[fr][fc] = null;
        }
      });
    }
    return b;
  };

  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  const handleReadAloud = () => {
    if (!activeMatch) return;
    const text = moveIndex === 0 
      ? `${activeMatch.title}. ${activeMatch.players}. ${activeMatch.description}`
      : `${activeMatch.moves[moveIndex - 1].notation}. ${activeMatch.moves[moveIndex - 1].commentary}`;
    speakText(text);
  };

  if (activeMatch) {
    const currentBoard = getBoardStateAtMove(activeMatch, moveIndex);
    const currentMoveTurn = moveIndex > 0 ? activeMatch.moves[moveIndex - 1].boardMove : [];

    const isTargetSquare = (r: number, c: number) => {
      return currentMoveTurn.some(m => m[2] === r && m[3] === c);
    };

    const isSourceSquare = (r: number, c: number) => {
      return currentMoveTurn.some(m => m[0] === r && m[1] === c);
    };

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8 gap-4">
           <button 
            onClick={() => setActiveMatch(null)}
            className="text-sky-400 font-bold flex items-center gap-2 hover:text-sky-300 transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Library
          </button>
          <div className="text-center overflow-hidden">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic truncate">{activeMatch.title}</h1>
            <p className="text-sky-400 text-xs sm:text-sm font-mono tracking-widest uppercase">{activeMatch.players}</p>
          </div>
          <button 
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold transition-all border shadow-lg shrink-0 text-xs sm:text-sm ${isSpeaking ? 'bg-rose-500 border-rose-300 animate-pulse' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
          >
            {isSpeaking ? 'Stop' : 'Read Move'}
          </button>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pb-12">
          <div className="flex flex-col items-center gap-6 bg-slate-800/40 p-4 sm:p-10 rounded-[40px] border border-white/5 backdrop-blur-sm shadow-2xl">
            <div className="grid grid-cols-8 grid-rows-8 border-[6px] sm:border-[12px] border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden w-[280px] h-[280px] sm:w-[450px] sm:h-[450px]">
              {currentBoard.map((row: any, rIdx: number) => row.map((piece: any, cIdx: number) => {
                const isDark = (rIdx + cIdx) % 2 === 1;
                const highlightTarget = isTargetSquare(rIdx, cIdx);
                const highlightSource = isSourceSquare(rIdx, cIdx);
                return (
                  <div key={`${rIdx}-${cIdx}`} className={`relative flex items-center justify-center text-3xl sm:text-5xl select-none ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'} ${highlightTarget ? 'bg-yellow-200/60 ring-inset ring-2 ring-yellow-400' : ''} ${highlightSource ? 'bg-yellow-400/20' : ''}`}>
                    {piece && <span className={piece.color === 'w' ? 'text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]' : 'text-slate-900'}>{PIECE_ICONS[`${piece.color}-${piece.type}`]}</span>}
                  </div>
                );
              }))}
            </div>
            <div className="flex items-center gap-4 sm:gap-6 bg-slate-900/80 p-2 sm:p-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
               <button onClick={() => setMoveIndex(0)} disabled={moveIndex === 0} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-white/10 text-white rounded-full disabled:opacity-20 transition-colors font-mono font-black">I</button>
               <button onClick={() => setMoveIndex(idx => Math.max(0, idx - 1))} disabled={moveIndex === 0} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-sky-600/20 hover:bg-sky-600/40 text-sky-400 rounded-full disabled:opacity-20 transition-colors">&larr;</button>
               <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Move</span>
                <div className="font-mono font-black text-xl sm:text-2xl text-white">{moveIndex} / {activeMatch.moves.length}</div>
              </div>
              <button onClick={() => setMoveIndex(idx => Math.min(activeMatch.moves.length, idx + 1))} disabled={moveIndex === activeMatch.moves.length} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-full disabled:opacity-20 transition-colors">&rarr;</button>
              <button onClick={() => setMoveIndex(activeMatch.moves.length)} disabled={moveIndex === activeMatch.moves.length} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-white/10 text-white rounded-full disabled:opacity-20 transition-colors font-mono font-black">XI</button>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[40px] shadow-2xl backdrop-blur-sm min-h-[300px] flex flex-col">
              {moveIndex === 0 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-3xl font-black italic tracking-tighter text-white">Introduction</h2>
                  <p className="text-slate-300 text-lg leading-relaxed">{activeMatch.description}</p>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center text-slate-500 text-sm italic">
                    <span>{activeMatch.date}</span>
                    <span>Start match to see moves</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-sky-400 uppercase tracking-[0.3em]">Move {moveIndex}</h2>
                    <div className="text-4xl font-black text-white italic drop-shadow-md">{activeMatch.moves[moveIndex - 1].notation}</div>
                  </div>
                  <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 min-h-[140px]">
                    <p className="text-xl text-slate-200 leading-relaxed font-medium italic">
                      "{activeMatch.moves[moveIndex - 1].commentary}"
                    </p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
                    {activeMatch.moves.map((m, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setMoveIndex(idx + 1)}
                        className={`shrink-0 px-3 py-1 rounded-lg font-mono text-xs transition-all ${moveIndex === idx + 1 ? 'bg-sky-500 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                      >
                        {m.notation}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-800/20 border border-white/5 p-6 rounded-[32px] text-center italic text-slate-500 text-sm">
              Reviewing one of the greatest games in history. Press Read Move to listen to the commentary.
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6 sm:p-10 font-sans text-white overflow-y-auto">
      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-8 gap-6 text-center sm:text-left">
         <button onClick={onBack} className="text-sky-400 font-bold flex items-center gap-2 hover:underline transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Chess Menu
        </button>
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">Famous Matches</h1>
          <p className="text-sky-400 font-mono text-xs sm:text-sm tracking-widest uppercase">The Great Hall of Chess Legends</p>
        </div>
        <div className="hidden sm:block w-32" />
      </header>

      <div className="w-full max-w-6xl mb-8">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-center gap-3 text-amber-200 text-sm font-medium shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>Warning - this section is a work in progress and does not always accurately represent these games</p>
        </div>
      </div>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {FAMOUS_MATCHES.map(match => (
          <button 
            key={match.id} 
            onClick={() => handleMatchSelect(match)}
            className="group bg-white/5 rounded-[40px] p-8 text-left border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-4 border border-sky-500/20">
              Classic Match
            </div>
            <h2 className="text-2xl font-black italic tracking-tighter mb-1 leading-tight">{match.title}</h2>
            <p className="text-slate-400 text-sm font-bold mb-4">{match.players}</p>
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">{match.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sky-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">Step Through &rarr;</span>
              <span className="text-[10px] text-slate-600 font-mono">{match.date}</span>
            </div>
          </button>
        ))}
      </main>

      <footer className="mt-16 text-slate-600 text-xs font-mono uppercase tracking-[0.4em]">
        Scroll to discover more
      </footer>
    </div>
  );
};
