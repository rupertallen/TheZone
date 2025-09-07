
import React, { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { ListSelectionScreen } from './components/ListSelectionScreen';
import { WordMatchGame } from './components/WordMatchGame';
import { SpellingGame } from './components/SpellingGame';
import { Screen, GameType, WordList } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [selectedList, setSelectedList] = useState<WordList | null>(null);

  const handleStartGame = (game: GameType) => {
    setSelectedGame(game);
    setActiveScreen('listSelection');
  };

  const handleSelectList = (list: WordList) => {
    setSelectedList(list);
    if (selectedGame) {
      setActiveScreen(selectedGame);
    }
  };

  const handleGoHome = () => {
    setActiveScreen('menu');
    setSelectedGame(null);
    setSelectedList(null);
  };
  
  const handleGoBack = () => {
    setActiveScreen('listSelection');
    setSelectedList(null);
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'menu':
        return <MenuScreen onStartGame={handleStartGame} />;
      case 'listSelection':
        return <ListSelectionScreen onSelectList={handleSelectList} onGoBack={handleGoHome} />;
      case 'wordMatch':
        if (selectedList) {
          return <WordMatchGame list={selectedList} onGoHome={handleGoHome} onGoBack={handleGoBack} />;
        }
        break;
      case 'spellingBee':
        if (selectedList) {
          return <SpellingGame list={selectedList} onGoHome={handleGoHome} onGoBack={handleGoBack} />;
        }
        break;
    }
    // Fallback to menu if state is inconsistent
    return <MenuScreen onStartGame={handleStartGame} />;
  }
  
  return <>{renderScreen()}</>;
};

export default App;
