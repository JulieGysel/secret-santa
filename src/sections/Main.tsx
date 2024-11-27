import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './Chat';
import { Inventory } from './Inventory';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Basement, Bedroom, CommonRoom, Kitchen, TVRoom } from './rooms';

export const Main = () => {
  const context = useGameContext();

  console.log(context);

  const room = React.useMemo(() => {
    switch (context.room) {
      case RoomType.BASEMENT:
        return <Basement />;
      case RoomType.KITCHEN:
        return <Kitchen />;
      case RoomType.TVROOM:
        return <TVRoom />;
      case RoomType.COMMON:
        return <CommonRoom />;
      case RoomType.BEDROOM:
      default:
        return <Bedroom />;
    }
  }, [context.room]);

  return (
    <div className="p-2 flex flex-column gap-2 h-screen">
      <ProgressBar value={20} color="#B73E43" />
      <div className="grid">
        <div className="col col-0">{room}</div>
        <div className="col col-3">
          <Chat />
        </div>
      </div>
      <div className="flex-grow-1"></div>
      <Inventory />
    </div>
  );
};
