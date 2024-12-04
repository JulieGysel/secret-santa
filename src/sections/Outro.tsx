import React from 'react';
import { Dialog } from 'primereact/dialog';
import { useGameContext } from '../hooks/GameContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { clearCookies, getGameTime } from '../helpers';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from 'primereact/button';
import { useChatContext } from '../hooks/ChatContext';

export const Outro = () => {
  const { showOutro, gameStart, gameEnd, stats } = useGameContext();
  const { messages } = useChatContext();
  const [visible, setVisible] = React.useState(false);

  const [showStats, setShowStats] = React.useState(false);

  React.useEffect(() => {
    if (showOutro) {
      setVisible(true);
    }
  }, [showOutro]);

  console.log(messages);

  const gameStats = [
    { stat: 'Time', value: getGameTime(gameStart as Date, gameEnd), key: 'time' },
    { stat: 'Movies watched', value: stats.moviesWatched, key: 'movies' },
    {
      stat: 'Movies watched with Santa',
      value: stats.moviesWatchedWithSanta,
      key: 'movies-santa',
    },
    {
      stat: 'Messages sent',
      value: messages.filter((message) => message.author === ' ').length,
      key: 'message-sent',
    },
    {
      stat: 'Messages liked',
      value: messages.filter((message) => message.author === ' ' && message.liked).length,
      key: 'message-sent',
    },
    { stat: 'People let in', value: stats.peopleLetIn, key: 'let-in' },
    { stat: 'Football games played', value: stats.footballGamesPlayed, key: 'f-played' },
    { stat: 'Football games won', value: stats.footballGamesWon, key: 'f-won' },
    { stat: 'Ping Pong games played', value: stats.tennisGamesPlayed, key: 't-played' },
    { stat: 'Ping Pong games won', value: stats.tennisGamesWon, key: 't-won' },
  ];

  return (
    <Dialog
      visible={visible}
      draggable={false}
      resizable={false}
      pt={{ mask: { className: 'surface-ground' } }}
      className="w-5"
      onHide={() => {
        setVisible(!visible);
      }}
      closable={false}
      style={{ minHeight: '50vh' }}
      footer={
        showStats ? (
          <div className="pt-4 flex justify-content-between">
            <p>
              Bike shed <span className="font-bold">113</span>.
            </p>
            <Button
              label={'Replay'}
              severity="secondary"
              outlined
              onClick={() => {
                clearCookies();
                window.location.reload();
              }}
            />
          </div>
        ) : (
          <div className="pt-4 flex justify-content-end">
            <Button label="Next" severity="secondary" outlined onClick={() => setShowStats(true)} />
          </div>
        )
      }
    >
      {showStats ? (
        <>
          <h2>The End.</h2>
          <p>Congratulations! You won this game.</p>

          <DataTable
            value={gameStats}
            dataKey={'value'}
            scrollable
            scrollHeight="45vh"
            headerColumnGroup={
              <ColumnGroup>
                <Row>
                  <Column header="Would you like to see some game stats?" colSpan={2}></Column>
                </Row>
              </ColumnGroup>
            }
          >
            <Column field="stat" />
            <Column field="value" />
          </DataTable>
        </>
      ) : (
        <>
          <p>
            <span className="text-400">Santa:</span> “My friend, todays has been the best day of my
            life.”
          </p>
          <p>
            <span className="text-400">Santa:</span> “It snowed. I ate incredible food. I had a good
            time with some great people. I got some awesome gifts...”
          </p>
          <p>
            <span className="text-400">Santa:</span> “And all because of you. Thank you.”
          </p>
          <p>
            <span className="text-400">Santa:</span> “I guess this is what Christmas is all about.
            And it would be a shame if I denied it to others. So I must go now.”
          </p>
          <p>
            <span className="text-400">Santa:</span> “Thank you. And goodbye.”
          </p>
        </>
      )}
    </Dialog>
  );
};
