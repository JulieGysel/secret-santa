import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import { GrabItem, Miscelaneous } from '../inventory';

// todo
const games = ['Settlers of Catan', 'Chess', 'Cards'];

const Movie = ({ movie }: { movie: string }) => {
  const { inventory } = useGameContext();
  const [isVisible, setVisible] = React.useState(false);
  const cookieRecipeAvailable = !inventory.includes(Miscelaneous.cookieRecipe);

  return (
    <>
      <p>Now watching: {movie}.</p>
      {cookieRecipeAvailable && (
        <>
          <p>But what is that in the couch?</p>
          <div className="flex flex-wrap gap-2">
            <MenuButton
              label="Couch"
              items={[
                {
                  label: 'Explore',
                  command: () => {
                    setVisible(true);
                  },
                },
              ]}
            />
            <Dialog
              visible={isVisible}
              onHide={() => setVisible(false)}
              footer={
                <Button
                  label="Back"
                  outlined
                  severity="secondary"
                  onClick={() => setVisible(false)}
                />
              }
              dismissableMask
              draggable={false}
              resizable={false}
              closable={false}
              className="w-5"
            >
              <p>Recipe description</p>
              <div className="flex flex-wrap gap-2">
                <GrabItem item={Miscelaneous.cookieRecipe} />
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export const TVRoom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { movie } = useGameContext();

  const tvActions = React.useMemo(
    () =>
      movie
        ? [
            {
              label: 'Watch',
              command: () => {
                setVisible(true);
                setDialogContent(<Movie movie={movie} />);
              },
            },
          ]
        : [],
    [movie],
  );

  const game = React.useMemo(() => games[Math.floor(Math.random() * 100) % games.length], []);

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <div className="flex-grow-1" key={'span'}></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('');
      }}
      key={'complain'}
    />,
    <Button
      label="Leave the room"
      outlined
      severity="info"
      onClick={() => {
        setVisible(true);
        setDialogContent(<RoomSwitch closeModal={closeModal} />);
      }}
      key={'leave'}
    />,
  ];

  const roomItems = [
    <MenuButton
      label="TV"
      items={tvActions}
      disabledReason="No movie is currently playing."
      key={'tv'}
    />,
    <MenuButton
      label="Board game stack"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(
              `So many games to choose from. There is ${games.join(', ')}... The condition of some leaves a lot to be desired. But you can play them anyway!`,
            );
          },
        },
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setDialogContent(`${game}? Good choice! That will be a fun couple hours...`);
          },
        },
      ]}
      key={'board-games'}
    />,
    <MenuButton
      label="Outside doors"
      items={[
        {
          label: 'Look outside',
          command: () => {
            setVisible(true);
            setDialogContent('Nasty Danish morning weather.');
          },
        },
      ]}
      key={'doors'}
    />,
  ];

  return (
    <>
      <Room
        title={'TV Room'}
        description={<p>TV Description</p>}
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
