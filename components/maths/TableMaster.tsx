
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface TableMasterProps {
  onBack: () => void;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Cell {
  row: number;
  col: number;
  expected: number;
  isHidden: boolean;
  userValue: string;
}

export const TableMaster: React.FC<TableMasterProps> = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<number | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const difficultySettings = {
    Easy: 10,
    Medium: 20,
    Hard: 30
  };

  const setupGame = (diff: Difficulty) => {
    const hiddenCount = difficultySettings[diff];
    const newGrid: Cell[][] = [];
    const allCoordinates: [number, number][] = [];

    for (let r = 1; r <= 12; r++) {
      const rowArr: Cell[] = [];
      for (let c = 1; c <= 12; c++) {
        rowArr.push({
          row: r,
          col: c,
          expected: r * c,
          isHidden: false,
          userValue: ''
        });
        allCoordinates.push([r - 1, c - 1]);
      }
      newGrid.push(rowArr);
    }

    for (let i = allCoordinates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCoordinates[i], allCoordinates[j]] = [allCoordinates[j], allCoordinates[i]];
    }

    const targets = allCoordinates.slice(0, hiddenCount);
    targets.forEach(([r, c]) => {
      newGrid[r][c].isHidden = true;
    });

    setGrid(newGrid);
    setDifficulty(diff);
    setStartTime(Date.now());
    setIsFinished(false);
    setElapsedTime(0);

    // Auto-focus first input after a short delay to allow render
    setTimeout(() => {
      const firstInput = gridContainerRef.current?.querySelector('input');
      if (firstInput instanceof HTMLInputElement) {
        firstInput.focus();
      }
    }, 100);
  };

  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished]);

  const handleInputChange = (r: number, c: number, value: string) => {
    if (isFinished) return;
    
    if (value !== '' && !/^\d+$/.test(value)) return;

    const newGrid = [...grid.map(row => row.map(cell => ({ ...cell })))];
    const cell = newGrid[r][c];
    cell.userValue = value;
    setGrid(newGrid);

    const isCorrect = parseInt(value) === cell.expected;

    // Auto-advance to next empty input if correct
    if (isCorrect) {
      const inputs = Array.from(gridContainerRef.current?.querySelectorAll('input') || []);
      const currentIndex = inputs.indexOf(document.activeElement as HTMLInputElement);
      if (currentIndex !== -1) {
        // Find next empty input
        for (let i = currentIndex + 1; i < inputs.length; i++) {
          const nextInput = inputs[i] as HTMLInputElement;
          if (nextInput.value === '') {
            nextInput.focus();
            break;
          }
        }
      }
    }

    const hiddenCells = newGrid.flat().filter(cell => cell.isHidden);
    const allCorrect = hiddenCells.every(cell => parseInt(cell.userValue) === cell.expected);
    
    if (allCorrect) {
      setIsFinished(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputs = Array.from(gridContainerRef.current?.querySelectorAll('input') || []);
      const currentIndex = inputs.indexOf(e.currentTarget);
      if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
        (inputs[currentIndex + 1] as HTMLInputElement).focus();
      }
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const deciseconds = Math.floor((ms % 1000) / 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;
  };

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="max-w-2xl w-full text-center space-y-12">
          <header className="space-y-4">
             <div className="mx-auto bg-orange-500/20 p-6 rounded-3xl w-24 h-24 flex items-center justify-center backdrop-blur-md border border-orange-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </div>
             <h1 className="text-5xl font-black tracking-tighter uppercase italic">Table Master</h1>
             <p className="text-slate-400 text-xl font-medium">Select your difficulty level to begin the sprint.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setupGame(d)}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-orange-500 transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col items-center space-y-4 overflow-hidden"
              >
                <div className="text-3xl font-black italic uppercase tracking-tighter group-hover:scale-110 transition-transform">{d}</div>
                <div className="text-slate-500 group-hover:text-white/80 font-bold uppercase tracking-widest text-xs">
                  {difficultySettings[d]} Gaps
                </div>
              </button>
            ))}
          </div>

          <button onClick={onBack} className="text-slate-500 font-bold hover:text-white transition-colors underline decoration-2 underline-offset-8">
            Back to Maths Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-hidden">
      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <button onClick={() => setDifficulty(null)} className="text-orange-500 font-bold flex items-center gap-2 hover:text-orange-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Change Difficulty
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Table Master</h2>
          <p className="text-orange-400 text-xs font-mono tracking-widest uppercase">{difficulty} Mode</p>
        </div>

        <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time</span>
          <span className="text-2xl font-black tabular-nums tracking-tighter">{formatTime(elapsedTime)}</span>
        </div>
      </header>

      <main className="w-full max-w-6xl flex flex-col items-center overflow-hidden flex-grow">
        <div 
          ref={gridContainerRef}
          className="relative bg-slate-800 p-2 sm:p-4 rounded-[2rem] border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-auto w-full max-h-full"
        >
          <div className="inline-grid grid-cols-[3rem_repeat(12,minmax(2.5rem,1fr))] sm:grid-cols-[4rem_repeat(12,minmax(3.5rem,1fr))] gap-1 sm:gap-2">
            {/* Top-Left Corner (Sticky) */}
            <div className="sticky left-0 top-0 z-30 w-full aspect-square bg-slate-700 rounded-lg flex items-center justify-center font-black text-orange-500 text-xs sm:text-base border border-slate-600 shadow-md">
              X
            </div>
            
            {/* Column Headers (Sticky Top) */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`hc-${i}`} className="sticky top-0 z-20 w-full aspect-square bg-slate-800/95 border border-orange-500/40 rounded-lg flex items-center justify-center font-black text-orange-500 text-sm sm:text-lg shadow-sm backdrop-blur-sm">
                {i + 1}
              </div>
            ))}

            {/* Grid Rows */}
            {grid.map((row, rIdx) => (
              <React.Fragment key={`row-${rIdx}`}>
                {/* Row Header (Sticky Left) */}
                <div className="sticky left-0 z-20 w-full aspect-square bg-slate-800/95 border border-orange-500/40 rounded-lg flex items-center justify-center font-black text-orange-500 text-sm sm:text-lg shadow-sm backdrop-blur-sm">
                  {rIdx + 1}
                </div>
                
                {/* Cells */}
                {row.map((cell, cIdx) => {
                  if (cell.isHidden) {
                    const isCorrect = parseInt(cell.userValue) === cell.expected;
                    return (
                      <div key={`${rIdx}-${cIdx}`} className="relative group">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cell.userValue}
                          onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                          onKeyDown={handleKeyDown}
                          className={`w-full aspect-square border-2 rounded-lg text-center font-black text-sm sm:text-xl transition-all outline-none shadow-inner
                            ${isCorrect 
                              ? 'bg-emerald-500 border-emerald-600 text-white ring-2 ring-emerald-400/50' 
                              : cell.userValue === '' 
                                ? 'bg-white border-slate-300 text-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50' 
                                : 'bg-rose-100 border-rose-400 text-rose-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/50'
                            }
                          `}
                          placeholder="?"
                          maxLength={3}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={`${rIdx}-${cIdx}`} className="w-full aspect-square bg-slate-900/30 border border-white/5 rounded-lg flex items-center justify-center font-bold text-slate-400 text-xs sm:text-base">
                      {cell.expected}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {isFinished && (
            <div className="absolute inset-0 z-50 bg-emerald-900/90 backdrop-blur-xl flex flex-col items-center justify-center rounded-[1.8rem] border-4 border-emerald-500 p-8 text-center animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
               <h3 className="text-5xl font-black mb-2 tracking-tighter italic text-white uppercase">Table Master!</h3>
               <p className="text-emerald-100 text-xl font-medium mb-8">You completed the {difficulty} grid in</p>
               <div className="text-7xl font-black text-white mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] tabular-nums tracking-tighter">
                 {formatTime(elapsedTime)}
               </div>
               <div className="flex flex-col sm:flex-row gap-4">
                 <button onClick={() => setDifficulty(null)} className="px-10 py-4 bg-white text-emerald-900 font-black text-xl rounded-2xl shadow-xl transition-all active:scale-95 uppercase italic tracking-tight hover:bg-emerald-50">
                   Play Again
                 </button>
                 <button onClick={onBack} className="px-10 py-4 bg-emerald-700/50 text-white font-black text-xl rounded-2xl shadow-xl transition-all active:scale-95 uppercase italic tracking-tight hover:bg-emerald-700 border border-white/20">
                   Finish
                 </button>
               </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-slate-500 text-xs sm:text-sm italic shrink-0">
          Tip: Correct answers turn green and headers stay visible as you scroll!
        </p>
      </main>

      <style>{`
        input::placeholder {
          color: #94a3b8;
          opacity: 0.5;
        }
        /* Custom scrollbar for the grid */
        .overflow-auto::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 10px;
        }
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
};
