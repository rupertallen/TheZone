import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';

interface ChessScreenProps {
  onGoBack: () => void;
}

type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
type Color = 'w' | 'b';

interface Piece {
  type: PieceType;
  color: Color;
}

type BoardState = (Piece | null)[][];

const INITIAL_BOARD: BoardState = [
  [
    { type: 'r', color: 'b' }, { type: 'n', color: 'b' }, { type: 'b', color: 'b' }, { type: 'q', color: 'b' },
    { type: 'k', color: 'b' }, { type: 'b', color: 'b' }, { type: 'n', color: 'b' }, { type: 'r', color: 'b' }
  ],
  Array(8).fill({ type: 'p', color: 'b' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'p', color: 'w' }),
  [
    { type: 'r', color: 'w' }, { type: 'n', color: 'w' }, { type: 'b', color: 'w' }, { type: 'q', color: 'w' },
    { type: 'k', color: 'w' }, { type: 'b', color: 'w' }, { type: 'n', color: 'w' }, { type: 'r', color: 'w' }
  ],
];

const PIECE_ICONS: Record<string, string> = {
  'w-p': '♙', 'w-r': '♖', 'w-n': '♘', 'w-b': '♗', 'w-q': '♕', 'w-k': '♔',
  'b-p': '♟', 'b-r': '♜', 'b-n': '♞', 'b-b': '♝', 'b-q': '♛', 'b-k': '♚'
};

interface MoveChallenge {
  description: string;
  from: [number, number];
  to: [number, number];
  hint: string;
}

const REPLICATOR_CHALLENGES: MoveChallenge[] = [
  { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "Move the King's Pawn forward two squares." },
  { description: "Black responds with c5", from: [1, 2], to: [3, 2], hint: "The Sicilian Defense: Black's c-pawn moves forward." },
  { description: "White develops Nf3", from: [7, 6], to: [5, 5], hint: "The King's Knight moves to f3." },
  { description: "Black plays d6", from: [1, 3], to: [2, 3], hint: "A solid pawn move defending the center." },
  { description: "White plays d4", from: [6, 3], to: [4, 3], hint: "Challenging the center immediately." },
  { description: "Black plays Nc6", from: [0, 1], to: [2, 2], hint: "The Queen's Knight develops to c6." },
  { description: "White plays Bb5", from: [7, 5], to: [3, 1], hint: "The Bishop pins the Knight or pressures the position." },
];

interface Opening {
  id: string;
  name: string;
  category: string;
  moves: string;
  notations: string[];
  description: string;
  history: string;
  boardMoves: [number, number, number, number][]; // [fromRow, fromCol, toRow, toCol]
}

const OPENINGS: Opening[] = [
  {
    id: 'ruy-lopez',
    category: 'The Big Three',
    name: 'Ruy Lopez',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
    notations: ['1. e4', '1... e5', '2. Nf3', '2... Nc6', '3. Bb5'],
    description: 'One of the oldest and most deeply studied openings. It focuses on pressure against Black\'s knight on c6, aiming to weaken the center control.',
    history: 'Also known as the Spanish Opening, it is named after the 16th-century Spanish priest Ruy López de Segura, who published one of the first major chess books in 1561. It remains a staple at the World Championship level.',
    boardMoves: [[6, 4, 4, 4], [1, 4, 3, 4], [7, 6, 5, 5], [0, 1, 2, 2], [7, 5, 3, 1]]
  },
  {
    id: 'sicilian',
    category: 'The Big Three',
    name: 'Sicilian Defense',
    moves: '1.e4 c5',
    notations: ['1. e4', '1... c5'],
    description: 'Black’s most aggressive response to White’s king pawn. By playing c5, Black creates an asymmetrical position, often leading to sharp, tactical struggles.',
    history: 'The opening dates back to the late 16th century and was mentioned by Giulio Polerio. It exploded in popularity during the 20th century as it was found to be the most successful defense for Black against 1.e4.',
    boardMoves: [[6, 4, 4, 4], [1, 2, 3, 2]]
  },
  {
    id: 'queens-gambit',
    category: 'The Big Three',
    name: 'Queen’s Gambit',
    moves: '1.d4 d5 2.c4',
    notations: ['1. d4', '1... d5', '2. c4'],
    description: 'White offers a flank pawn (the c-pawn) to entice Black into giving up center control. If Black takes it, White aims to build a powerful center with e4.',
    history: 'The Queen\'s Gambit is one of the oldest known openings, mentioned in the Göttingen manuscript of 1490. It gained massive mainstream fame recently due to the 2020 Netflix series of the same name.',
    boardMoves: [[6, 3, 4, 3], [1, 3, 3, 3], [6, 2, 4, 2]]
  },
  {
    id: 'italian-game',
    category: 'Classic Open Games',
    name: 'Italian Game',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4',
    notations: ['1. e4', '1... e5', '2. Nf3', '2... Nc6', '3. Bc4'],
    description: 'A classic developing opening. White places the bishop on c4 to target Black\'s weakest point: the f7 pawn, which is only protected by the king.',
    history: 'Developed by players like Damiano and Polerio in the 16th century, and later refined by Greco. It is often the first "real" opening taught to beginners because it illustrates fundamental opening principles.',
    boardMoves: [[6, 4, 4, 4], [1, 4, 3, 4], [7, 6, 5, 5], [0, 1, 2, 2], [7, 5, 3, 2]]
  },
  {
    id: 'french-defense',
    category: 'Classic Open Games',
    name: 'French Defense',
    moves: '1.e4 e6',
    notations: ['1. e4', '1... e6'],
    description: 'Black prepares to challenge the center with d5. It creates a solid structure but often leaves Black with a "bad" light-squared bishop blocked by its own pawns.',
    history: 'Named after a match played by correspondence between the cities of London and Paris in 1834, where the French players used this defense successfully.',
    boardMoves: [[6, 4, 4, 4], [1, 4, 2, 4]]
  },
  {
    id: 'caro-kann',
    category: 'Classic Open Games',
    name: 'Caro-Kann Defense',
    moves: '1.e4 c6',
    notations: ['1. e4', '1... c6'],
    description: 'Similar to the French but more solid. Black plays c6 to support d5 without blocking the light-squared bishop, allowing it to develop outside the pawn chain.',
    history: 'Named after Horatio Caro and Marcus Kann, who analyzed it in the late 19th century. It is favored by positional players like Anatoly Karpov for its resilience.',
    boardMoves: [[6, 4, 4, 4], [1, 2, 2, 2]]
  },
  {
    id: 'scandinavian',
    category: 'Classic Open Games',
    name: 'Scandinavian Defense',
    moves: '1.e4 d5',
    notations: ['1. e4', '1... d5'],
    description: 'Black immediately strikes at the center. It forces White to trade or move the e4 pawn, often resulting in an early queen development for Black.',
    history: 'One of the oldest recorded openings, it was played in the 1475 poem "Scachs d\'amor." It is also known as the Center Counter Defense.',
    boardMoves: [[6, 4, 4, 4], [1, 3, 3, 3]]
  },
  {
    id: 'kings-gambit',
    category: 'Classic Open Games',
    name: 'King’s Gambit',
    moves: '1.e4 e5 2.f4',
    notations: ['1. e4', '1... e5', '2. f4'],
    description: 'A romantic opening where White sacrifices a pawn to remove Black\'s center pawn and open lines for an all-out attack on the king.',
    history: 'The King\'s Gambit was the dominant opening of the 19th-century "Romantic Era" of chess. It fell out of favor as defensive techniques improved but remains a wild weapon today.',
    boardMoves: [[6, 4, 4, 4], [1, 4, 3, 4], [6, 5, 4, 5]]
  },
  {
    id: 'kings-indian',
    category: 'Strategic Closed Games',
    name: 'King’s Indian Defense',
    moves: '1.d4 Nf6 2.c4 g6',
    notations: ['1. d4', '1... Nf6', '2. c4', '2... g6'],
    description: 'A "hypermodern" defense where Black allows White to occupy the center with pawns, planning to attack and undermine it later with pieces.',
    history: 'Once considered dubious, it became a lethal weapon in the hands of legends like Garry Kasparov and Bobby Fischer. It often leads to incredibly complex and tactical positions.',
    boardMoves: [[6, 3, 4, 3], [0, 6, 2, 5], [6, 2, 4, 2], [1, 6, 2, 6]]
  },
  {
    id: 'slav-defense',
    category: 'Strategic Closed Games',
    name: 'Slav Defense',
    moves: '1.d4 d5 2.c4 c6',
    notations: ['1. d4', '1... d5', '2. c4', '2... c6'],
    description: 'One of the most reliable ways for Black to meet the Queen’s Gambit. By playing c6, Black supports the center while keeping the bishop diagonal open.',
    history: 'Popularized in the early 20th century, particularly by masters from Slavic countries. It is known as one of the hardest defenses to crack at the master level.',
    boardMoves: [[6, 3, 4, 3], [1, 3, 3, 3], [6, 2, 4, 2], [1, 2, 2, 2]]
  },
  {
    id: 'london-system',
    category: 'Strategic Closed Games',
    name: 'London System',
    moves: '1.d4 d5 2.Bf4',
    notations: ['1. d4', '1... d5', '2. Bf4'],
    description: 'A flexible, solid system for White that can be played against almost any Black response. It focuses on a sturdy pawn pyramid and a strong dark-squared bishop.',
    history: 'The opening was popularized after a 1922 tournament in London. In recent years, it has become incredibly popular at all levels due to its "plug-and-play" nature.',
    boardMoves: [[6, 3, 4, 3], [1, 3, 3, 3], [7, 2, 4, 5]]
  },
  {
    id: 'nimzo-indian',
    category: 'Strategic Closed Games',
    name: 'Nimzo-Indian Defense',
    moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4',
    notations: ['1. d4', '1... Nf6', '2. c4', '2... e6', '3. Nc3', '3... Bb4'],
    description: 'Black pins the knight on c3 to prevent White from playing e4 and to pressure the center. It is highly flexible and strategically deep.',
    history: 'Named after Aron Nimzowitsch, who introduced it in the early 20th century. It is widely considered one of the most reliable and sophisticated responses to 1.d4.',
    boardMoves: [[6, 3, 4, 3], [0, 6, 2, 5], [6, 2, 4, 2], [1, 4, 2, 4], [7, 1, 5, 2], [0, 5, 4, 1]]
  },
  {
    id: 'english-opening',
    category: 'Flank & Others',
    name: 'English Opening',
    moves: '1.c4',
    notations: ['1. c4'],
    description: 'A flexible flank opening. White fights for the center from the side, often leading to positions that resemble a Sicilian Defense but with colors reversed.',
    history: 'Named after Howard Staunton, the English master who popularized it in the mid-19th century. It is a favorite of strategic players like Mikhail Botvinnik.',
    boardMoves: [[6, 2, 4, 2]]
  },
  {
    id: 'reti-opening',
    category: 'Flank & Others',
    name: 'Réti Opening',
    moves: '1.Nf3',
    notations: ['1. Nf3'],
    description: 'A hypermodern opening that avoids committing central pawns early. White develops the king\'s knight first, keeping options open for e4, d4, or c4.',
    history: 'Named after Richard Réti, who used it to defeat World Champion José Raúl Capablanca in 1924, ending his eight-year undefeated streak.',
    boardMoves: [[7, 6, 5, 5]]
  },
  {
    id: 'dutch-defense',
    category: 'Flank & Others',
    name: 'Dutch Defense',
    moves: '1.d4 f5',
    notations: ['1. d4', '1... f5'],
    description: 'An aggressive attempt by Black to unbalance the game. By playing f5, Black controls the e4 square and prepares for a kingside attack.',
    history: 'The opening was first suggested in the 18th century by Elias Stein in his book published in the Netherlands. It remains a "double-edged" weapon today.',
    boardMoves: [[6, 3, 4, 3], [1, 5, 3, 5]]
  }
];

const MiniBoard: React.FC<{ moves: [number, number, number, number][] }> = ({ moves }) => {
  const board = useMemo(() => {
    const b = JSON.parse(JSON.stringify(INITIAL_BOARD));
    moves.forEach(([fr, fc, tr, tc]) => {
      if (b[fr][fc]) {
        b[tr][tc] = b[fr][fc];
        b[fr][fc] = null;
      }
    });
    return b;
  }, [moves]);

  return (
    <div className="grid grid-cols-8 grid-rows-8 border-2 border-slate-700 w-full aspect-square bg-indigo-900 rounded overflow-hidden pointer-events-none">
      {board.map((row: any, rIdx: number) => 
        row.map((piece: any, cIdx: number) => (
          <div 
            key={`${rIdx}-${cIdx}`}
            className={`
              flex items-center justify-center text-[10px] sm:text-xs select-none
              ${(rIdx + cIdx) % 2 === 1 ? 'bg-indigo-800' : 'bg-indigo-100'}
            `}
          >
            {piece && (
              <span className={piece.color === 'w' ? 'text-white' : 'text-slate-900'}>
                {PIECE_ICONS[`${piece.color}-${piece.type}`]}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export const ChessScreen: React.FC<ChessScreenProps> = ({ onGoBack }) => {
  const [board, setBoard] = useState<BoardState>(() => JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [mode, setMode] = useState<'menu' | 'play' | 'openings' | 'opening-detail' | 'notation-menu' | 'notation-quiz' | 'notation-replicator' | 'timer'>('menu');
  const [activeOpening, setActiveOpening] = useState<Opening | null>(null);
  const [openingStep, setOpeningStep] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Notation Quiz states
  const [notationTarget, setNotationTarget] = useState<string>('');
  const [notationScore, setNotationScore] = useState(0);
  const [notationFeedback, setNotationFeedback] = useState<{ text: string, type: 'success' | 'error' | 'none' }>({ text: '', type: 'none' });

  // Move Replicator states
  const [replicatorIndex, setReplicatorIndex] = useState(0);
  const [replicatorBoard, setReplicatorBoard] = useState<BoardState>(() => JSON.parse(JSON.stringify(INITIAL_BOARD)));
  const [replicatorFeedback, setReplicatorFeedback] = useState<{ text: string, type: 'success' | 'error' | 'none' }>({ text: '', type: 'none' });
  const [replicatorSelected, setReplicatorSelected] = useState<[number, number] | null>(null);

  // Chess Timer states
  const [timerWhite, setTimerWhite] = useState(600); // 10 mins in seconds
  const [timerBlack, setTimerBlack] = useState(600);
  const [timerActive, setTimerActive] = useState<'w' | 'b' | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInitial, setTimerInitial] = useState(600);
  // Fix: Use number for browser environment instead of NodeJS.Timeout
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
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, handleTimerTick]);

  const switchTimer = (to: 'w' | 'b') => {
    if (!timerRunning && timerActive === null) {
      setTimerRunning(true);
    }
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

  // Stop speech synthesis when navigating away or changing opening
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [mode, activeOpening]);

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

  const handleOpeningSelect = (op: Opening) => {
    setActiveOpening(op);
    setMode('opening-detail');
    setOpeningStep(0);
  };

  const getOpeningBoardState = (op: Opening, step: number) => {
    const b = JSON.parse(JSON.stringify(INITIAL_BOARD));
    for (let i = 0; i < step; i++) {
      const [fr, fc, tr, tc] = op.boardMoves[i];
      if (b[fr][fc]) {
        b[tr][tc] = b[fr][fc];
        b[fr][fc] = null;
      }
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

  // Notation Quiz Logic
  const getSquareName = (r: number, c: number) => `${String.fromCharCode(97 + c)}${8 - r}`;
  
  const generateNewNotationTarget = useCallback(() => {
    const r = Math.floor(Math.random() * 8);
    const c = Math.floor(Math.random() * 8);
    setNotationTarget(getSquareName(r, c));
    setNotationFeedback({ text: 'Identify the square...', type: 'none' });
  }, []);

  useEffect(() => {
    if (mode === 'notation-quiz') {
      generateNewNotationTarget();
    }
  }, [mode, generateNewNotationTarget]);

  const handleNotationSquareClick = (r: number, c: number) => {
    const clicked = getSquareName(r, c);
    if (clicked === notationTarget) {
      setNotationScore(s => s + 1);
      setNotationFeedback({ text: `Correct! ${clicked}.`, type: 'success' });
      setTimeout(generateNewNotationTarget, 800);
    } else {
      setNotationFeedback({ text: `Nope, that was ${clicked}.`, type: 'error' });
    }
  };

  // Move Replicator Logic
  const handleReplicatorSquareClick = (r: number, c: number) => {
    const challenge = REPLICATOR_CHALLENGES[replicatorIndex];
    const piece = replicatorBoard[r][c];

    if (replicatorSelected) {
      const [selR, selC] = replicatorSelected;
      if (selR === r && selC === c) {
        setReplicatorSelected(null);
        return;
      }

      // Check if move matches challenge
      if (selR === challenge.from[0] && selC === challenge.from[1] && r === challenge.to[0] && c === challenge.to[1]) {
        // Success
        const newB = [...replicatorBoard.map(row => [...row])];
        newB[r][c] = newB[selR][selC];
        newB[selR][selC] = null;
        setReplicatorBoard(newB);
        setReplicatorFeedback({ text: 'Correct move!', type: 'success' });
        setReplicatorSelected(null);
        
        setTimeout(() => {
          if (replicatorIndex < REPLICATOR_CHALLENGES.length - 1) {
            setReplicatorIndex(i => i + 1);
            setReplicatorFeedback({ text: 'Next challenge...', type: 'none' });
          } else {
            setReplicatorFeedback({ text: 'All challenges complete!', type: 'success' });
          }
        }, 1500);
      } else {
        // Failure
        setReplicatorFeedback({ text: 'Not quite. Follow the notation!', type: 'error' });
        setReplicatorSelected(null);
      }
    } else if (piece) {
      setReplicatorSelected([r, c]);
    }
  };

  const resetReplicator = () => {
    setReplicatorIndex(0);
    setReplicatorBoard(JSON.parse(JSON.stringify(INITIAL_BOARD)));
    setReplicatorFeedback({ text: 'Start with the first move...', type: 'none' });
    setReplicatorSelected(null);
  };

  if (mode === 'play') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
        <header className="w-full max-w-2xl flex justify-between items-center mb-8">
           <button 
            onClick={() => setMode('menu')}
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
  }

  if (mode === 'openings') {
    const categories = Array.from(new Set(OPENINGS.map(o => o.category)));
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6 sm:p-10 font-sans text-slate-800">
        <header className="w-full max-w-5xl flex justify-between items-center mb-12">
           <button 
            onClick={() => setMode('menu')}
            className="text-indigo-600 font-bold flex items-center gap-2 hover:underline"
          >
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
              <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest pl-2 border-l-4 border-indigo-500">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {OPENINGS.filter(o => o.category === category).map(opening => (
                  <button 
                    key={opening.id} 
                    onClick={() => handleOpeningSelect(opening)}
                    className="group bg-white rounded-3xl p-6 shadow-xl border border-slate-200 flex flex-col gap-4 text-left hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-full max-w-[160px] mx-auto pointer-events-none group-hover:scale-105 transition-transform">
                      <MiniBoard moves={opening.boardMoves} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{opening.name}</h3>
                      <div className="text-indigo-600 font-mono text-xs bg-indigo-50 py-1 px-3 rounded-lg inline-block">
                        {opening.moves}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {opening.description}
                      </p>
                    </div>
                    <div className="mt-auto text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                      Learn moves
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  if (mode === 'opening-detail' && activeOpening) {
    const currentBoard = getOpeningBoardState(activeOpening, openingStep);
    const lastMove = openingStep > 0 ? activeOpening.notations[openingStep - 1] : "Starting position";

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
           <button 
            onClick={() => setMode('openings')}
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
            {isSpeaking ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Stop
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                Read Aloud
              </>
            )}
          </button>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-12">
          {/* Left Side: Board and Controls */}
          <div className="flex flex-col items-center gap-8 bg-slate-800/40 p-6 sm:p-10 rounded-[40px] border border-white/5 backdrop-blur-sm shadow-2xl">
            {/* Main Board */}
            <div className="grid grid-cols-8 grid-rows-8 border-8 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] transition-transform duration-500 transform hover:scale-[1.02]">
              {currentBoard.map((row: any, rIdx: number) => 
                row.map((piece: any, cIdx: number) => {
                  const isDark = (rIdx + cIdx) % 2 === 1;
                  const isLastMoveFrom = openingStep > 0 && activeOpening.boardMoves[openingStep - 1][0] === rIdx && activeOpening.boardMoves[openingStep - 1][1] === cIdx;
                  const isLastMoveTo = openingStep > 0 && activeOpening.boardMoves[openingStep - 1][2] === rIdx && activeOpening.boardMoves[openingStep - 1][3] === cIdx;

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`
                        relative flex items-center justify-center text-3xl sm:text-5xl select-none transition-all duration-300
                        ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'}
                        ${isLastMoveTo ? 'bg-yellow-200/40' : ''}
                        ${isLastMoveFrom ? 'bg-yellow-400/20' : ''}
                      `}
                    >
                      {piece && (
                        <span className={`
                          ${piece.color === 'w' ? 'text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]' : 'text-slate-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.2)]'}
                          animate-in fade-in zoom-in duration-300
                        `}>
                          {PIECE_ICONS[`${piece.color}-${piece.type}`]}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-6 bg-slate-900/80 p-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
               <button 
                onClick={() => setOpeningStep(0)}
                disabled={openingStep === 0}
                className="p-4 hover:bg-white/10 text-white rounded-full disabled:opacity-20 transition-all active:scale-90"
                title="Start"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => setOpeningStep(s => Math.max(0, s - 1))}
                disabled={openingStep === 0}
                className="p-4 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-full disabled:opacity-20 transition-all active:scale-90"
                title="Previous Move"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="flex flex-col items-center min-w-[100px]">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Step</span>
                <div className="font-mono font-black text-2xl text-white">
                  {openingStep} <span className="text-slate-500">/</span> {activeOpening.boardMoves.length}
                </div>
              </div>

              <button 
                onClick={() => setOpeningStep(s => Math.min(activeOpening.boardMoves.length, s + 1))}
                disabled={openingStep === activeOpening.boardMoves.length}
                className="p-4 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-full disabled:opacity-20 transition-all active:scale-90"
                title="Next Move"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button 
                onClick={() => setOpeningStep(activeOpening.boardMoves.length)}
                disabled={openingStep === activeOpening.boardMoves.length}
                className="p-4 hover:bg-white/10 text-white rounded-full disabled:opacity-20 transition-all active:scale-90"
                title="End"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Right Side: Information Panels */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] shadow-xl backdrop-blur-sm">
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Current Move
              </h3>
              <div className="flex items-center gap-6">
                <div className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">
                  {openingStep === 0 ? "..." : lastMove}
                </div>
                <div className="h-10 w-px bg-white/10" />
                <p className="text-slate-400 leading-tight italic max-w-[140px]">
                  {openingStep === 0 
                    ? "Game start. Set up your pieces." 
                    : openingStep === activeOpening.boardMoves.length 
                    ? "Full sequence illustrated." 
                    : `Move ${openingStep} of the line.`
                  }
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] shadow-xl space-y-8">
              <div>
                <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Strategy & Concept
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {activeOpening.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-black text-rose-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  History & Origin
                </h3>
                <p className="text-slate-400 leading-relaxed italic text-base">
                  {activeOpening.history}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-[24px] border border-white/5">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Timeline Explorer</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setOpeningStep(0)}
                  className={`px-4 py-2 rounded-xl font-mono text-sm border transition-all ${openingStep === 0 ? 'bg-slate-600 border-slate-400 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-700'}`}
                >
                  Start
                </button>
                {activeOpening.notations.map((note, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setOpeningStep(idx + 1)}
                    className={`
                      px-4 py-2 rounded-xl font-mono text-sm border transition-all
                      ${openingStep === idx + 1 
                        ? 'bg-indigo-600 border-indigo-400 text-white scale-105 shadow-lg' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }
                    `}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'notation-menu') {
    return (
      <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative font-sans">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-2">Notation</h1>
          <p className="text-indigo-300 text-lg">Master the language of chess.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <button 
            onClick={() => setMode('notation-quiz')}
            className="group bg-white/5 hover:bg-white/10 p-8 rounded-[40px] border border-white/10 transition-all flex flex-col items-center text-center space-y-4"
          >
            <div className="bg-sky-500/20 p-6 rounded-full group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-black italic">Coordinate Quiz</h2>
            <p className="text-slate-400">Can you identify squares without any labels? Test your spatial awareness.</p>
            <span className="text-sky-400 font-black uppercase text-xs tracking-widest pt-4">Start Challenge</span>
          </button>

          <button 
            onClick={() => { setMode('notation-replicator'); resetReplicator(); }}
            className="group bg-white/5 hover:bg-white/10 p-8 rounded-[40px] border border-white/10 transition-all flex flex-col items-center text-center space-y-4"
          >
            <div className="bg-emerald-500/20 p-6 rounded-full group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-black italic">Move Replicator</h2>
            <p className="text-slate-400">Read a move in algebraic notation and perform it on the board.</p>
            <span className="text-emerald-400 font-black uppercase text-xs tracking-widest pt-4">Enter Training</span>
          </button>
        </main>

        <footer className="mt-16">
          <button onClick={() => setMode('menu')} className="text-indigo-400 font-bold hover:underline">Back to Main Menu</button>
        </footer>
      </div>
    );
  }

  if (mode === 'notation-quiz') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
           <button 
            onClick={() => setMode('notation-menu')}
            className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Blind Quiz</h1>
            <p className="text-indigo-400 text-xs font-mono tracking-widest uppercase">No Labels Mode</p>
          </div>
          <div className="hidden sm:block w-20" />
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center">
             {/* Quiz Board (No labels) */}
             <div className="grid grid-cols-8 grid-rows-8 border-8 border-slate-700 shadow-2xl rounded-lg overflow-hidden w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]">
               {Array.from({ length: 64 }).map((_, i) => {
                 const r = Math.floor(i / 8);
                 const c = i % 8;
                 const isDark = (r + c) % 2 === 1;
                 return (
                   <button
                     key={i}
                     onClick={() => handleNotationSquareClick(r, c)}
                     className={`
                       relative flex items-center justify-center transition-colors duration-200
                       ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'}
                       hover:bg-yellow-400/50
                     `}
                   />
                 );
               })}
             </div>
          </div>

          <div className="space-y-8 bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-sm shadow-2xl flex flex-col justify-center">
            <div className="text-center space-y-4">
               <h2 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Find this Square</h2>
               <div className="text-9xl font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-pulse tracking-tighter">
                 {notationTarget}
               </div>
               <div className={`text-xl font-bold transition-all p-4 rounded-2xl ${
                 notationFeedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                 notationFeedback.type === 'error' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 
                 'text-slate-400'
               }`}>
                 {notationFeedback.text}
               </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-between items-center">
               <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score</span>
                  <span className="text-4xl font-black text-white">{notationScore}</span>
               </div>
               <button onClick={() => setNotationScore(0)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm">Reset</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'notation-replicator') {
    const challenge = REPLICATOR_CHALLENGES[replicatorIndex];
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 sm:p-8 font-sans text-white overflow-y-auto">
        <header className="w-full max-w-6xl flex justify-between items-center mb-8">
           <button 
            onClick={() => setMode('notation-menu')}
            className="text-indigo-400 font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Replicator</h1>
            <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase">Perform the Move</p>
          </div>
          <button onClick={resetReplicator} className="text-indigo-400 font-bold hover:text-indigo-300">Restart</button>
        </header>

        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col items-center">
             {/* Board with labels for training */}
             <div className="flex justify-around w-full px-8 mb-2 text-indigo-400/50 font-mono text-xs font-bold uppercase tracking-widest max-w-[480px]">
               {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <span key={l}>{l}</span>)}
             </div>
             <div className="flex items-center gap-2">
               <div className="flex flex-col justify-around h-[320px] sm:h-[480px] text-indigo-400/50 font-mono text-xs font-bold">
                 {[8, 7, 6, 5, 4, 3, 2, 1].map(n => <span key={n}>{n}</span>)}
               </div>
               <div className="grid grid-cols-8 grid-rows-8 border-4 border-slate-700 shadow-2xl rounded-sm overflow-hidden w-[320px] h-[320px] sm:w-[480px] sm:h-[480px]">
                 {replicatorBoard.map((row, rIdx) => 
                   row.map((piece, cIdx) => {
                     const isDark = (rIdx + cIdx) % 2 === 1;
                     const isSelected = replicatorSelected?.[0] === rIdx && replicatorSelected?.[1] === cIdx;
                     return (
                       <button
                         key={`${rIdx}-${cIdx}`}
                         onClick={() => handleReplicatorSquareClick(rIdx, cIdx)}
                         className={`
                           relative flex items-center justify-center text-3xl sm:text-5xl select-none transition-all duration-200
                           ${isDark ? 'bg-indigo-800' : 'bg-indigo-100'}
                           ${isSelected ? 'ring-inset ring-4 ring-yellow-400 z-10' : ''}
                           hover:opacity-80
                         `}
                       >
                         {piece && (
                           <span className={piece.color === 'w' ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : 'text-slate-900'}>
                             {PIECE_ICONS[`${piece.color}-${piece.type}`]}
                           </span>
                         )}
                       </button>
                     );
                   })
                 )}
               </div>
             </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-xl backdrop-blur-sm">
               <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-4">Command</h3>
               <div className="text-5xl font-black text-white mb-2 italic tracking-tighter">
                 {challenge.description}
               </div>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                 Replicate the move exactly as described above.
               </p>
               <div className={`text-lg font-bold p-4 rounded-2xl transition-all ${
                 replicatorFeedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                 replicatorFeedback.type === 'error' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 
                 'bg-slate-800/50 text-slate-500'
               }`}>
                 {replicatorFeedback.text}
               </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-[24px] border border-white/5">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Hint</h4>
              <p className="text-slate-300 italic text-sm">{challenge.hint}</p>
            </div>

            <div className="flex-grow flex items-end justify-center pt-8">
               <div className="flex gap-1">
                 {REPLICATOR_CHALLENGES.map((_, i) => (
                   <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= replicatorIndex ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                 ))}
               </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'timer') {
    const isWhiteDone = timerWhite <= 0;
    const isBlackDone = timerBlack <= 0;
    const isEitherDone = isWhiteDone || isBlackDone;

    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col font-sans select-none overflow-hidden">
        {/* Black Player Clock (Top) - Rotated 180 degrees for tablet play */}
        <button
          onClick={() => (timerActive === 'b' || !timerRunning) && switchTimer('b')}
          disabled={isEitherDone || (timerRunning && timerActive === 'w')}
          className={`
            flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 rotate-180
            ${timerActive === 'b' ? 'bg-indigo-600' : 'bg-slate-900'}
            ${isBlackDone ? 'bg-rose-900' : ''}
          `}
        >
          <div className="text-white opacity-50 text-2xl font-black uppercase tracking-widest mb-4">Black</div>
          <div className={`text-9xl md:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'b' ? 'text-white' : 'text-slate-400'}`}>
            {formatTime(timerBlack)}
          </div>
        </button>

        {/* Center Controls */}
        <div className="h-24 bg-slate-800 flex items-center justify-between px-6 border-y-4 border-slate-700 z-10 relative">
          <button 
            onClick={() => setMode('menu')}
            className="w-16 h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-2xl text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>

          <div className="flex gap-4">
            {presets.map(p => (
              <button 
                key={p.value}
                onClick={() => setTimerPreset(p.value)}
                className={`px-4 py-2 rounded-xl font-black text-sm uppercase transition-all ${timerInitial === p.value ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setTimerRunning(!timerRunning)}
              disabled={isEitherDone}
              className={`w-16 h-16 flex items-center justify-center rounded-2xl text-white transition-colors ${timerRunning ? 'bg-amber-600' : 'bg-emerald-600'}`}
            >
              {timerRunning ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
              )}
            </button>
            <button 
              onClick={resetTimer}
              className="w-16 h-16 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-2xl text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>

        {/* White Player Clock (Bottom) */}
        <button
          onClick={() => (timerActive === 'w' || !timerRunning) && switchTimer('w')}
          disabled={isEitherDone || (timerRunning && timerActive === 'b')}
          className={`
            flex-1 w-full flex flex-col items-center justify-center transition-all duration-300
            ${timerActive === 'w' ? 'bg-indigo-600' : 'bg-slate-900'}
            ${isWhiteDone ? 'bg-rose-900' : ''}
          `}
        >
          <div className={`text-9xl md:text-[14rem] font-black tabular-nums tracking-tighter ${timerActive === 'w' ? 'text-white' : 'text-slate-400'}`}>
            {formatTime(timerWhite)}
          </div>
          <div className="text-white opacity-50 text-2xl font-black uppercase tracking-widest mt-4">White</div>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="grid grid-cols-8 grid-rows-8 w-[150%] h-[150%] -rotate-12 -translate-x-10 -translate-y-10">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`aspect-square ${((Math.floor(i / 8) + i) % 2 === 0) ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl w-full text-center z-10 space-y-8">
        <header className="space-y-4">
          <div className="mx-auto bg-white/20 p-6 rounded-full w-24 h-24 flex items-center justify-center backdrop-blur-md border border-white/30 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M9 3h6m-3 7c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0l-3 10h6l-3-10zm-6 10h12m-13 3h14" />
            </svg>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">Chess</h1>
          <p className="text-indigo-200 text-xl font-medium">Strategy, puzzles, and tactics.</p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => setMode('play')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-indigo-100 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Sandbox</h2>
              <p className="text-slate-500 text-xs italic">Interactive play.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('openings')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-emerald-100 p-3 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Openings</h2>
              <p className="text-slate-500 text-xs italic">Move library.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('notation-menu')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-amber-100 p-3 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Notation</h2>
              <p className="text-slate-500 text-xs italic">Learn squares.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('timer')}
            className="group bg-white rounded-3xl p-6 text-left hover:-translate-y-1 transition-all shadow-xl flex flex-col items-center gap-4 border-b-4 border-slate-200"
          >
            <div className="bg-rose-100 p-3 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-800">Chess Timer</h2>
              <p className="text-slate-500 text-xs italic">Side-by-side clock.</p>
            </div>
          </button>
        </main>

        <footer className="pt-8">
          <button 
            onClick={onGoBack} 
            className="px-12 py-4 bg-white/10 text-white border border-white/20 font-bold text-lg rounded-2xl hover:bg-white/20 transform transition-all"
          >
            Back to The Zone
          </button>
        </footer>
      </div>
    </div>
  );
};