
import React, { useState, useEffect } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { ListSelectionScreen } from './components/ListSelectionScreen';
import { SingleLanguageListSelectionScreen } from './components/SingleLanguageListSelectionScreen';
import { WordMatchGame } from './components/WordMatchGame';
import { SpellingGame } from './components/SpellingGame';
import { SingleLanguageSpellingGame } from './components/SingleLanguageSpellingGame';
import { HistoryMatchGame } from './components/HistoryMatchGame';
import { VerbGame } from './components/VerbGame';
import { ReelsViewer } from './components/ReelsViewer';
import { Screen, GameType, WordList, SingleWordList, VerbList, HistoryList, AcademicYear, AcademicTerm } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  
  // Game-specific selections
  const [selectedWordList, setSelectedWordList] = useState<WordList | null>(null);
  const [selectedSpellingList, setSelectedSpellingList] = useState<SingleWordList | null>(null);
  const [selectedVerbList, setSelectedVerbList] = useState<VerbList | null>(null);
  const [selectedHistoryList, setSelectedHistoryList] = useState<HistoryList | null>(null);

  // Persistence for Year and Term
  const [currentYear, setCurrentYear] = useState<AcademicYear>(() => {
    return (localStorage.getItem('academicYear') as AcademicYear) || 'Year 5';
  });
  const [currentTerm, setCurrentTerm] = useState<AcademicTerm>(() => {
    return (localStorage.getItem('academicTerm') as AcademicTerm) || 'Autumn';
  });

  useEffect(() => {
    localStorage.setItem('academicYear', currentYear);
  }, [currentYear]);

  useEffect(() => {
    localStorage.setItem('academicTerm', currentTerm);
  }, [currentTerm]);

  const handleStartGame = (game: GameType) => {
    setSelectedGame(game);
    // Reset specific selections
    setSelectedWordList(null);
    setSelectedSpellingList(null);
    setSelectedVerbList(null);
    setSelectedHistoryList(null);

    // Navigate to selection screen or directly to game
    if (game === 'singleLanguageSpelling') {
      setActiveScreen('singleLanguageListSelection');
    } else if (game === 'reels') {
      setActiveScreen('reels');
    } else {
      setActiveScreen('listSelection');
    }
  };

  const handleSelectList = (list: any) => {
    if (selectedGame === 'wordMatch') {
      setSelectedWordList(list);
      setActiveScreen('wordMatch');
    } else if (selectedGame === 'spellingBee') {
      setSelectedWordList(list);
      setActiveScreen('spellingBee');
    } else if (selectedGame === 'verbGame') {
      setSelectedVerbList(list);
      setActiveScreen('verbGame');
    } else if (selectedGame === 'historyMatch') {
      setSelectedHistoryList(list);
      setActiveScreen('historyMatch');
    }
  };

  const handleSelectSingleLanguageList = (list: SingleWordList) => {
    setSelectedSpellingList(list);
    setActiveScreen('singleLanguageSpelling');
  };

  const handleGoHome = () => {
    setActiveScreen('menu');
    setSelectedGame(null);
  };
  
  const handleGoBackToSelection = () => {
    if (selectedGame === 'singleLanguageSpelling') {
      setActiveScreen('singleLanguageListSelection');
    } else {
      setActiveScreen('listSelection');
    }
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'menu':
        return (
          <MenuScreen 
            onStartGame={handleStartGame} 
            year={currentYear} 
            term={currentTerm} 
            onYearChange={setCurrentYear} 
            onTermChange={setCurrentTerm} 
          />
        );
      case 'listSelection':
        return (
          <ListSelectionScreen 
            onSelectList={handleSelectList} 
            onGoBack={handleGoHome} 
            year={currentYear} 
            term={currentTerm}
            gameType={selectedGame}
          />
        );
      case 'singleLanguageListSelection':
        return (
          <SingleLanguageListSelectionScreen 
            onSelectList={handleSelectSingleLanguageList} 
            onGoBack={handleGoHome} 
            year={currentYear} 
            term={currentTerm} 
          />
        );
      case 'wordMatch':
        if (selectedWordList) {
          return <WordMatchGame list={selectedWordList} onGoHome={handleGoHome} onGoBack={handleGoBackToSelection} />;
        }
        break;
      case 'spellingBee':
        if (selectedWordList) {
          return <SpellingGame list={selectedWordList} onGoHome={handleGoHome} onGoBack={handleGoBackToSelection} />;
        }
        break;
      case 'singleLanguageSpelling':
        if (selectedSpellingList) {
          return <SingleLanguageSpellingGame list={selectedSpellingList} onGoHome={handleGoHome} onGoBack={handleGoBackToSelection} />;
        }
        break;
      case 'historyMatch':
        if (selectedHistoryList) {
          return <HistoryMatchGame list={selectedHistoryList} onGoHome={handleGoHome} onGoBack={handleGoBackToSelection} />;
        }
        break;
      case 'verbGame':
        if (selectedVerbList) {
          return <VerbGame list={selectedVerbList} onGoHome={handleGoHome} onGoBack={handleGoBackToSelection} />;
        }
        break;
      case 'reels':
        return <ReelsViewer year={currentYear} term={currentTerm} onGoHome={handleGoHome} />;
    }
    return <MenuScreen onStartGame={handleStartGame} year={currentYear} term={currentTerm} onYearChange={setCurrentYear} onTermChange={setCurrentTerm} />;
  }
  
  return <>{renderScreen()}</>;
};

export default App;
