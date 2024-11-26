import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './sections/Chat';
import { Inventory } from './sections/Inventory';
import { Intro } from './sections/Intro';
import { TVRoom } from './sections/rooms/TVRoom';

const App = () => {
  return (
    <div className="m-2 flex flex-column gap-2">
      <ProgressBar value={20} color="#B73E43" />
      <div className="grid">
        <div className="col col-0">
          {/* <Room room={Rooms.bedroom} /> */}
          <TVRoom />
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
