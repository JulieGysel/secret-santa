import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './components/Chat';
import { Card } from 'primereact/card';

const App = () => {
  return (
    <>
      <ProgressBar value={20} color="#B73E43" className="m-2" />
      <div className="flex justify-content-between m-2">
        <Card title="Main content" />
        <Chat />
      </div>
      <Card title={'Inventory'} className="m-2" />
    </>
  );
};

export default App;
