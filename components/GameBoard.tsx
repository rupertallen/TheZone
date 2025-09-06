
import React, { useState, useEffect, useMemo } from 'react';
import { WordButton } from './WordButton';
import { WordPair } from '../types';

interface GameBoardProps {
  words: WordPair[];
  onComplete: () => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const GameBoard: React.FC<GameBoardProps> = ({ words, onComplete }) => {
  const [selectedLang1, setSelectedLang1] = useState<WordPair | null>(null);
  const [selectedLang2, setSelectedLang2] = useState<WordPair | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  
  const lang1Words = useMemo(() => shuffleArray(words), [words]);
  const lang2Words = useMemo(() => shuffleArray(words), [words]);

  useEffect(() => {
    if (selectedLang1 && selectedLang2) {
      if (selectedLang1.id === selectedLang2.id) {
        // Correct match
        setMatchedPairs(prev => [...prev, selectedLang1.id]);
        setSelectedLang1(null);
        setSelectedLang2(null);
      } else {
        // Incorrect match
        setIsIncorrect(true);
        setTimeout(() => {
          setIsIncorrect(false);
          setSelectedLang1(null);
          setSelectedLang2(null);
        }, 500);
      }
    }
  }, [selectedLang1, selectedLang2]);
  
  const allPairsMatched = matchedPairs.length === words.length;

  return (
    <div className="flex flex-col flex-grow">
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {/* Language 1 Column */}
        <div className="flex flex-col space-y-3">
          {lang1Words.map(wordPair => (
            <WordButton
              key={`lang1-${wordPair.id}`}
              word={wordPair.lang1}
              onClick={() => !matchedPairs.includes(wordPair.id) && setSelectedLang1(wordPair)}
              isSelected={selectedLang1?.id === wordPair.id}
              isMatched={matchedPairs.includes(wordPair.id)}
              isIncorrect={isIncorrect && selectedLang1?.id === wordPair.id}
              isDisabled={matchedPairs.includes(wordPair.id)}
            />
          ))}
        </div>
        {/* Language 2 Column */}
        <div className="flex flex-col space-y-3">
          {lang2Words.map(wordPair => (
            <WordButton
              key={`lang2-${wordPair.id}`}
              word={wordPair.lang2}
              onClick={() => !matchedPairs.includes(wordPair.id) && setSelectedLang2(wordPair)}
              isSelected={selectedLang2?.id === wordPair.id}
              isMatched={matchedPairs.includes(wordPair.id)}
              isIncorrect={isIncorrect && selectedLang2?.id === wordPair.id}
              isDisabled={matchedPairs.includes(wordPair.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {allPairsMatched && (
          <button
            onClick={onComplete}
            className="w-full max-w-xs px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all duration-200"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
