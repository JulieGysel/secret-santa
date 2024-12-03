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

  React.useEffect(() => {
    if (showOutro) {
      setVisible(true);
    }
  }, [showOutro]);

  const gameStats = React.useMemo(
    () => [
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
    ],
    [gameEnd, gameStart, messages, stats],
  );

  return (
    <Dialog
      header="The End."
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
        <div className="pt-4">
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
      }
    >
      <p>Congratulations! You won this game.</p>

      <DataTable
        value={gameStats}
        dataKey={'value'}
        scrollable
        scrollHeight="45vh"
        headerColumnGroup={
          <ColumnGroup>
            <Row>
              <Column header="Would you like to see some stats?" colSpan={2}></Column>
            </Row>
          </ColumnGroup>
        }
      >
        <Column field="stat" />
        <Column field="value" />
      </DataTable>
    </Dialog>
  );
};
