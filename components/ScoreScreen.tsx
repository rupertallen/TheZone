
import React from 'react';

interface ScoreScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
  onGoHome: () => void;
  secondaryStat?: { label: string; value: number };
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, total, onRestart, onGoHome, secondaryStat }) => {
  const isPerfectScore = score === total;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-4xl font-bold text-slate-800 mb-2">
        {isPerfectScore ? 'Congratulations!' : 'Round Complete!'}
      </h2>
      <p className="text-xl text-slate-600 mb-8">
        You've completed the challenge.
      </p>
      <div className="bg-sky-100 p-8 rounded-2xl shadow-inner mb-6 w-full max-w-xs">
        <p className="text-lg text-sky-800">Your Score</p>
        <p className="text-7xl font-bold text-sky-600">
          {score} <span className="text-4xl font-medium text-sky-500">/ {total}</span>
        </p>
      </div>
       {secondaryStat && (
        <div className="bg-amber-100 p-4 rounded-2xl shadow-inner mb-8 w-full max-w-xs">
          <p className="text-lg text-amber-800">{secondaryStat.label}</p>
          <p className="text-5xl font-bold text-amber-600">
            {secondaryStat.value}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGoHome}
          className="px-10 py-4 bg-slate-200 text-slate-700 font-bold text-xl rounded-xl shadow-lg hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-400 transform hover:scale-105 transition-transform duration-200"
        >
          Menu
        </button>
        <button
          onClick={onRestart}
          className="px-10 py-4 bg-sky-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transform hover:scale-105 transition-transform duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
