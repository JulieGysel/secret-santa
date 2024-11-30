import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './Chat';
import { Inventory } from './Inventory';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Basement, Bedroom, CommonRoom, Kitchen, TVRoom } from './rooms';
import { Tooltip } from 'primereact/tooltip';
import { ChatContextProvider } from '../hooks/ChatContextProvider';

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
    <div className="flex flex-column gap-2 p-2 h-screen">
      <ProgressBar
        value={context.progress}
        color="#B73E43"
        className="progress_bar flex-grow-0"
        data-pr-tooltip="You are this close to making Santa leave"
        data-pr-position="mouse"
      />
      <div className="flex-grow-1 grid w-full m-auto">
        <div className="col pl-0">{room}</div>
        <div className="col col-4 pr-0">
          <ChatContextProvider>
            <Chat />
          </ChatContextProvider>
        </div>
      </div>
      <Inventory />
    </div>
  );
};
