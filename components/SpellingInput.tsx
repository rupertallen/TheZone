import React, { useEffect, useRef } from 'react';

interface SpellingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: 'default' | 'correct' | 'incorrect' | 'showing-answer';
  correctAnswer?: string;
  disabled: boolean;
}

export const SpellingInput: React.FC<SpellingInputProps> = ({ value, onChange, status, correctAnswer, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when a new word is presented
  useEffect(() => {
    if (status === 'default' && !disabled) {
      inputRef.current?.focus();
    }
  }, [status, disabled]);

  const baseClasses = 'w-full h-20 text-center text-3xl md:text-4xl font-bold text-slate-700 tracking-widest uppercase p-4 rounded-xl border-b-4 transition-all duration-300 focus:outline-none focus:ring-4';
  
  const statusClasses = {
    default: 'bg-slate-100 border-slate-300 focus:ring-sky-300 focus:border-sky-500',
    correct: 'bg-green-100 border-green-400 ring-green-300 text-green-800',
    incorrect: 'bg-red-100 border-red-400 ring-red-300 animate-shake',
    'showing-answer': 'bg-red-100 border-red-400',
  };
  
  const showingAnswerContainerClasses = `w-full min-h-[80px] flex items-center justify-center p-4 rounded-xl border-b-4 transition-all duration-300 ${statusClasses['showing-answer']}`;

  if (status === 'showing-answer') {
    return (
      <div className={showingAnswerContainerClasses}>
        <div className="text-center">
            <p className="text-sm text-red-600">Correct answer:</p>
            <p className="text-2xl font-bold text-red-800 tracking-widest">{correctAnswer}</p>
        </div>
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled || status === 'correct'}
      className={`${baseClasses} ${statusClasses[status]}`}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      aria-label="Spelling input"
    />
  );
};
