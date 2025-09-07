
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

export interface SingleWordList {
  id: string;
  name: string;
  description: string;
  words: string[];
}

export type GameStatus = 'playing' | 'finished';

export type Screen = 'menu' | 'listSelection' | 'wordMatch' | 'spellingBee' | 'singleLanguageListSelection' | 'singleLanguageSpelling';
export type GameType = 'wordMatch' | 'spellingBee' | 'singleLanguageSpelling';