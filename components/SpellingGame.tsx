import React, { useState, useEffect, useCallback } from 'react';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { SpellingInput } from './SpellingInput';
import { WORD_PAIRS } from '../data/words';
import { GameStatus, WordPair } from '../types';

const TOTAL_QUESTIONS = 20;

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface SpellingGameProps {
  onGoHome: () => void;
}

type AnswerStatus = 'default' | 'correct' | 'incorrect' | 'showing-answer';

export const SpellingGame: React.FC<SpellingGameProps> = ({ onGoHome }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundWords, setRoundWords] = useState<WordPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('default');
  const [score, setScore] = useState(0);
  const [corrections, setCorrections] = useState(0);

  const setupRound = useCallback(() => {
    setRoundWords(shuffleArray(WORD_PAIRS).slice(0, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setCorrections(0);
    setInputValue('');
    setAttempts(0);
    setAnswerStatus('default');
    setGameStatus('playing');
  }, []);

  useEffect(() => {
    setupRound();
  }, [setupRound]);

  const currentWord = roundWords[currentIndex];

  const handleNextWord = () => {
    if (currentIndex < roundWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setAttempts(0);
      setAnswerStatus('default');
    } else {
      setGameStatus('finished');
    }
  };

  const handleCheckAnswer = () => {
    const isCorrect = inputValue.trim().toLowerCase() === currentWord.lang2.toLowerCase();

    if (isCorrect) {
      setAnswerStatus('correct');
      setScore(prev => prev + 1);
      if (attempts > 0) {
        setCorrections(prev => prev + 1);
      }
    } else {
      setAttempts(prev => prev + 1);
      if (attempts === 0) {
        setAnswerStatus('incorrect');
        setTimeout(() => {
          setAnswerStatus('default');
          setInputValue('');
        }, 800);
      } else {
        setAnswerStatus('showing-answer');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showContinue) return;
    if (inputValue.trim().length > 0) {
      handleCheckAnswer();
    }
  };

  if (!currentWord) {
    return <div className="flex items-center justify-center h-screen bg-slate-100">Loading...</div>;
  }

  const showContinue = answerStatus === 'correct' || answerStatus === 'showing-answer';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="w-full max-w-2xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-3xl md:text-4xl font-bold text-sky-700">Spelling Bee</h1>
             <button onClick={onGoHome} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors">Menu</button>
          </div>
          {gameStatus === 'playing' && <ProgressBar current={currentIndex} total={TOTAL_QUESTIONS} />}
        </header>
        <main className="bg-white rounded-2xl shadow-lg p-6 min-h-[480px] flex flex-col justify-between">
          {gameStatus === 'playing' ? (
            <form onSubmit={handleSubmit} className="flex flex-col justify-around flex-grow">
              <div>
                <p className="text-center text-lg text-slate-600 mb-2">Spell the French word for:</p>
                <p className="text-center text-4xl font-bold text-slate-800 mb-6">{currentWord.lang1}</p>
                <SpellingInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  status={answerStatus}
                  correctAnswer={currentWord.lang2}
                  disabled={showContinue}
                />
              </div>
              <div className="flex justify-center mt-6">
                 {showContinue ? (
                    <button type="button" onClick={handleNextWord} className="w-full max-w-xs px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all">Continue</button>
                 ) : (
                    <button type="submit" disabled={!inputValue} className="w-full max-w-xs px-8 py-4 bg-sky-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 disabled:bg-slate-300 disabled:cursor-not-allowed transform hover:scale-105 transition-all">Check</button>
                 )}
              </div>
            </form>
          ) : (
            <ScoreScreen 
              score={score} 
              total={TOTAL_QUESTIONS} 
              onRestart={setupRound} 
              onGoHome={onGoHome}
              secondaryStat={{ label: 'Corrections', value: corrections }}
            />
          )}
        </main>
      </div>
    </div>
  );
};
