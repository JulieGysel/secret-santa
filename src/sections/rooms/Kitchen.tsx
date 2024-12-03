import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGameContext } from '../../hooks/GameContext';
import { GrabItem, MenuButton, Room } from '../../components';
import { CupboardItems, Miscelaneous } from '../../types';
import { RoomSwitch } from '../RoomSwitch';
import { CookingSection } from '../CookingSection';

import kitchenSound from '../../audio/kitchen.mp3';
import { Window } from '../Window';

const Trash = () => {
  const { inventory } = useGameContext();
  const wrappingPaperAvailable = !inventory.includes(Miscelaneous.paper);

  return (
    <>
      <p>You sweet, helpful person! Thank you for taking the trash out.</p>
      {wrappingPaperAvailable && (
        <>
          <p>But what is that lying next to the container?</p>
          <div className="flex flex-wrap gap-2">
            <GrabItem item={Miscelaneous.paper} mystery />
          </div>
        </>
      )}
    </>
  );
};

const Oven = () => {
  const { inventory } = useGameContext();
  const panAvailable = !inventory.includes(Miscelaneous.bakingTray);

  return (
    <>
      <p>
        It's just an oven.{' '}
        {panAvailable ? 'With a baking tray.' : 'But someone has taken the baking tray.'}
      </p>
      {panAvailable && (
        <div className="flex flex-wrap gap-2">
          <GrabItem item={Miscelaneous.bakingTray} />
        </div>
      )}
    </>
  );
};

const Cupboard = () => {
  const { inventory, usedUp, gifted } = useGameContext();

  const cupboardItems = React.useMemo(() => {
    const filter = inventory.concat(usedUp).concat(gifted);
    return Object.values(CupboardItems).filter((item) => !filter.includes(item));
  }, [gifted, inventory, usedUp]);

  return (
    <>
      {cupboardItems.length < 3 ? (
        <p>Your cupboard is looking strangely empty.</p>
      ) : (
        <p>Look at that, you do have some stuff in your cupboard.</p>
      )}
      <div className="flex flex-wrap gap-2">
        {cupboardItems.map((item, i) => (
          <GrabItem item={item} key={`grab-item-${i}`} />
        ))}
      </div>
    </>
  );
};

export const Kitchen = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { inventory, mute } = useGameContext();
  const additionalActions = !inventory.includes(Miscelaneous.paper)
    ? [
        {
          label: 'Take out',
          command: () => {
            setVisible(true);
            setDialogContent(<Trash />);
          },
        },
      ]
    : [];

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <Button
      label="Cook something"
      outlined
      severity="secondary"
      onClick={() => {
        setVisible(true);
        setDialogContent(<CookingSection closeModal={closeModal} />);
      }}
    />,
    <div className="flex-grow-1"></div>,
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
      label="Cupboard"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(<Cupboard />);
          },
        },
      ]}
    />,
    <MenuButton
      label="Oven"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(<Oven />);
          },
        },
      ]}
    />,
    <MenuButton
      label="Trash"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent('Do you think you will find something useful in the trash?');
          },
        },
        ...additionalActions,
      ]}
    />,
    <MenuButton
      label="Kitchen sink"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent("It's a kitchen sink... with some leftovers around the drain? Eww!");
          },
        },
        {
          label: 'Clean',
          command: () => {
            setVisible(true);
            setDialogContent(
              "Somehow, the kitchen sink is never clean enough. You look away for a second and it's dirty again. But thank you for your attempt.",
            );
          },
        },
      ]}
    />,
    <MenuButton
      label="Window"
      items={[
        {
          label: 'Look outside',
          command: () => {
            setVisible(true);
            setDialogContent(<Window />);
          },
        },
      ]}
    />,
  ];

  return (
    <>
      <Room
        title={'Kitchen'}
        description={
          <>
            <p>Roughtly ten people share each of the six kitchens here at the dorm.</p>
            <p>
              Everybody get's their own cupboard and has access to a sink, a big stove, and oven.
            </p>
            <p>
              Ideally, the cleaning efforts would be equally divided between each of the ten people.
              But we all know that one person always ends up doing more work than another one.
            </p>
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
      <audio preload="auto" hidden autoPlay loop muted={mute}>
        <source src={kitchenSound} type="audio/mpeg" />
      </audio>
    </>
  );
};
