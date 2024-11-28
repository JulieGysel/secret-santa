import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import { FreezerItems, GrabItem, Miscelaneous } from '../inventory';

const Freezer = () => {
  const { inventory } = useGameContext();
  const freezerItems = Object.values(FreezerItems).filter((item) => !inventory.includes(item));

  return (
    <>
      <p>Wow! That's a lot of stuff!</p>
      <div className="flex flex-wrap gap-2">
        {freezerItems.map((item, i) => (
          <GrabItem item={item} key={`grab-item-${i}`} />
        ))}
      </div>
    </>
  );
};

const Bar = () => {
  const { inventory } = useGameContext();
  const rumAvailable = !inventory.includes(Miscelaneous.rum);

  return (
    <>
      {/* todo */}
      <p>Bar area description</p>
      {rumAvailable && (
        <div className="flex flex-wrap gap-2">
          <GrabItem item={Miscelaneous.rum} />
        </div>
      )}
    </>
  );
};

export const Basement = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { tennisGames, setTennisGames, footballGames, setFootballGames } = useGameContext();

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <div className="flex-grow-1"></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('Complaining...');
      }}
    />,
    <Button
      label="Leave the room"
      outlined
      severity="info"
      onClick={() => {
        setVisible(true);
        setDialogContent(<RoomSwitch closeModal={closeModal} />);
      }}
    />,
  ];

  const roomItems = [
    <MenuButton
      label="Freezer"
      items={[
        {
          label: 'Look inside',
          command: () => {
            setVisible(true);
            setDialogContent(<Freezer />);
          },
        },
      ]}
    />,
    <MenuButton
      label="Table tennis"
      items={[
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setTennisGames(tennisGames + 1);
            setDialogContent(
              <>
                <p>
                  You can always count on there being someone who will play a round of table tennis
                  with you.
                </p>
                <p>
                  {Math.floor(Math.random() * 100) % Math.ceil(tennisGames / 10)
                    ? 'Congratulations! You won this time!'
                    : 'You lost the game. But perhaps you will have more luck next time?'}
                </p>
              </>,
            );
          },
        },
      ]}
    />,
    <MenuButton
      label="Table football"
      items={[
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setFootballGames(footballGames + 1);
            setDialogContent(
              <>
                <p>
                  You can always count on there being someone who will play a game of table football
                  with you.
                </p>
                <p>
                  {Math.floor(Math.random() * 100) % Math.ceil(footballGames / 10)
                    ? 'Congratulations! You won this time!'
                    : 'You lost the game. But perhaps you will have more luck next time?'}
                </p>
              </>,
            );
          },
        },
      ]}
    />,
    <MenuButton
      label="Bar area"
      items={[
        {
          label: 'Look around',
          command: () => {
            setVisible(true);
            setDialogContent(<Bar />);
          },
        },
      ]}
    />,
  ];

  return (
    <>
      <Room
        title={'Basement'}
        description={
          <>
            {/* //todo */}
            <p>Basement description</p>
          </>
        }
        roomActions={roomActions}
        roomItems={roomItems}
      ></Room>
      <Dialog
        footer={<Button label="Back" outlined severity="secondary" onClick={closeModal} />}
        visible={visible}
        onHide={closeModal}
        dismissableMask
        draggable={false}
        resizable={false}
        closable={false}
        className="w-5"
      >
        {dialogContent}
      </Dialog>
    </>
  );
};
