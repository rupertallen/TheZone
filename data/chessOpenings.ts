
import { Opening } from '../components/chess/ChessTypes';

export const OPENINGS: Opening[] = [
  // --- THE BIG THREE ---
  {
    id: 'ruy-lopez',
    category: 'The Big Three',
    name: 'Ruy Lopez',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
    notations: ['1. e4', '1... e5', '2. Nf3', '2... Nc6', '3. Bb5'],
    description: 'One of the oldest and most deeply studied openings. It focuses on pressure against Black\'s knight on c6, aiming to weaken the center control.',
    history: 'Also known as the Spanish Opening, it is named after the 16th-century Spanish priest Ruy López de Segura.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 4, 3, 4]], [[7, 6, 5, 5]], [[0, 1, 2, 2]], [[7, 5, 3, 1]]]
  },
  {
    id: 'sicilian-defense',
    category: 'The Big Three',
    name: 'Sicilian Defense',
    moves: '1.e4 c5',
    notations: ['1. e4', '1... c5'],
    description: 'Black’s most aggressive and popular response to White’s king pawn, leading to complex, asymmetrical battles.',
    history: 'First recorded in the late 16th century, it became popular in the 20th century as a sharp way for Black to play for a win.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 2, 3, 2]]]
  },
  {
    id: 'queens-gambit',
    category: 'The Big Three',
    name: 'Queen’s Gambit',
    moves: '1.d4 d5 2.c4',
    notations: ['1. d4', '1... d5', '2. c4'],
    description: 'White offers a flank pawn to gain central control. If Black takes it, White aims to build a powerful center with e4.',
    history: 'One of the oldest known openings, mentioned in the Göttingen manuscript of 1490 and popularized recently by "The Queen’s Gambit".',
    boardMoves: [[[6, 3, 4, 3]], [[1, 3, 3, 3]], [[6, 2, 4, 2]]]
  },

  // --- CLASSIC OPEN GAMES ---
  {
    id: 'italian-game',
    category: 'Classic Open Games',
    name: 'Italian Game',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4',
    notations: ['1. e4', '1... e5', '2. Nf3', '2... Nc6', '3. Bc4'],
    description: 'A beginner favorite that focuses on rapid development and attacking the weak f7 square.',
    history: 'The oldest chess opening, developed in the 16th century by players like Polerio and Damiano.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 4, 3, 4]], [[7, 6, 5, 5]], [[0, 1, 2, 2]], [[7, 5, 4, 2]]]
  },
  {
    id: 'french-defense',
    category: 'Classic Open Games',
    name: 'French Defense',
    moves: '1.e4 e6',
    notations: ['1. e4', '1... e6'],
    description: 'A solid, "brick wall" defense where Black challenges the center later with ...d5.',
    history: 'Named after a correspondence match between London and Paris in 1834, where the French team used it effectively.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 4, 2, 4]]]
  },
  {
    id: 'caro-kann-defense',
    category: 'Classic Open Games',
    name: 'Caro-Kann Defense',
    moves: '1.e4 c6',
    notations: ['1. e4', '1... c6'],
    description: 'Known as the "Slav\'s cousin," it is an ultra-solid defense favored by players who hate losing.',
    history: 'Named after Horatio Caro and Marcus Kann, who analyzed it in 1886.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 2, 2, 2]]]
  },
  {
    id: 'scandinavian-defense',
    category: 'Classic Open Games',
    name: 'Scandinavian Defense',
    moves: '1.e4 d5',
    notations: ['1. e4', '1... d5'],
    description: 'A direct strike at the center that forces the game into unique territory immediately.',
    history: 'One of the oldest recorded defenses, first mentioned in "Scachs d\'amor" around 1475.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 3, 3, 3]]]
  },
  {
    id: 'kings-gambit',
    category: 'Classic Open Games',
    name: 'King’s Gambit',
    moves: '1.e4 e5 2.f4',
    notations: ['1. e4', '1... e5', '2. f4'],
    description: 'A romantic, old-school opening where White offers a pawn for a wild, attacking game.',
    history: 'The height of chess fashion in the 19th century, epitomizing the "Romantic Era" of chess.',
    boardMoves: [[[6, 4, 4, 4]], [[1, 4, 3, 4]], [[6, 5, 4, 5]]]
  },

  // --- STRATEGIC CLOSED GAMES ---
  {
    id: 'kings-indian-defense',
    category: 'Strategic Closed Games',
    name: 'King’s Indian Defense',
    moves: '1.d4 Nf6 2.c4 g6',
    notations: ['1. d4', '1... Nf6', '2. c4', '2... g6'],
    description: 'A "hypermodern" opening where Black lets White take the center only to blow it up later.',
    history: 'A favorite of Garry Kasparov and Bobby Fischer, leading to some of the most exciting games in history.',
    boardMoves: [[[6, 3, 4, 3]], [[0, 6, 2, 5]], [[6, 2, 4, 2]], [[1, 6, 2, 6]]]
  },
  {
    id: 'slav-defense',
    category: 'Strategic Closed Games',
    name: 'Slav Defense',
    moves: '1.d4 d5 2.c4 c6',
    notations: ['1. d4', '1... d5', '2. c4', '2... c6'],
    description: 'One of the most reliable ways for Black to meet the Queen’s Gambit.',
    history: 'Analyzed by many Slavic players in the early 20th century, becoming a bedrock of professional play.',
    boardMoves: [[[6, 3, 4, 3]], [[1, 3, 3, 3]], [[6, 2, 4, 2]], [[1, 2, 2, 2]]]
  },
  {
    id: 'london-system',
    category: 'Strategic Closed Games',
    name: 'London System',
    moves: '1.d4 d5 2.Bf4',
    notations: ['1. d4', '1... d5', '2. Bf4'],
    description: 'A "plug-and-play" system that works against almost anything Black does.',
    history: 'Rose to massive popularity recently as a reliable, easy-to-learn system for White.',
    boardMoves: [[[6, 3, 4, 3]], [[1, 3, 3, 3]], [[7, 2, 4, 5]]]
  },
  {
    id: 'nimzo-indian-defense',
    category: 'Strategic Closed Games',
    name: 'Nimzo-Indian Defense',
    moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4',
    notations: ['1. d4', '1... Nf6', '2. c4', '2... e6', '3. Nc3', '3... Bb4'],
    description: 'A high-level favorite that focuses on controlling the center with pieces rather than pawns.',
    history: 'Developed by Aron Nimzowitsch in the early 1900s as a cornerstone of Hypermodernism.',
    boardMoves: [[[6, 3, 4, 3]], [[0, 6, 2, 5]], [[6, 2, 4, 2]], [[1, 4, 2, 4]], [[7, 1, 5, 2]], [[0, 5, 4, 1]]]
  },

  // --- FLANK & OTHERS ---
  {
    id: 'english-opening',
    category: 'Flank & Others',
    name: 'English Opening',
    moves: '1.c4',
    notations: ['1. c4'],
    description: 'A flexible move that avoids the main theory of e4 or d4 and often turns into a reversed Sicilian.',
    history: 'Named after Howard Staunton, who played it during his 1843 match against Saint-Amant.',
    boardMoves: [[[6, 2, 4, 2]]]
  },
  {
    id: 'reti-opening',
    category: 'Flank & Others',
    name: 'Réti Opening',
    moves: '1.Nf3',
    notations: ['1. Nf3'],
    description: 'A sophisticated opening that keeps White’s options open while preventing Black from playing ...e5.',
    history: 'Named after Richard Réti, who used it to defeat world champion José Raúl Capablanca in 1924.',
    boardMoves: [[[7, 6, 5, 5]]]
  },
  {
    id: 'dutch-defense',
    category: 'Flank & Others',
    name: 'Dutch Defense',
    moves: '1.d4 f5',
    notations: ['1. d4', '1... f5'],
    description: 'An aggressive and somewhat risky attempt by Black to unbalance the game from move one.',
    history: 'Elias Stein recommended this defense in his 1789 book as the best way to meet 1.d4.',
    boardMoves: [[[6, 3, 4, 3]], [[1, 5, 3, 5]]]
  }
];
