import React, { useState, useEffect, useMemo } from 'react';
import { WordButton } from './WordButton';
import { WordPair } from '../types';

interface GameBoardProps {
  words: WordPair[];
  onComplete: (correctMatches: number) => void;
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
  const [firstClicked, setFirstClicked] = useState<'lang1' | 'lang2' | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [missedPairs, setMissedPairs] = useState<number[]>([]);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  const lang1Words = useMemo(() => shuffleArray(words), [words]);
  const lang2Words = useMemo(() => shuffleArray(words), [words]);

  const handleSelectLang1 = (word: WordPair) => {
    setSelectedLang1(word);
    if (!selectedLang2) {
      setFirstClicked('lang1');
    }
  };

  const handleSelectLang2 = (word: WordPair) => {
    setSelectedLang2(word);
    if (!selectedLang1) {
      setFirstClicked('lang2');
    }
  };

  useEffect(() => {
    if (selectedLang1 && selectedLang2) {
      let timerId: number;
      if (selectedLang1.id === selectedLang2.id) {
        // Correct match
        setMatchedPairs(prev => [...prev, selectedLang1.id]);
        setSelectedLang1(null);
        setSelectedLang2(null);
        setFirstClicked(null);
      } else {
        // Incorrect match
        const missedId = firstClicked === 'lang1' ? selectedLang1.id : selectedLang2.id;
        setMissedPairs(prev => [...prev, missedId]);
        setIsIncorrect(true);
        
        timerId = window.setTimeout(() => {
          setIsIncorrect(false);
          setSelectedLang1(null);
          setSelectedLang2(null);
          setFirstClicked(null);
        }, 500);
      }
      return () => clearTimeout(timerId);
    }
  }, [selectedLang1, selectedLang2, firstClicked]);

  useEffect(() => {
    if (words.length > 0 && matchedPairs.length + missedPairs.length === words.length) {
      const timer = setTimeout(() => {
        onComplete(matchedPairs.length);
      }, 500); // Delay to show the final match/miss before continuing
      return () => clearTimeout(timer);
    }
  }, [matchedPairs, missedPairs, words, onComplete]);

  const isButtonDisabled = (wordPairId: number) => {
    // Disable if a pair is being evaluated, or if the word is already matched/missed
    return (!!selectedLang1 && !!selectedLang2) || matchedPairs.includes(wordPairId) || missedPairs.includes(wordPairId);
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {/* Language 1 Column */}
        <div className="flex flex-col space-y-3">
          {lang1Words.map(wordPair => (
            <WordButton
              key={`lang1-${wordPair.id}`}
              word={wordPair.lang1}
              onClick={() => handleSelectLang1(wordPair)}
              isSelected={selectedLang1?.id === wordPair.id}
              isMatched={matchedPairs.includes(wordPair.id)}
              isMissed={missedPairs.includes(wordPair.id)}
              isIncorrect={isIncorrect && (selectedLang1?.id === wordPair.id || selectedLang2?.id === wordPair.id)}
              isDisabled={isButtonDisabled(wordPair.id)}
            />
          ))}
        </div>
        {/* Language 2 Column */}
        <div className="flex flex-col space-y-3">
          {lang2Words.map(wordPair => (
            <WordButton
              key={`lang2-${wordPair.id}`}
              word={wordPair.lang2}
              onClick={() => handleSelectLang2(wordPair)}
              isSelected={selectedLang2?.id === wordPair.id}
              isMatched={matchedPairs.includes(wordPair.id)}
              isMissed={missedPairs.includes(wordPair.id)}
              isIncorrect={isIncorrect && (selectedLang1?.id === wordPair.id || selectedLang2?.id === wordPair.id)}
              isDisabled={isButtonDisabled(wordPair.id)}
            />
          ))}
        </div>
      </div>

      {/* Placeholder to maintain layout after removing the continue button */}
      <div className="mt-8 h-14" />
    </div>
  );
};