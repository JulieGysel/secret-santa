import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useGameContext } from '../../hooks/GameContext';
import { GrabItem, Room, MenuButton } from '../../components';
import { FreeStuff, InventoryItems, Miscelaneous } from '../../types';
import { RoomSwitch } from '../RoomSwitch';
import { WrappingSection } from '../WrappingSection';

import commonSound from '../../audio/common.mp3';
import { Window } from '../Window';

const FreeStuffSection = () => {
  const { inventory, usedUp, gifted } = useGameContext();

  const freeItems = React.useMemo(() => {
    const filter = inventory.concat(usedUp).concat(gifted);
    return Object.values(FreeStuff).filter((item) => !filter.includes(item));
  }, [gifted, inventory, usedUp]);

  return (
    <>
      <p>Wow! That's a lot of free stuff! Or is it just junk that should have been thrown out?</p>
      <div className="flex flex-wrap gap-2">
        {freeItems.map((item, i) => (
          <GrabItem item={item} key={`grab-item-${i}`} />
        ))}
      </div>
    </>
  );
};

const MonsteraSection = () => {
  const { inventory, usedUp, paintingDown, setPaintingDown, addToInventory } = useGameContext();

  const paintingPos = paintingDown
    ? "The controversial painting of an undressing lady is stood by the monstera's plant pot."
    : 'A painting of an undressing lady from behind is hanging on the wall next to it.';

  return (
    <>
      <p>The Monstera is a big plant climbing on the walls of the common room.</p>

      {!inventory.includes(Miscelaneous.painting) && !usedUp.includes(Miscelaneous.painting) ? (
        <>
          <p>{paintingPos}</p>
          <div className="flex flex-wrap gap-2">
            <GrabItem
              item={Miscelaneous.painting}
              customItems={[
                {
                  label: paintingDown ? 'Put up' : 'Put down',
                  command: () => {
                    setPaintingDown(!paintingDown);
                  },
                },
                {
                  label: 'Grab',
                  command: () => {
                    addToInventory(Miscelaneous.painting);
                  },
                },
              ]}
            />
          </div>
        </>
      ) : (
        <p>There used to be a painting around here but it is nowhere to be found today.</p>
      )}
    </>
  );
};

export const CommonRoom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { inventory, mute } = useGameContext();

  const canWrap = React.useMemo(
    () =>
      inventory.includes(InventoryItems.tape) &&
      inventory.includes(InventoryItems.paper) &&
      inventory.includes(InventoryItems.scissors),
    [inventory],
  );

  const wrapAction = React.useMemo(() => {
    return canWrap
      ? [
          {
            label: 'Do some work',
            command: () => {
              setVisible(true);
              setDialogContent(<WrappingSection />);
            },
          },
        ]
      : [];
  }, [canWrap]);

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <div className="flex-grow-1" key="spacer"></div>,
    <Button
      label="Leave the room"
      outlined
      severity="info"
      onClick={() => {
        setVisible(true);
        setDialogContent(<RoomSwitch closeModal={closeModal} />);
      }}
      key="leave"
    />,
  ];

  const roomItems = [
    <MenuButton
      label="Tables"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(
              "There are some crumbs on the table but it's not too bad. You might be able to do some work here later if you wanted to.",
            );
          },
        },
        ...wrapAction,
      ]}
      key="tables"
    />,
    <MenuButton
      label="Free stuff"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(<FreeStuffSection />);
          },
        },
      ]}
      key="free-stuff"
    />,
    <MenuButton
      label="Monstera"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(<MonsteraSection />);
          },
        },
      ]}
      key="monstera"
    />,
    <MenuButton
      label="Outside doors"
      items={[
        {
          label: 'Look outside',
          command: () => {
            setVisible(true);
            setDialogContent(<Window />);
          },
        },
      ]}
      key="outside-doors"
    />,
  ];

  return (
    <>
      <Room
        title={'Common Room'}
        description={
          <>
            <p>The common room is often the center of all the action here at the dorm.</p>
            <p>
              The tables in the middle get slightly reorganized every now and then. They also only
              get cleaned every <i>now and then</i>. But today they are looking good. You might be
              able to do some work here{!canWrap && ' later on'}, given that your own table is now
              rendered unusable by a squatting Santa.
            </p>
            <p>
              On one side, next to the basement doors, there is a large cupboard with bin bags for
              the kitchens. But today you can barely see it under all the free stuff that people
              have left for taking.
            </p>
            <p>
              On the other side, the large monstera plant is climbing on the walls of the common
              room.
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
        <source src={commonSound} type="audio/mpeg" />
      </audio>
    </>
  );
};
