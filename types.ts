
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

export interface HistoryEvent {
  id: number;
  date: string;
  event: string;
}

export interface HistoryList {
  id: string;
  name: string;
  description: string;
  events: HistoryEvent[];
}

export type GameStatus = 'playing' | 'finished';

export type Screen = 'menu' | 'listSelection' | 'wordMatch' | 'spellingBee' | 'singleLanguageListSelection' | 'singleLanguageSpelling' | 'historyMatch';
export type GameType = 'wordMatch' | 'spellingBee' | 'singleLanguageSpelling' | 'historyMatch';