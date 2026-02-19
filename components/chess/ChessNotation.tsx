import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BoardState, INITIAL_BOARD, PIECE_ICONS, REPLICATOR_SEQUENCES, ReplicatorSequence } from './ChessTypes';

interface ChessNotationProps {
  onBack: () => void;
}

export const ChessNotation: React.FC<ChessNotationProps> = ({ onBack }) => {
  const [subMode, setSubMode] = useState<'menu' | 'quiz' | 'replicator'>('menu');

  // Helper
  const getSquareName = (r: number, c: number) => `${String.fromCharCode(97 + c)}${8 - r}`;

  // --- QUIZ LOGIC (20 Square Sprint) ---
  const TARGET_TOTAL = 20;
  const [notationTarget, setNotationTarget] = useState<string>('');
  const [correctCount, setCorrectCount] = useState(0);
  const [notationFeedback, setNotationFeedback] = useState<{ text: string, type: 'success' | 'error' | 'none' }>({ text: '', type: 'none' });
  const [quizStatus, setQuizStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  const generateNewNotationTarget = useCallback(() => {
    const r = Math.floor(Math.random() * 8);
    const c = Math.floor(Math.random() * 8);
    setNotationTarget(getSquareName(r, c));
  }, []);

  const startQuiz = () => {
    setCorrectCount(0);
    setElapsedTime(0);
    setQuizStatus('playing');
    setStartTime(Date.now());
    generateNewNotationTarget();
    setNotationFeedback({ text: 'Find the first square!', type: 'none' });
  };

  const formatElapsedTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}s`;
  };

  useEffect(() => {
    if (quizStatus === 'playing') {
      timerRef.current = window.setInterval(() => {
        if (startTime) {
          setElapsedTime(Date.now() - startTime);
        }
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizStatus, startTime]);

  const handleNotationSquareClick = (r: number, c: number) => {
    if (quizStatus !== 'playing') return;

    const clicked = getSquareName(r, c);
    if (clicked === notationTarget) {
      const nextCount = correctCount + 1;
      setCorrectCount(nextCount);
      
      if (nextCount >= TARGET_TOTAL) {
        setQuizStatus('finished');
        setNotationFeedback({ text: 'Amazing! All 20 complete.', type: 'success' });
      } else {
        setNotationFeedback({ text: `Correct! ${clicked}.`, type: 'success' });
        generateNewNotationTarget();
      }
    } else {
      setNotationFeedback({ text: `Nope, that was ${clicked}. Try again!`, type: 'error' });
    }
  };

  // --- REPLICATOR LOGIC ---
  const [activeSequence, setActiveSequence] = useState<ReplicatorSequence | null>(null);
  const [replicatorIndex, setReplicatorIndex] = useState(0);
  const [replicatorBoard, setReplicatorBoard] = useState<BoardState>(() => JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [replicatorFeedback, setReplicatorFeedback] = useState<{ text: string, type: 'success' | 'error' | 'none' }>({ text: '', type: 'none' });
  const [replicatorSelected, setReplicatorSelected] = useState<[number, number] | null>(null);
  const [showHint, setShowHint] = useState(false);

  const selectRandomSequence = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * REPLICATOR_SEQUENCES.length);
    setActiveSequence(REPLICATOR_SEQUENCES[randomIndex]);
    setReplicatorIndex(0);
    setReplicatorBoard(JSON.parse(JSON.stringify(INITIAL_BOARD)));
    setReplicatorFeedback({ text: 'Follow the instructions...', type: 'none' });
    setReplicatorSelected(null);
    setShowHint(false);
  }, []);

  const handleReplicatorSquareClick = (r: number, c: number) => {
    if (!activeSequence) return;
    const challenge = activeSequence.moves[replicatorIndex];
    const piece = replicatorBoard[r][c];
    if (replicatorSelected) {
      const [selR, selC] = replicatorSelected;
      if (selR === r && selC === c) {
        setReplicatorSelected(null);
        return;
      }
      if (selR === challenge.from[0] && selC === challenge.from[1] && r === challenge.to[0] && c === challenge.to[1]) {
        const newB = [...replicatorBoard.map(row => [...row])];
        newB[r][c] = newB[selR][selC];
        newB[selR][selC] = null;
        setReplicatorBoard(newB);
        setReplicatorFeedback({ text: 'Correct move!', type: 'success' });
        setReplicatorSelected(null);
        setShowHint(false);

        setTimeout(() => {
          if (replicatorIndex < activeSequence.moves.length - 1) {
            setReplicatorIndex(i => i + 1);
            setReplicatorFeedback({ text: 'Next challenge...', type: 'none' });
          } else {
            setReplicatorFeedback({ text: 'Sequence complete!', type: 'success' });
          }
        }, 1500);
      } else {
        setReplicatorFeedback({ text: 'Incorrect square. Try again!', type: 'error' });
        setReplicatorSelected(null);
      }
    } else if (piece) {
      setReplicatorSelected([r, c]);
    }
  };

  const resetReplicator = () => {
    selectRandomSequence();
  };

  if (subMode === 'menu') {
    return (
      <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-6 text-white relative font-sans">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-2">Notation</h1>
          <p className="text-indigo-300 text-lg">Master the language of chess.</p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <button onClick={() => setSubMode('quiz')} className="group bg-white/5 hover:bg-white/10 p-8 rounded-[40px] border border-white/10 transition-all flex flex-col items-center text-center space-y-4 shadow-xl">
             <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
            <h2 className="text-2xl font-black italic">20 Square Sprint</h2>
            <p className="text-slate-400">Identify 20 coordinates correctly in the fastest possible time. No labels.</p>
            <span className="text-sky-400 font-bold uppercase text-xs tracking-widest pt-2 group-hover:underline">Start Sprint</span>
          </button>
          <button onClick={() => { setSubMode('replicator'); resetReplicator(); }} className="group bg-white/5 hover:bg-white/10 p-8 rounded-[40px] border border-white/10 transition-all flex flex-col items-center text-center space-y-4 shadow-xl">
             <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
            <h2 className="text-2xl font-black italic">Move Replicator</h2>
            <p className="text-slate-400">Read notation and perform the move on a standard board with labels.</p>
            <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest pt-2 group-hover:underline">Enter Training</span>
          </button>
        </main>
        <footer className="mt-16"><button onClick={onBack} className="text-indigo-400 font-bold hover:underline">Back to Main Menu</button></footer>
      </div>
    );
  }

  if (subMode === 'quiz') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
           <button onClick={() => setSubMode('menu')} className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
             Back
           </button>
           <div className="text-center">
             <h1 className="text-2xl font-black uppercase italic tracking-tighter">20 Square Sprint</h1>
             <p className="text-sky-400 text-xs font-mono tracking-widest uppercase">Blind Coordinate Challenge</p>
           </div>
           <div className="w-20" />
        </header>

        <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Quiz Board */}
          <div className="relative group">
            <div className="grid grid-cols-8 grid-rows-8 border-[12px] border-slate-700 shadow-2xl rounded-xl overflow-hidden w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] bg-slate-800 transition-opacity duration-300">
              {Array.from({ length: 64 }).map((_, i) => {
                const r = Math.floor(i / 8), c = i % 8, isDark = (r + c) % 2 === 1;
                return (
                  <button 
                    key={i} 
                    onClick={() => handleNotationSquareClick(r, c)} 
                    disabled={quizStatus !== 'playing'}
                    className={`
                      relative transition-all duration-100 flex items-center justify-center
                      ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'} 
                      ${quizStatus === 'playing' ? 'hover:bg-sky-400 active:scale-95' : 'cursor-default opacity-50'}
                    `}
                  >
                    {quizStatus === 'finished' && <div className="text-[10px] text-slate-500 font-mono opacity-30 uppercase">{getSquareName(r, c)}</div>}
                  </button>
                );
              })}
            </div>
            {quizStatus === 'idle' && (
              <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center rounded-lg border-2 border-white/10 p-8 text-center">
                 <h2 className="text-3xl font-black mb-4 tracking-tighter">Ready for the Sprint?</h2>
                 <p className="text-slate-400 mb-8 max-w-xs leading-relaxed">Find 20 squares correctly on a blank board. The timer starts as soon as you press the button.</p>
                 <button onClick={startQuiz} className="px-10 py-5 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all active:scale-95 uppercase italic tracking-tight">
                   Start Challenge
                 </button>
              </div>
            )}
            {quizStatus === 'finished' && (
              <div className="absolute inset-0 z-10 bg-emerald-900/90 backdrop-blur-md flex flex-col items-center justify-center rounded-lg border-4 border-emerald-500/50 p-8 text-center">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <h2 className="text-4xl font-black mb-2 tracking-tighter italic">FINISH!</h2>
                 <div className="text-6xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                   {formatElapsedTime(elapsedTime)}
                 </div>
                 <button onClick={startQuiz} className="px-10 py-4 bg-white text-emerald-900 font-black text-xl rounded-2xl shadow-xl transition-all active:scale-95 uppercase italic tracking-tight hover:bg-emerald-50">
                   Play Again
                 </button>
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               
               <h2 className="text-xs font-black text-sky-400 uppercase tracking-[0.3em] mb-4">Target Square</h2>
               <div className="text-[12rem] font-black text-white leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] tracking-tighter">
                 {quizStatus === 'playing' ? notationTarget : '??'}
               </div>
               
               <div className={`mt-8 text-lg font-bold p-4 w-full text-center rounded-2xl border transition-all duration-300 ${
                 notationFeedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                 notationFeedback.type === 'error' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 
                 'bg-slate-800/50 text-slate-500 border-white/5'
               }`}>
                 {notationFeedback.text}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Timer</span>
                  <span className="text-4xl font-black text-white tabular-nums">{formatElapsedTime(elapsedTime)}</span>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Progress</span>
                  <span className="text-4xl font-black text-white tabular-nums">
                    {correctCount}<span className="text-slate-600">/{TARGET_TOTAL}</span>
                  </span>
               </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner">
               <div 
                 className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                 style={{ width: `${(correctCount / TARGET_TOTAL) * 100}%` }}
               />
            </div>
          </div>
        </main>
      </div>
    );
  }

  const challenge = activeSequence?.moves[replicatorIndex];
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
         <button onClick={() => setSubMode('menu')} className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
           Back
         </button>
         <div className="text-center">
           <h1 className="text-2xl font-black uppercase italic tracking-tighter">Move Replicator</h1>
           {activeSequence && <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase">{activeSequence.name}</p>}
         </div>
         <button onClick={resetReplicator} className="text-indigo-400 font-bold hover:text-indigo-300 uppercase text-xs tracking-widest">Next Sequence</button>
      </header>
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col items-center">
           <div className="flex justify-around w-full px-8 mb-2 text-indigo-400/50 font-mono text-[10px] font-bold uppercase tracking-widest max-w-[480px]">
             {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <span key={l}>{l}</span>)}
           </div>
           <div className="flex items-center gap-2">
             <div className="flex flex-col justify-around h-[320px] sm:h-[480px] text-indigo-400/50 font-mono text-[10px] font-bold">
               {[8, 7, 6, 5, 4, 3, 2, 1].map(n => <span key={n}>{n}</span>)}
             </div>
             <div className="grid grid-cols-8 grid-rows-8 border-[6px] border-slate-700 shadow-2xl rounded-sm overflow-hidden w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]">
               {replicatorBoard.map((row, rIdx) => row.map((piece, cIdx) => {
                 const isDark = (rIdx + cIdx) % 2 === 1, isSelected = replicatorSelected?.[0] === rIdx && replicatorSelected?.[1] === cIdx;
                 return (
                   <button key={`${rIdx}-${cIdx}`} onClick={() => handleReplicatorSquareClick(rIdx, cIdx)} className={`relative flex items-center justify-center text-3xl sm:text-5xl select-none ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'} ${isSelected ? 'ring-inset ring-4 ring-yellow-400 z-10 scale-95 shadow-lg' : ''} transition-all duration-200`}>
                     {piece && <span className={piece.color === 'w' ? 'text-white drop-shadow-md' : 'text-slate-900'}>{PIECE_ICONS[`${piece.color}-${piece.type}`]}</span>}
                   </button>
                 );
               }))}
             </div>
           </div>
        </div>
        <div className="space-y-6 flex flex-col h-full justify-center">
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">Current Instruction</h3>
             <div className="text-5xl font-black text-white mb-4 italic tracking-tighter leading-tight">{challenge?.description || 'Loading...'}</div>
             <div className={`text-lg font-bold p-5 rounded-2xl transition-all duration-300 border ${replicatorFeedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : replicatorFeedback.type === 'error' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-slate-800/50 text-slate-500 border-white/5'}`}>{replicatorFeedback.text}</div>
          </div>

          <div className="bg-slate-800/40 p-8 rounded-[32px] border border-white/5 shadow-xl flex flex-col items-start gap-4">
            <div className="flex items-center justify-between w-full">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
                Hint
              </h4>
              <button 
                onClick={() => setShowHint(!showHint)} 
                className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-widest"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>
            {showHint && (
              <p className="text-slate-300 italic text-base leading-relaxed animate-in slide-in-from-top-2 duration-300">
                {challenge?.hint}
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-auto pt-8 px-4">
             {activeSequence && activeSequence.moves.map((_, i) => (
               <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= replicatorIndex ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-800'}`} />
             ))}
          </div>
        </div>
      </main>
    </div>
  );
};
