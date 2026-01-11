
export type Screen = 'menu' | 'listSelection' | 'singleLanguageListSelection' | 'wordMatch' | 'spellingBee' | 'singleLanguageSpelling' | 'historyMatch' | 'verbGame' | 'reels';

export type GameType = 'wordMatch' | 'spellingBee' | 'singleLanguageSpelling' | 'historyMatch' | 'verbGame' | 'reels';

export type AcademicYear = 'Year 5' | 'Year 6' | 'Year 7' | 'Year 8';
export type AcademicTerm = 'Autumn' | 'Spring' | 'Summer';

export type GameStatus = 'playing' | 'finished';

export interface WordPair {
  id: number;
  lang1: string;
  lang2: string;
}

export interface WordList {
  id: string;
  name: string;
  description: string;
  words: WordPair[];
  year: AcademicYear;
  term: AcademicTerm;
}

export interface DefinitionPair {
  id: number;
  term: string;
  meaning: string;
}

export interface DefinitionList {
  id: string;
  name: string;
  description: string;
  definitions: DefinitionPair[];
  year: AcademicYear;
  term: AcademicTerm;
}

export interface CaseEntry {
  id: number;
  caseName: string;
  latinSingular: string;
  latinPlural: string;
}

export interface CaseList {
  id: string;
  name: string;
  description: string;
  rootWord: string;
  cases: CaseEntry[];
  year: AcademicYear;
  term: AcademicTerm;
}

export interface SingleWordList {
  id: string;
  name: string;
  description: string;
  words: string[];
  year: AcademicYear;
  term: AcademicTerm;
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
  year: AcademicYear;
  term: AcademicTerm;
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
  year: AcademicYear;
  term: AcademicTerm;
}

// Union type for any kind of list that can be used in general selection
export type AnyList = WordList | DefinitionList | CaseList | VerbList | HistoryList;
