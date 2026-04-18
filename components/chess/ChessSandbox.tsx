
import React, { useState } from 'react';
import { BoardState, Color, Piece, PieceType, INITIAL_BOARD, PIECE_ICONS } from './ChessTypes';

interface ChessSandboxProps {
  onBack: () => void;
}

const PIECE_TYPES: PieceType[] = ['k', 'q', 'r', 'b', 'n', 'p'];
const PIECE_NAMES: Record<PieceType, string> = { k: 'King', q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight', p: 'Pawn' };

const cloneBoard = (b: BoardState): BoardState => b.map(r => [...r]);

function getLegalMoves(board: BoardState, row: number, col: number): [number, number][] {
  const piece = board[row][col];
  if (!piece) return [];
  const moves: [number, number][] = [];
  const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  const slide = (dr: number, dc: number) => {
    let r = row + dr, c = col + dc;
    while (inBounds(r, c)) {
      moves.push([r, c]);
      if (board[r][c]) break;
      r += dr; c += dc;
    }
  };

  switch (piece.type) {
    case 'p': {
      const dir = piece.color === 'w' ? -1 : 1;
      const startRow = piece.color === 'w' ? 6 : 1;
      if (inBounds(row + dir, col) && !board[row + dir][col]) {
        moves.push([row + dir, col]);
        if (row === startRow && !board[row + dir * 2][col]) moves.push([row + dir * 2, col]);
      }
      for (const dc of [-1, 1]) {
        if (inBounds(row + dir, col + dc) && board[row + dir][col + dc]) moves.push([row + dir, col + dc]);
      }
      break;
    }
    case 'r': [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => slide(dr, dc)); break;
    case 'b': [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => slide(dr, dc)); break;
    case 'q': [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => slide(dr, dc)); break;
    case 'n': [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc]) => {
      if (inBounds(row+dr, col+dc)) moves.push([row+dr, col+dc]);
    }); break;
    case 'k': [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([dr,dc]) => {
      if (inBounds(row+dr, col+dc)) moves.push([row+dr, col+dc]);
    }); break;
  }
  return moves;
}

const pieceStyle = (color: Color): React.CSSProperties => ({
  color: color === 'w' ? '#ffffff' : '#111827',
  textShadow: color === 'w'
    ? '0 0 3px #000, 0 0 6px #000, 0 0 10px #000'
    : '0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.5)',
});

export const ChessSandbox: React.FC<ChessSandboxProps> = ({ onBack }) => {
  const [board, setBoard] = useState<BoardState>(() => cloneBoard(INITIAL_BOARD));
  const [history, setHistory] = useState<BoardState[]>([]);
  const [future, setFuture] = useState<BoardState[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [palettePiece, setPalettePiece] = useState<Piece | null>(null);

  const commit = (newBoard: BoardState) => {
    setHistory(h => [...h, cloneBoard(board)]);
    setFuture([]);
    setBoard(newBoard);
  };

  const undo = () => {
    if (!history.length) return;
    setFuture(f => [cloneBoard(board), ...f]);
    setBoard(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    setSelectedSquare(null);
    setPalettePiece(null);
  };

  const redo = () => {
    if (!future.length) return;
    setHistory(h => [...h, cloneBoard(board)]);
    setBoard(future[0]);
    setFuture(f => f.slice(1));
    setSelectedSquare(null);
    setPalettePiece(null);
  };

  const resetBoard = () => {
    commit(cloneBoard(INITIAL_BOARD));
    setSelectedSquare(null);
    setPalettePiece(null);
  };

  const legalMoveSet = new Set<string>(
    showHints && selectedSquare && !palettePiece
      ? getLegalMoves(board, selectedSquare[0], selectedSquare[1]).map(([r,c]) => `${r}-${c}`)
      : []
  );

  const handleSquareClick = (bRow: number, bCol: number) => {
    if (palettePiece) {
      const newBoard = cloneBoard(board);
      newBoard[bRow][bCol] = { ...palettePiece };
      commit(newBoard);
      return;
    }

    if (selectedSquare) {
      const [selRow, selCol] = selectedSquare;
      if (selRow === bRow && selCol === bCol) {
        // Second tap on same piece — remove it
        const newBoard = cloneBoard(board);
        newBoard[bRow][bCol] = null;
        commit(newBoard);
        setSelectedSquare(null);
        return;
      }
      const newBoard = cloneBoard(board);
      newBoard[bRow][bCol] = newBoard[selRow][selCol];
      newBoard[selRow][selCol] = null;
      commit(newBoard);
      setSelectedSquare(null);
    } else if (board[bRow][bCol]) {
      setSelectedSquare([bRow, bCol]);
    }
  };

  const files = ['a','b','c','d','e','f','g','h'];
  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? ['1','2','3','4','5','6','7','8'] : ['8','7','6','5','4','3','2','1'];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-3 sm:p-6 font-sans">

      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Chess Menu
        </button>
        <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Board Sandbox</h1>
        <button
          onClick={resetBoard}
          className="px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all text-sm"
        >
          Reset
        </button>
      </header>

      {/* Toolbar */}
      <div className="w-full max-w-2xl flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={undo}
          disabled={!history.length}
          className="px-3 py-1.5 bg-slate-700 text-white text-sm font-bold rounded-lg disabled:opacity-30 hover:bg-slate-600 transition-all"
        >↩ Undo</button>
        <button
          onClick={redo}
          disabled={!future.length}
          className="px-3 py-1.5 bg-slate-700 text-white text-sm font-bold rounded-lg disabled:opacity-30 hover:bg-slate-600 transition-all"
        >↪ Redo</button>
        <button
          onClick={() => { setFlipped(f => !f); setSelectedSquare(null); }}
          className="px-3 py-1.5 bg-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-600 transition-all"
        >⇅ Flip</button>
        <button
          onClick={() => setShowHints(h => !h)}
          className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${showHints ? 'bg-emerald-700 text-white' : 'bg-slate-700 text-slate-400'}`}
        >{showHints ? '● Hints On' : '○ Hints Off'}</button>
        {palettePiece && (
          <button
            onClick={() => setPalettePiece(null)}
            className="px-3 py-1.5 bg-amber-700 text-white text-sm font-bold rounded-lg hover:bg-amber-600 transition-all"
          >✕ Cancel Placing</button>
        )}
      </div>

      {/* Piece Palette */}
      <div className="w-full max-w-2xl mb-4 bg-slate-800 rounded-xl p-3 border border-slate-700">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Place a piece</p>
        <div className="flex gap-1.5 flex-wrap">
          {(['w', 'b'] as Color[]).map(color =>
            PIECE_TYPES.map(type => {
              const key = `${color}-${type}`;
              const isSelected = palettePiece?.color === color && palettePiece?.type === type;
              return (
                <button
                  key={key}
                  title={`${color === 'w' ? 'White' : 'Black'} ${PIECE_NAMES[type]}`}
                  onClick={() => {
                    setSelectedSquare(null);
                    setPalettePiece(isSelected ? null : { color, type });
                  }}
                  className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg transition-all border-2 ${
                    isSelected
                      ? 'bg-amber-500 border-amber-300 scale-110 shadow-lg'
                      : 'bg-slate-700 border-transparent hover:border-slate-500 hover:bg-slate-600'
                  }`}
                  style={{ fontSize: 'clamp(18px, 4vw, 26px)' }}
                >
                  <span style={pieceStyle(color)}>{PIECE_ICONS[key]}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Board */}
      <main>
        {/* File labels */}
        <div className="flex mb-0.5" style={{ paddingLeft: '22px' }}>
          {displayFiles.map(l => (
            <div key={l} className="text-slate-500 font-mono text-xs font-bold uppercase text-center flex-1">{l}</div>
          ))}
        </div>

        <div className="flex items-stretch gap-1">
          {/* Rank labels */}
          <div className="flex flex-col text-slate-500 font-mono text-xs font-bold" style={{ width: '16px' }}>
            {displayRanks.map(n => (
              <div key={n} className="flex-1 flex items-center justify-center">{n}</div>
            ))}
          </div>

          {/* Board grid */}
          <div
            className="grid grid-cols-8 border-2 border-slate-600 shadow-2xl rounded overflow-hidden"
            style={{ width: 'min(82vw, 480px)', height: 'min(82vw, 480px)' }}
          >
            {Array.from({ length: 8 }, (_, dRow) =>
              Array.from({ length: 8 }, (_, dCol) => {
                const bRow = flipped ? 7 - dRow : dRow;
                const bCol = flipped ? 7 - dCol : dCol;
                const piece = board[bRow][bCol];
                const isDark = (dRow + dCol) % 2 === 1;
                const isSelected = selectedSquare?.[0] === bRow && selectedSquare?.[1] === bCol;
                const isHint = legalMoveSet.has(`${bRow}-${bCol}`);

                return (
                  <button
                    key={`${dRow}-${dCol}`}
                    onClick={() => handleSquareClick(bRow, bCol)}
                    className={[
                      'relative flex items-center justify-center select-none transition-colors duration-100',
                      isDark ? 'bg-amber-800 hover:bg-amber-700' : 'bg-amber-100 hover:bg-amber-200',
                      isSelected ? 'ring-inset ring-4 ring-yellow-300 z-10' : '',
                    ].join(' ')}
                    style={{ fontSize: 'clamp(18px, 8vw, 44px)' }}
                  >
                    {/* Empty square hint: green dot */}
                    {isHint && !piece && (
                      <div
                        className="absolute rounded-full bg-emerald-400 opacity-60 pointer-events-none"
                        style={{ width: '34%', height: '34%' }}
                      />
                    )}
                    {/* Capture hint: green ring */}
                    {isHint && piece && (
                      <div className="absolute inset-0 ring-inset ring-4 ring-emerald-400 opacity-60 pointer-events-none" />
                    )}
                    {piece && (
                      <span
                        className={`transition-transform duration-150 ${isSelected ? 'scale-110' : 'scale-100'}`}
                        style={pieceStyle(piece.color)}
                      >
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

      {/* Status */}
      <footer className="mt-5 text-slate-400 text-sm font-medium text-center max-w-xs leading-relaxed">
        {palettePiece
          ? `Tap any square to place ${palettePiece.color === 'w' ? 'White' : 'Black'} ${PIECE_NAMES[palettePiece.type]}`
          : selectedSquare
          ? 'Tap a square to move · Tap same piece again to remove it'
          : 'Tap a piece to select · Use the palette above to add pieces'}
      </footer>
    </div>
  );
};
