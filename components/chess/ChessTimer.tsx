import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ChessTimerProps {
  onBack: () => void;
}

export const ChessTimer: React.FC<ChessTimerProps> = ({ onBack }) => {
  const [timerWhite, setTimerWhite] = useState(600);
  const [timerBlack, setTimerBlack] = useState(600);
  const [timerActive, setTimerActive] = useState<'w' | 'b' | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInitial, setTimerInitial] = useState(600);
  const timerIntervalRef = useRef<number | null>(null);

  const presets = [
    { label: '1m', value: 60 },
    { label: '3m', value: 180 },
    { label: '5m', value: 300 },
    { label: '10m', value: 600 },
    { label: '30m', value: 1800 },
  ];

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerTick = useCallback(() => {
    if (!timerActive || !timerRunning) return;
    if (timerActive === 'w') {
      setTimerWhite(prev => Math.max(0, prev - 1));
    } else {
      setTimerBlack(prev => Math.max(0, prev - 1));
    }
  }, [timerActive, timerRunning]);

  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = window.setInterval(handleTimerTick, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, handleTimerTick]);

  const switchTimer = (to: 'w' | 'b') => {
    if (!timerRunning && timerActive === null) setTimerRunning(true);
    setTimerActive(to === 'w' ? 'b' : 'w');
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerActive(null);
    setTimerWhite(timerInitial);
    setTimerBlack(timerInitial);
  };

  const setTimerPreset = (val: number) => {
    setTimerInitial(val);
    setTimerWhite(val);
    setTimerBlack(val);
    setTimerRunning(false);
    setTimerActive(null);
  };

  const isWhiteDone = timerWhite <= 0;
  const isBlackDone = timerBlack <= 0;
  const isEitherDone = isWhiteDone || isBlackDone;

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col font-sans select-none overflow-hidden touch-none">
      {/* Black Player Button (Rotated) */}
      <button
        onClick={() => (timerActive === 'b' || !timerRunning) && switchTimer('b')}
        disabled={isEitherDone || (timerRunning && timerActive === 'w')}
        className={`flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 rotate-180 ${timerActive === 'b' ? 'bg-indigo-600' : 'bg-slate-900'} ${isBlackDone ? 'bg-rose-900' : ''} active:opacity-90`}
      >
        <div className="text-white opacity-50 text-base sm:text-2xl font-black uppercase tracking-widest mb-2 sm:mb-4">Black</div>
        <div className={`text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'b' ? 'text-white' : 'text-slate-400'}`}>
          {formatTime(timerBlack)}
        </div>
      </button>

      {/* Center Control Bar */}
      <div className="h-20 sm:h-24 bg-slate-800 flex items-center justify-between px-3 sm:px-6 border-y-4 border-slate-700 z-10 relative shrink-0">
        {/* Home Button */}
        <button 
          onClick={onBack} 
          className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-xl sm:rounded-2xl text-white shrink-0 shadow-lg active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Presets - Scrollable on mobile */}
        <div className="flex-1 overflow-x-auto mx-2 sm:mx-4 no-scrollbar">
          <div className="flex justify-center gap-1.5 sm:gap-4 min-w-max">
            {presets.map(p => (
              <button 
                key={p.value} 
                onClick={() => setTimerPreset(p.value)} 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-sm uppercase transition-all ${timerInitial === p.value ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause and Reset Buttons */}
        <div className="flex gap-1.5 sm:gap-4 shrink-0">
          <button 
            onClick={() => setTimerRunning(!timerRunning)} 
            disabled={isEitherDone} 
            className={`w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-lg active:scale-95 transition-all ${timerRunning ? 'bg-amber-600' : 'bg-emerald-600'} disabled:opacity-20`}
          >
            {timerRunning ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button 
            onClick={resetTimer} 
            className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-xl sm:rounded-2xl text-white transition-all shadow-lg active:scale-95"
            aria-label="Reset Timer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* White Player Button */}
      <button
        onClick={() => (timerActive === 'w' || !timerRunning) && switchTimer('w')}
        disabled={isEitherDone || (timerRunning && timerActive === 'b')}
        className={`flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 ${timerActive === 'w' ? 'bg-indigo-600' : 'bg-slate-900'} ${isWhiteDone ? 'bg-rose-900' : ''} active:opacity-90`}
      >
        <div className={`text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'w' ? 'text-white' : 'text-slate-400'}`}>
          {formatTime(timerWhite)}
        </div>
        <div className="text-white opacity-50 text-base sm:text-2xl font-black uppercase tracking-widest mt-2 sm:mt-4">White</div>
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
