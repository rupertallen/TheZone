
import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { GameStatus, WordList, WordPair } from '../types';

const QUESTIONS_PER_PAGE = 5;

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
  list: WordList;
  onGoHome: () => void;
  onGoBack: () => void;
}

export const WordMatchGame: React.FC<WordMatchGameProps> = ({ list, onGoHome, onGoBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundWords, setRoundWords] = useState<WordPair[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  
  const totalQuestions = list.words.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE) || 1;

  const setupRound = useCallback(() => {
    const shuffled = shuffleArray(list.words);
    setRoundWords(shuffled);
    setCurrentPage(0);
    setScore(0);
    setGameStatus('playing');
  }, [list]);

  useEffect(() => {
    setupRound();
  }, [setupRound]);

  const handlePageComplete = (correctMatchesOnPage: number) => {
    setScore(prevScore => prevScore + correctMatchesOnPage);

    if (currentPage < totalPages - 1) {
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
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-sky-700">
                  Word Match
              </h1>
              <p className="text-slate-500 font-semibold">{list.name}</p>
            </div>
             <button 
                onClick={onGoHome}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                aria-label="Go to main menu"
             >
                Menu
             </button>
          </div>
           <button onClick={onGoBack} className="text-sm text-sky-600 hover:underline mb-4">
             &larr; Change word list
           </button>
          {gameStatus === 'playing' && (
             <ProgressBar current={score} total={totalQuestions} />
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
              total={totalQuestions} 
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
