import React, { useState } from 'react';
import { BoardState, INITIAL_BOARD, PIECE_ICONS } from './ChessTypes';

interface ChessSandboxProps {
  onBack: () => void;
}

export const ChessSandbox: React.FC<ChessSandboxProps> = ({ onBack }) => {
  const [board, setBoard] = useState<BoardState>(() => JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(INITIAL_BOARD)));
    setSelectedSquare(null);
  };

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];
    if (selectedSquare) {
      const [selRow, selCol] = selectedSquare;
      if (selRow === row && selCol === col) {
        setSelectedSquare(null);
        return;
      }
      const newBoard = [...board.map(r => [...r])];
      newBoard[row][col] = newBoard[selRow][selCol];
      newBoard[selRow][selCol] = null;
      setBoard(newBoard);
      setSelectedSquare(null);
    } else if (piece) {
      setSelectedSquare([row, col]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
         <button 
          onClick={onBack}
          className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Chess Menu
        </button>
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">Board Sandbox</h1>
        <button 
          onClick={resetBoard}
          className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg text-sm"
        >
          Reset Board
        </button>
      </header>

      <main className="relative group">
        <div className="flex justify-around px-8 mb-2 text-indigo-400/50 font-mono text-xs font-bold uppercase tracking-widest">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <span key={l}>{l}</span>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col justify-around h-[320px] sm:h-[480px] text-indigo-400/50 font-mono text-xs font-bold">
            {[8, 7, 6, 5, 4, 3, 2, 1].map(n => <span key={n}>{n}</span>)}
          </div>
          <div className="grid grid-cols-8 grid-rows-8 border-4 border-slate-700 shadow-2xl rounded-sm overflow-hidden w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]">
            {board.map((row, rIdx) => 
              row.map((piece, cIdx) => {
                const isDark = (rIdx + cIdx) % 2 === 1;
                const isSelected = selectedSquare?.[0] === rIdx && selectedSquare?.[1] === cIdx;
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleSquareClick(rIdx, cIdx)}
                    className={`
                      relative flex items-center justify-center text-3xl sm:text-5xl select-none transition-all duration-200
                      ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'}
                      ${isSelected ? 'ring-inset ring-4 ring-yellow-400 z-10' : ''}
                      hover:opacity-80
                    `}
                  >
                    {piece && (
                      <span className={`
                        ${piece.color === 'w' ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : 'text-slate-900'}
                        transition-transform duration-200 ${isSelected ? 'scale-110' : 'scale-100'}
                      `}>
                        {PIECE_ICONS[`${piece.color}-${piece.type}`]}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </main>
      <footer className="mt-12 text-slate-500 text-sm font-medium text-center">
        Tap a piece to select it, then tap a square to move.
      </footer>
    </div>
  );
};
