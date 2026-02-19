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
    { label: '1 min', value: 60 },
    { label: '3 min', value: 180 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '30 min', value: 1800 },
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
    <div className="fixed inset-0 bg-slate-950 flex flex-col font-sans select-none overflow-hidden">
      <button
        onClick={() => (timerActive === 'b' || !timerRunning) && switchTimer('b')}
        disabled={isEitherDone || (timerRunning && timerActive === 'w')}
        className={`flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 rotate-180 ${timerActive === 'b' ? 'bg-indigo-600' : 'bg-slate-900'} ${isBlackDone ? 'bg-rose-900' : ''}`}
      >
        <div className="text-white opacity-50 text-2xl font-black uppercase tracking-widest mb-4">Black</div>
        <div className={`text-9xl md:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'b' ? 'text-white' : 'text-slate-400'}`}>
          {formatTime(timerBlack)}
        </div>
      </button>

      <div className="h-24 bg-slate-800 flex items-center justify-between px-6 border-y-4 border-slate-700 z-10 relative">
        <button onClick={onBack} className="w-16 h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-2xl text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <div className="flex gap-4">
          {presets.map(p => (
            <button key={p.value} onClick={() => setTimerPreset(p.value)} className={`px-4 py-2 rounded-xl font-black text-sm uppercase transition-all ${timerInitial === p.value ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={() => setTimerRunning(!timerRunning)} disabled={isEitherDone} className={`w-16 h-16 flex items-center justify-center rounded-2xl text-white ${timerRunning ? 'bg-amber-600' : 'bg-emerald-600'}`}>
            {timerRunning ? '||' : '>'}
          </button>
          <button onClick={resetTimer} className="w-16 h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-2xl text-white transition-colors">R</button>
        </div>
      </div>

      <button
        onClick={() => (timerActive === 'w' || !timerRunning) && switchTimer('w')}
        disabled={isEitherDone || (timerRunning && timerActive === 'b')}
        className={`flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 ${timerActive === 'w' ? 'bg-indigo-600' : 'bg-slate-900'} ${isWhiteDone ? 'bg-rose-900' : ''}`}
      >
        <div className={`text-9xl md:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'w' ? 'text-white' : 'text-slate-400'}`}>
          {formatTime(timerWhite)}
        </div>
        <div className="text-white opacity-50 text-2xl font-black uppercase tracking-widest mt-4">White</div>
      </button>
    </div>
  );
};
