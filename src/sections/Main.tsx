import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './Chat';
import { Inventory } from './Inventory';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Basement, Bedroom, CommonRoom, Kitchen, TVRoom } from './rooms';
import { Tooltip } from 'primereact/tooltip';

export const Main = () => {
  const context = useGameContext();

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
      <Tooltip target={'.progress_bar'} />
      <ProgressBar
        value={context.progress}
        color="#B73E43"
        className="progress_bar"
        data-pr-tooltip="You are this close to making Santa leave"
        data-pr-position="mouse"
      />
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
