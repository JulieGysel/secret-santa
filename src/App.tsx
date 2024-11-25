import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './sections/Chat';
import { Intro } from './sections/Intro';
import { Inventory } from './sections/Inventory';
import { Room } from './sections/Room';

const App = () => {
  return (
    <div className="m-2 flex flex-column gap-2">
      <ProgressBar value={20} color="#B73E43" />
      <div className="grid">
        <div className="col col-0">
          <Room />
        </div>
        <div className="col col-3">
          <Chat />
        </div>
      </div>
      <Inventory />
      <Intro />
    </div>
  );
};

export default App;
