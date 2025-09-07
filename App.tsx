
import React, { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { ListSelectionScreen } from './components/ListSelectionScreen';
import { SingleLanguageListSelectionScreen } from './components/SingleLanguageListSelectionScreen';
import { WordMatchGame } from './components/WordMatchGame';
import { SpellingGame } from './components/SpellingGame';
import { SingleLanguageSpellingGame } from './components/SingleLanguageSpellingGame';
import { HistoryMatchGame } from './components/HistoryMatchGame';
import { Screen, GameType, WordList, SingleWordList } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [selectedList, setSelectedList] = useState<WordList | null>(null);
  const [selectedSingleList, setSelectedSingleList] = useState<SingleWordList | null>(null);

  const handleStartGame = (game: GameType) => {
    setSelectedGame(game);
    if (game === 'singleLanguageSpelling') {
      setActiveScreen('singleLanguageListSelection');
    } else if (game === 'historyMatch') {
      setActiveScreen('historyMatch');
    } else {
      setActiveScreen('listSelection');
    }
  };

  const handleSelectList = (list: WordList) => {
    setSelectedList(list);
    if (selectedGame) {
      setActiveScreen(selectedGame);
    }
  };

  const handleSelectSingleLanguageList = (list: SingleWordList) => {
    setSelectedSingleList(list);
    setActiveScreen('singleLanguageSpelling');
  };

  const handleGoHome = () => {
    setActiveScreen('menu');
    setSelectedGame(null);
    setSelectedList(null);
    setSelectedSingleList(null);
  };
  
  const handleGoBackToListSelection = () => {
    setActiveScreen('listSelection');
    setSelectedList(null);
  };

  const handleGoBackToSingleListSelection = () => {
    setActiveScreen('singleLanguageListSelection');
    setSelectedSingleList(null);
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'menu':
        return <MenuScreen onStartGame={handleStartGame} />;
      case 'listSelection':
        return <ListSelectionScreen onSelectList={handleSelectList} onGoBack={handleGoHome} />;
      case 'singleLanguageListSelection':
        return <SingleLanguageListSelectionScreen onSelectList={handleSelectSingleLanguageList} onGoBack={handleGoHome} />;
      case 'wordMatch':
        if (selectedList) {
          return <WordMatchGame list={selectedList} onGoHome={handleGoHome} onGoBack={handleGoBackToListSelection} />;
        }
        break;
      case 'spellingBee':
        if (selectedList) {
          return <SpellingGame list={selectedList} onGoHome={handleGoHome} onGoBack={handleGoBackToListSelection} />;
        }
        break;
      case 'singleLanguageSpelling':
        if (selectedSingleList) {
          return <SingleLanguageSpellingGame list={selectedSingleList} onGoHome={handleGoHome} onGoBack={handleGoBackToSingleListSelection} />;
        }
        break;
      case 'historyMatch':
        return <HistoryMatchGame onGoHome={handleGoHome} />;
    }
    // Fallback to menu if state is inconsistent
    return <MenuScreen onStartGame={handleStartGame} />;
  }
  
  return <>{renderScreen()}</>;
};

export default App;