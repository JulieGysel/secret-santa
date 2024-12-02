// import React from 'react';
import { GameContextProvider } from './hooks/GameContextProvider';
import { Main } from './sections/Main';

const App = () => {
  return (
    <GameContextProvider>
      <Main />
    </GameContextProvider>
  );
};

export default App;
