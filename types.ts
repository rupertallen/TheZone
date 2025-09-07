
export interface WordPair {
  id: number;
  lang1: string; // English
  lang2: string; // French
}

export interface WordList {
  id: string;
  name: string;
  description: string;
  words: WordPair[];
}

export type GameStatus = 'playing' | 'finished';

export type Screen = 'menu' | 'listSelection' | 'wordMatch' | 'spellingBee';
export type GameType = 'wordMatch' | 'spellingBee';