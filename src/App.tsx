// import React from 'react';
import { Intro } from './sections/Intro';
import { GameContextProvider } from './hooks/GameContextProvider';
import { Main } from './sections/Main';

const App = () => {
  return (
    <GameContextProvider>
      <Main />
      <Intro />
    </GameContextProvider>
  );
};

export default App;
