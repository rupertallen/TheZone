
import React, { useMemo } from 'react';

export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type Color = 'w' | 'b';

export interface Piece {
  type: PieceType;
  color: Color;
}

export type BoardState = (Piece | null)[][];

export const INITIAL_BOARD: BoardState = [
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

// Append \uFE0E (Variation Selector-15) to force text rendering and prevent emoji substitution on iOS/Safari
export const PIECE_ICONS: Record<string, string> = {
  'w-p': '♙\uFE0E', 'w-r': '♖\uFE0E', 'w-n': '♘\uFE0E', 'w-b': '♗\uFE0E', 'w-q': '♕\uFE0E', 'w-k': '♔\uFE0E',
  'b-p': '♟\uFE0E', 'b-r': '♜\uFE0E', 'b-n': '♞\uFE0E', 'b-b': '♝\uFE0E', 'b-q': '♛\uFE0E', 'b-k': '♚\uFE0E'
};

export interface MoveChallenge {
  description: string;
  from: [number, number];
  to: [number, number];
  hint: string;
}

export interface ReplicatorSequence {
  name: string;
  moves: MoveChallenge[];
}

export const REPLICATOR_SEQUENCES: ReplicatorSequence[] = [
  {
    name: "Sicilian Defense: Open",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black responds with c5", from: [1, 2], to: [3, 2], hint: "Black's c-pawn strikes at the center." },
      { description: "White plays Nf3", from: [7, 6], to: [5, 5], hint: "King's knight develops to f3." },
      { description: "Black plays d6", from: [1, 3], to: [2, 3], hint: "Solidifying the center and preparing development." },
      { description: "White plays d4", from: [6, 3], to: [4, 3], hint: "Challenging the c5 pawn immediately." },
    ]
  },
  {
    name: "Ruy Lopez: Exchange Variation",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black plays e5", from: [1, 4], to: [3, 4], hint: "Symmetrical response in the center." },
      { description: "White plays Nf3", from: [7, 6], to: [5, 5], hint: "Knight attacks the e5 pawn." },
      { description: "Black plays Nc6", from: [0, 1], to: [2, 2], hint: "Knight defends the e5 pawn." },
      { description: "White plays Bb5", from: [7, 5], to: [3, 1], hint: "Bishop pressures the knight on c6." },
      { description: "Black plays a6", from: [1, 0], to: [2, 0], hint: "The Morphy Defense: challenging the bishop." },
      { description: "White plays Bxc6", from: [3, 1], to: [2, 2], hint: "The Exchange: Bishop takes the knight." },
    ]
  }
];

export type AtomicMove = [number, number, number, number];

export interface MatchMove {
  notation: string;
  boardMove: AtomicMove[];
  commentary: string;
}

export interface FamousMatch {
  id: string;
  title: string;
  players: string;
  date: string;
  description: string;
  moves: MatchMove[];
}

export interface Opening {
  id: string;
  name: string;
  category: string;
  moves: string;
  notations: string[];
  description: string;
  history: string;
  boardMoves: AtomicMove[][]; // Array of turns, each turn is an array of atomic moves
}

export const MiniBoard: React.FC<{ moves: AtomicMove[][] }> = ({ moves }) => {
  const board = useMemo(() => {
    const b = JSON.parse(JSON.stringify(INITIAL_BOARD));
    moves.forEach((turn) => {
      turn.forEach(([fr, fc, tr, tc]) => {
        if (b[fr][fc]) {
          b[tr][tc] = b[fr][fc];
          b[fr][fc] = null;
        }
      });
    });
    return b;
  }, [moves]);

  return React.createElement(
    'div',
    { 
      className: "grid grid-cols-8 grid-rows-8 border-2 border-slate-700 w-full aspect-square bg-indigo-900 rounded overflow-hidden pointer-events-none" 
    },
    board.map((row: any, rIdx: number) => 
      row.map((piece: any, cIdx: number) => 
        React.createElement(
          'div',
          { 
            key: `${rIdx}-${cIdx}`,
            className: `flex items-center justify-center text-[10px] sm:text-xs select-none ${(rIdx + cIdx) % 2 === 1 ? 'bg-indigo-800' : 'bg-indigo-100'}`
          },
          piece ? React.createElement(
            'span',
            { 
              className: piece.color === 'w' ? 'text-white' : 'text-slate-900' 
            },
            PIECE_ICONS[`${piece.color}-${piece.type}`]
          ) : null
        )
      )
    )
  );
};
