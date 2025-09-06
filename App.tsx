
import React, { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { WordMatchGame } from './components/WordMatchGame';
import { SpellingGame } from './components/SpellingGame';
import { Screen } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('menu');

  const handleStartGame = (game: 'wordMatch' | 'spellingBee') => {
    if (game === 'wordMatch') {
      setActiveScreen('wordMatch');
    } else if (game === 'spellingBee') {
      setActiveScreen('spellingBee');
    }
    // Future games can be handled here
  };

  const handleGoHome = () => {
    setActiveScreen('menu');
  };
  
  return (
    <>
      {activeScreen === 'menu' && <MenuScreen onStartGame={handleStartGame} />}
      {activeScreen === 'wordMatch' && <WordMatchGame onGoHome={handleGoHome} />}
      {activeScreen === 'spellingBee' && <SpellingGame onGoHome={handleGoHome} />}
    </>
  );
};

export default App;
