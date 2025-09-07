import React from 'react';

interface WordButtonProps {
  word: string;
  onClick: () => void;
  isSelected: boolean;
  isMatched: boolean;
  isMissed: boolean;
  isIncorrect: boolean;
  isDisabled: boolean;
}

export const WordButton: React.FC<WordButtonProps> = ({
  word,
  onClick,
  isSelected,
  isMatched,
  isMissed,
  isIncorrect,
  isDisabled,
}) => {
  const baseClasses =
    'w-full text-center p-4 rounded-xl border-2 font-semibold text-lg md:text-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-4';
  
  const stateClasses = isMatched
    ? 'bg-emerald-100 border-emerald-300 text-emerald-600 cursor-default'
    : isMissed
    ? 'bg-red-100 border-red-300 text-red-600 cursor-not-allowed opacity-70'
    : isSelected
    ? 'bg-sky-200 border-sky-500 ring-4 ring-sky-300 scale-105 shadow-lg'
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