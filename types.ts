
export interface WordPair {
  id: number;
  lang1: string; // English
  lang2: string; // French or Latin
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

export interface VerbEntry {
  id: number;
  person: string;
  number: string;
  latin: string;
  english: string;
}

export interface VerbList {
  id: string;
  name: string;
  description: string;
  verbs: VerbEntry[];
}

export type GameStatus = 'playing' | 'finished';

export type Screen = 'menu' | 'listSelection' | 'wordMatch' | 'spellingBee' | 'singleLanguageListSelection' | 'singleLanguageSpelling' | 'historyMatch' | 'verbGame';
export type GameType = 'wordMatch' | 'spellingBee' | 'singleLanguageSpelling' | 'historyMatch' | 'verbGame';
