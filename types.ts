
export interface WordPair {
  id: number;
  lang1: string; // English
  lang2: string; // French
}

export type GameStatus = 'playing' | 'finished';

export type Screen = 'menu' | 'wordMatch' | 'spellingBee';
