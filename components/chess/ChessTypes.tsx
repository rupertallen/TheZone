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

export const PIECE_ICONS: Record<string, string> = {
  'w-p': '♙', 'w-r': '♖', 'w-n': '♘', 'w-b': '♗', 'w-q': '♕', 'w-k': '♔',
  'b-p': '♟', 'b-r': '♜', 'b-n': '♞', 'b-b': '♝', 'b-q': '♛', 'b-k': '♚'
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
  },
  {
    name: "Queen's Gambit: Accepted",
    moves: [
      { description: "White plays d4", from: [6, 3], to: [4, 3], hint: "Queen's pawn forward two squares." },
      { description: "Black plays d5", from: [1, 3], to: [3, 3], hint: "Matching the center control." },
      { description: "White plays c4", from: [6, 2], to: [4, 2], hint: "Offering the flank pawn to gain central control." },
      { description: "Black plays dxc4", from: [3, 3], to: [4, 2], hint: "Black accepts the gambit." },
      { description: "White plays e3", from: [6, 4], to: [5, 4], hint: "Recapturing with the bishop soon." },
    ]
  },
  {
    name: "French Defense: Advance",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black plays e6", from: [1, 4], to: [2, 4], hint: "Preparing d5 while protecting f7." },
      { description: "White plays d4", from: [6, 3], to: [4, 3], hint: "Building a full pawn center." },
      { description: "Black plays d5", from: [1, 3], to: [3, 3], hint: "Challenging e4 immediately." },
      { description: "White plays e5", from: [4, 4], to: [3, 4], hint: "The Advance Variation: pushing past d5." },
    ]
  },
  {
    name: "Italian Game: Giuoco Piano",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black plays e5", from: [1, 4], to: [3, 4], hint: "Classical center response." },
      { description: "White plays Nf3", from: [7, 6], to: [5, 5], hint: "Developing the king's knight." },
      { description: "Black plays Nc6", from: [0, 1], to: [2, 2], hint: "Developing the queen's knight." },
      { description: "White plays Bc4", from: [7, 5], to: [4, 2], hint: "Targeting the weak f7 square." },
      { description: "Black plays Bc5", from: [0, 5], to: [3, 2], hint: "Mirroring the development." },
    ]
  },
  {
    name: "Caro-Kann Defense",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black plays c6", from: [1, 2], to: [2, 2], hint: "Preparing d5 while keeping the diagonal open." },
      { description: "White plays d4", from: [6, 3], to: [4, 3], hint: "Taking control of the center." },
      { description: "Black plays d5", from: [1, 3], to: [3, 3], hint: "Striking back at the white e4 pawn." },
    ]
  },
  {
    name: "Scandinavian Defense",
    moves: [
      { description: "White plays e4", from: [6, 4], to: [4, 4], hint: "King's pawn forward two squares." },
      { description: "Black plays d5", from: [1, 3], to: [3, 3], hint: "Challenging the white center immediately." },
      { description: "White plays exd5", from: [4, 4], to: [3, 3], hint: "White captures the attacking pawn." },
      { description: "Black plays Qxd5", from: [0, 3], to: [3, 3], hint: "The queen recaptures, but develops early." },
    ]
  },
  {
    name: "English Opening",
    moves: [
      { description: "White plays c4", from: [6, 2], to: [4, 2], hint: "A flank opening controlling the d5 square." },
      { description: "Black plays e5", from: [1, 4], to: [3, 4], hint: "Taking central space with the king's pawn." },
      { description: "White plays Nc3", from: [7, 1], to: [5, 2], hint: "Developing the knight to control d5." },
      { description: "Black plays Nf6", from: [0, 6], to: [2, 5], hint: "Developing the knight toward the center." },
    ]
  }
];

export interface Opening {
  id: string;
  name: string;
  category: string;
  moves: string;
  notations: string[];
  description: string;
  history: string;
  boardMoves: [number, number, number, number][]; // [fromRow, fromCol, toRow, toCol]
}

export const OPENINGS: Opening[] = [
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

// Fix: Use React.createElement to define MiniBoard in a .ts file where JSX is not allowed.
export const MiniBoard: React.FC<{ moves: [number, number, number, number][] }> = ({ moves }) => {
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
