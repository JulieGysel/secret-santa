import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Chat } from './Chat';
import { Inventory } from './Inventory';
import { RoomType, useGameContext } from '../hooks/GameContext';
import { Basement, Bedroom, CommonRoom, Kitchen, TVRoom } from './rooms';
import { ChatContextProvider } from '../hooks/ChatContextProvider';

import experience from '../audio/experience.mp3';
import inventory from '../audio/inventory.mp3';
import { Intro } from './Intro';
import { Button } from 'primereact/button';

export const Main = () => {
  const {
    room,
    showIntro,
    progress,
    mute,
    setMute,
    progressAudioRef,
    inventoryAudioRef,
    gameStart,
  } = useGameContext();
  const [gameTime, setGameTime] = React.useState('');

  React.useEffect(() => {
    const tick = () => {
      if (gameStart) {
        const now = new Date(Date.now());
        const timeDiff = new Date(
          now.getTime() - gameStart.getTime() + now.getTimezoneOffset() * 1000 * 60,
        );

        setGameTime(timeDiff.toLocaleTimeString());
      }
    };

    setInterval(tick, 1000);
  }, [gameStart]);

  const roomSection = React.useMemo(() => {
    switch (room) {
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
  }, [room]);

  return showIntro ? (
    <Intro />
  ) : (
    <>
      <div className="flex flex-column gap-2 p-2 h-screen">
        <div className="flex align-items-center gap-2">
          <ProgressBar
            value={progress}
            color="#B73E43"
            className="progress_bar flex-grow-1"
            data-pr-tooltip="You are this close to making Santa leave"
            data-pr-position="mouse"
          />
          <div className="flex">{gameTime}</div>
          <Button
            icon={`pi ${mute ? 'pi-volume-off' : 'pi-volume-up'}`}
            text
            rounded
            className="w-1rem h-1rem p-2"
            pt={{ icon: { className: 'text-xs' } }}
            aria-label="Toggle sound"
            tooltip="Toggle sound"
            tooltipOptions={{ position: 'left' }}
            onClick={() => setMute(!mute)}
          />
        </div>

        <div className="flex-grow-1 flex gap-2 w-full m-auto">
          <div className="flex-grow-1">{roomSection}</div>
          <div className="flex-grow-0 w-4 max-w-30rem" style={{ minWidth: '25rem' }}>
            <ChatContextProvider>
              <Chat />
            </ChatContextProvider>
          </div>
        </div>
        <Inventory />
      </div>
      <audio ref={progressAudioRef} preload="auto" hidden muted={mute}>
        <source src={experience} type="audio/mpeg" />
      </audio>
      <audio ref={inventoryAudioRef} preload="auto" hidden muted={mute}>
        <source src={inventory} type="audio/mpeg" />
      </audio>
    </>
  );
};
