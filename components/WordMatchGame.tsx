
import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { WORD_PAIRS } from '../data/words';
import { GameStatus, WordPair } from '../types';

const TOTAL_QUESTIONS = 20;
const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = TOTAL_QUESTIONS / QUESTIONS_PER_PAGE;

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface WordMatchGameProps {
  onGoHome: () => void;
}

export const WordMatchGame: React.FC<WordMatchGameProps> = ({ onGoHome }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundWords, setRoundWords] = useState<WordPair[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const setupRound = useCallback(() => {
    const shuffled = shuffleArray(WORD_PAIRS);
    setRoundWords(shuffled.slice(0, TOTAL_QUESTIONS));
    setCurrentPage(0);
    setScore(0);
    setGameStatus('playing');
  }, []);

  useEffect(() => {
    setupRound();
  }, [setupRound]);

  const handlePageComplete = () => {
    const newScore = score + QUESTIONS_PER_PAGE;
    setScore(newScore);

    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      setGameStatus('finished');
    }
  };
  
  const handleRestart = () => {
    setupRound();
  };

  const getCurrentPageWords = (): WordPair[] => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return roundWords.slice(startIndex, endIndex);
  };
  
  if (roundWords.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="w-full max-w-2xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-3xl md:text-4xl font-bold text-sky-700">
                Word Match
             </h1>
             <button 
                onClick={onGoHome}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                aria-label="Go to main menu"
             >
                Menu
             </button>
          </div>
          {gameStatus === 'playing' && (
             <ProgressBar current={score} total={TOTAL_QUESTIONS} />
          )}
        </header>
        <main className="bg-white rounded-2xl shadow-lg p-6 min-h-[480px] flex flex-col justify-between">
          {gameStatus === 'playing' && (
            <GameBoard
              key={currentPage}
              words={getCurrentPageWords()}
              onComplete={handlePageComplete}
            />
          )}
          {gameStatus === 'finished' && (
            <ScoreScreen 
              score={score} 
              total={TOTAL_QUESTIONS} 
              onRestart={handleRestart} 
              onGoHome={onGoHome}
            />
          )}
        </main>
        <footer className="text-center mt-6 text-sm text-slate-500">
          <p>Select a word from each column to make a match.</p>
        </footer>
      </div>
    </div>
  );
};
