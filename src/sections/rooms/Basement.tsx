import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { MenuButton } from '../../components/MenuButton';
import { useGameContext } from '../../hooks/GameContext';
import { GrabItem, Room } from '../../components';
import { FreezerItems, Miscelaneous } from '../../types';

const Freezer = () => {
  const { inventory, usedUp, gifted } = useGameContext();

  const freezerItems = React.useMemo(() => {
    const filter = inventory.concat(usedUp).concat(gifted);
    return Object.values(FreezerItems).filter((item) => !filter.includes(item));
  }, [gifted, inventory, usedUp]);

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
  const { inventory, usedUp } = useGameContext();
  const rumAvailable = !inventory.includes(Miscelaneous.rum) && !usedUp.includes(Miscelaneous.rum);
  const tapeAvailable = !inventory.includes(Miscelaneous.tape);

  return (
    <>
      <p>The bar usually only get's used during parties.</p>
      {(rumAvailable || tapeAvailable) && (
        <>
          <p>But what is that under the bar?</p>
          <div className="flex flex-wrap gap-2">
            {rumAvailable && <GrabItem mystery item={Miscelaneous.rum} />}
            {tapeAvailable && <GrabItem mystery item={Miscelaneous.tape} />}
          </div>
        </>
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
    // <Button
    //   label="Complain about Santa"
    //   outlined
    //   severity="danger"
    //   onClick={() => {
    //     setVisible(true);
    //     setDialogContent('Complaining...');
    //   }}
    // />,
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
    <MenuButton
      label="Freezer"
      items={[
        {
          label: 'Freezer',
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
            setTennisGames((tennisGames || 0) + 1);
            setDialogContent(
              <>
                <p>
                  You can always count on there being someone who will play a round of table tennis
                  with you.
                </p>
                <p>
                  {/* todo: games won statistic */}
                  {!tennisGames
                    ? "Congratulations! You won the tennis game. But is this just beginner's luck?"
                    : Math.random() < Math.min((tennisGames || 0) / 33, 1)
                      ? 'Congratulations! You won this time!'
                      : "You lost the game. But that's okay, these things take practice."}
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
            setFootballGames((footballGames || 0) + 1);
            setDialogContent(
              <>
                <p>
                  You can always count on there being someone who will play a game of table football
                  with you.
                </p>
                <p>
                  {/* todo: games won statistic */}
                  {!footballGames
                    ? "Congratulations! You won the tennis game. But is this just beginner's luck?"
                    : Math.random() < Math.min((footballGames || 0) / 33, 1)
                      ? 'Congratulations! You won this time!'
                      : 'You lost the game. But perhaps you will have more luck next time?'}
                </p>
              </>,
            );
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
            <p>
              The dorm basement. The designated party area with painted walls, some more couches,
              and a bar.
            </p>
            <p>
              In the room next door, there are multiple freezers, table football, and a ping ping
              table.
            </p>
            <p>There is also a little gym hidden behind a paper wall.</p>
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
