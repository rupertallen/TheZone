
import React from 'react';

interface WordButtonProps {
  word: string;
  onClick: () => void;
  isSelected: boolean;
  isMatched: boolean;
  isIncorrect: boolean;
  isDisabled: boolean;
}

export const WordButton: React.FC<WordButtonProps> = ({
  word,
  onClick,
  isSelected,
  isMatched,
  isIncorrect,
  isDisabled,
}) => {
  const baseClasses =
    'w-full text-center p-4 rounded-xl border-2 font-semibold text-lg md:text-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-4';
  
  const stateClasses = isMatched
    ? 'bg-emerald-100 border-emerald-300 text-emerald-600 cursor-default'
    : isSelected
    ? 'bg-sky-200 border-sky-500 ring-4 ring-sky-300 scale-105 shadow-lg'
    : isDisabled
    ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
    : 'bg-white border-slate-300 text-slate-700 hover:bg-sky-50 hover:border-sky-400 cursor-pointer transform hover:scale-105';

  const animationClass = isIncorrect ? 'animate-shake border-red-500 bg-red-100' : '';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${stateClasses} ${animationClass}`}
    >
      {word}
    </button>
  );
};
