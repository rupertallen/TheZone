
import React from 'react';

interface OnScreenKeyboardProps {
  onChar: (char: string) => void;
  onBackspace: () => void;
  isDisabled?: boolean;
}

const keyRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Key: React.FC<{
  value: string;
  onClick: (value: string) => void;
  isDisabled?: boolean;
  isSpecial?: boolean;
}> = ({ value, onClick, isDisabled, isSpecial }) => {
  const baseClasses = 'h-12 md:h-14 flex items-center justify-center font-bold text-lg rounded-lg shadow-sm transition-colors duration-150';
  const stateClasses = isDisabled
    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
    : isSpecial
    ? 'bg-slate-300 hover:bg-slate-400 text-slate-800'
    : 'bg-slate-100 hover:bg-sky-100 text-slate-700';

  return (
    <button onClick={() => onClick(value)} disabled={isDisabled} className={`${baseClasses} ${stateClasses}`}>
      {value}
    </button>
  );
};

export const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onChar, onBackspace, isDisabled }) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-slate-200 rounded-lg">
      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5">
          {row.map(key => (
            <div key={key} className="flex-1 min-w-0">
              <Key value={key} onClick={onChar} isDisabled={isDisabled} />
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1.5">
        <div className="w-full">
            <button
                onClick={onBackspace}
                disabled={isDisabled}
                className={`h-12 md:h-14 w-full flex items-center justify-center font-bold text-lg rounded-lg shadow-sm transition-colors duration-150 ${isDisabled ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-300 hover:bg-slate-400 text-slate-800'}`}
                aria-label="Backspace"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 002.828 0L21 12M3 12l6.414-6.414a2 2 0 012.828 0L21 12" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};
