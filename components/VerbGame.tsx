
import React, { useState, useEffect, useCallback } from 'react';
import { ScoreScreen } from './ScoreScreen';
import { ProgressBar } from './ProgressBar';
import { SpellingInput } from './SpellingInput';
import { GameStatus, VerbEntry, VerbList } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface VerbGameProps {
  list: VerbList;
  onGoHome: () => void;
  onGoBack: () => void;
}

type AnswerStatus = 'default' | 'correct' | 'incorrect' | 'showing-answer';

export const VerbGame: React.FC<VerbGameProps> = ({ list, onGoHome, onGoBack }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [roundVerbs, setRoundVerbs] = useState<VerbEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('default');
  const [score, setScore] = useState(0);
  const [corrections, setCorrections] = useState(0);

  const totalQuestions = list.verbs.length;

  const setupRound = useCallback(() => {
    setRoundVerbs(shuffleArray(list.verbs));
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
  }, [setupRound]);

  const currentVerb = roundVerbs[currentIndex];

  const handleNextWord = () => {
    if (currentIndex < roundVerbs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setAttempts(0);
      setAnswerStatus('default');
    } else {
      setGameStatus('finished');
    }
  };

  const handleCheckAnswer = () => {
    const isCorrect = inputValue.trim().toLowerCase() === currentVerb.latin.toLowerCase();

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

  if (!currentVerb) {
    return <div className="flex items-center justify-center h-screen bg-slate-100">Loading...</div>;
  }

  const showContinue = answerStatus === 'correct' || answerStatus === 'showing-answer';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="w-full max-w-2xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
             <div>
                <h1 className="text-3xl md:text-4xl font-bold text-sky-700">Verb Challenge</h1>
                <p className="text-slate-500 font-semibold">{list.name}</p>
             </div>
             <div className="flex gap-2">
                <button onClick={onGoBack} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300">Back</button>
                <button onClick={onGoHome} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-300">Menu</button>
             </div>
          </div>
          {gameStatus === 'playing' && <ProgressBar current={currentIndex} total={totalQuestions} />}
        </header>
        <main className="bg-white rounded-2xl shadow-lg p-6 min-h-[480px] flex flex-col justify-between">
          {gameStatus === 'playing' ? (
            <form onSubmit={handleSubmit} className="flex flex-col justify-around flex-grow">
              <div>
                <p className="text-center text-lg text-slate-600 mb-2">Write the correct Latin verb form for:</p>
                <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200 mb-6">
                  <p className="text-2xl font-semibold text-slate-700">
                    <span className="font-bold text-sky-600">{currentVerb.person}</span>, <span className="font-bold text-sky-600">{currentVerb.number}</span>
                  </p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">"{currentVerb.english}"</p>
                </div>
                <SpellingInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  status={answerStatus}
                  correctAnswer={currentVerb.latin}
                  disabled={showContinue}
                />
              </div>
              <div className="flex justify-center mt-6">
                 {showContinue ? (
                    <button type="button" onClick={handleNextWord} className="w-full max-w-xs px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-green-600 transition-all">Continue</button>
                 ) : (
                    <button type="submit" disabled={!inputValue} className="w-full max-w-xs px-8 py-4 bg-sky-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-sky-600 transition-all disabled:opacity-50">Check</button>
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
