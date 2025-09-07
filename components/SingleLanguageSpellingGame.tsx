
import React, { useState, useEffect, useCallback } from 'react';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { SpellingInput } from './SpellingInput';
import { GameStatus, SingleWordList } from '../types';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface SingleLanguageSpellingGameProps {
  list: SingleWordList;
  onGoHome: () => void;
  onGoBack: () => void;
}

type AnswerStatus = 'default' | 'correct' | 'incorrect' | 'showing-answer';

export const SingleLanguageSpellingGame: React.FC<SingleLanguageSpellingGameProps> = ({ list, onGoHome, onGoBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundWords, setRoundWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('default');
  const [score, setScore] = useState(0);
  const [corrections, setCorrections] = useState(0);

  const totalQuestions = list.words.length;

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Using British English voice
    window.speechSynthesis.speak(utterance);
  }, []);

  const setupRound = useCallback(() => {
    setRoundWords(shuffleArray(list.words));
    setCurrentIndex(0);
    setScore(0);
    setCorrections(0);
    setInputValue('');
    setAttempts(0);
    setAnswerStatus('default');
    setGameStatus('playing');
  }, [list]);

  useEffect(() => {
    setupRound();
     // Cleanup speech synthesis on component unmount
    return () => window.speechSynthesis.cancel();
  }, [setupRound]);

  const currentWord = roundWords[currentIndex];

  useEffect(() => {
    if (currentWord && gameStatus === 'playing') {
      // Delay speech slightly to allow for UI transitions
      const timer = setTimeout(() => speak(currentWord), 300);
      return () => clearTimeout(timer);
    }
  }, [currentWord, gameStatus, speak]);


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
    const isCorrect = inputValue.trim().toLowerCase() === currentWord.toLowerCase();

    if (isCorrect) {
      setAnswerStatus('correct');
      if (attempts === 0) {
        setScore(prev => prev + 1);
      } else {
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
    if (answerStatus !== 'default') return;
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
          <div className="flex justify-between items-center mb-2">
             <div>
                <h1 className="text-3xl md:text-4xl font-bold text-sky-700">Single Language Spelling</h1>
                <p className="text-slate-500 font-semibold">{list.name}</p>
             </div>
             <button onClick={onGoHome} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors">Menu</button>
          </div>
          <button onClick={onGoBack} className="text-sm text-sky-600 hover:underline mb-4">
            &larr; Change word list
          </button>
          {gameStatus === 'playing' && <ProgressBar current={currentIndex} total={totalQuestions} />}
        </header>
        <main className="bg-white rounded-2xl shadow-lg p-6 min-h-[480px] flex flex-col justify-between">
          {gameStatus === 'playing' ? (
            <form onSubmit={handleSubmit} className="flex flex-col justify-around flex-grow">
              <div className="flex flex-col items-center">
                <p className="text-lg text-slate-600 mb-4">Listen and spell the word:</p>
                <button
                  type="button"
                  onClick={() => speak(currentWord)}
                  className="bg-sky-100 text-sky-600 p-4 rounded-full mb-6 transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300"
                  aria-label="Listen to the word again"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <SpellingInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  status={answerStatus}
                  correctAnswer={currentWord}
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
              total={totalQuestions} 
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