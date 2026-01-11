
import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { GameStatus, WordPair, HistoryList, HistoryEvent } from '../types';

const QUESTIONS_PER_PAGE = 5;
const TOTAL_QUESTIONS_IN_QUIZ = 20;

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface HistoryMatchGameProps {
  list: HistoryList;
  onGoHome: () => void;
  onGoBack: () => void;
}

export const HistoryMatchGame: React.FC<HistoryMatchGameProps> = ({ list, onGoHome, onGoBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundEvents, setRoundEvents] = useState<WordPair[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  
  const totalQuestions = Math.min(TOTAL_QUESTIONS_IN_QUIZ, list.events.length);
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE) || 1;

  const setupRound = useCallback(() => {
    const events = list.events as HistoryEvent[];
    const shuffled = shuffleArray(events);
    const selectedEvents = shuffled.slice(0, TOTAL_QUESTIONS_IN_QUIZ);
    const mappedToWordPairs = selectedEvents.map(event => ({
        id: event.id,
        lang1: event.date,
        lang2: event.event,
    }));
    setRoundEvents(mappedToWordPairs);
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
    return roundEvents.slice(startIndex, endIndex);
  };
  
  if (roundEvents.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-sky-700">
                  History Match
              </h1>
              <p className="text-slate-500 font-semibold">{list.name}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={onGoBack} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300">Back</button>
                <button onClick={onGoHome} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300">Menu</button>
             </div>
          </div>
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
          <p>Select a date and the matching historical event to make a pair.</p>
        </footer>
      </div>
    </div>
  );
};
