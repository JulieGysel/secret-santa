import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import {
  FreeStuff,
  GrabItem,
  InventoryItems,
  InventoryItemType,
  Miscelaneous,
  WrappableItems,
} from '../inventory';
import { Dropdown } from 'primereact/dropdown';

import commonSound from '../../audio/common.mp3';

const FreeStuffSection = () => {
  const { inventory, usedUp } = useGameContext();
  const fridgeItems = Object.values(FreeStuff)
    .filter((item) => !inventory.includes(item))
    .filter((item) => !usedUp.includes(item));

  return (
    <>
      <p>Wow! That's a lot of free stuff! Or junk that should be thrown out?</p>
      <div className="flex flex-wrap gap-2">
        {fridgeItems.map((item, i) => (
          <GrabItem item={item} key={`grab-item-${i}`} />
        ))}
      </div>
    </>
  );
};

const MonsteraSection = ({ closeModal }: { closeModal: () => void }) => {
  const { inventory, usedUp, paintingDown, setPaintingDown, addToInventory } = useGameContext();

  const paintingPos = paintingDown
    ? "The controversial painging is stood by the monstera's plant pot."
    : 'The controversial painging is hanging on the wall next to it.';

  return (
    <>
      <p>The Monstera is a big plant.</p>

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
                    closeModal();
                  },
                },
                {
                  label: 'Grab',
                  command: () => {
                    addToInventory(Miscelaneous.painting);
                    closeModal();
                  },
                },
              ]}
            />
          </div>
        </>
      ) : (
        <p>The controversial painting is nowhere to be found.</p>
      )}
    </>
  );
};

const WrappingSection = () => {
  const { inventory, wrapItem: wrapItemFunc } = useGameContext();
  const [wrapItem, setWrapItem] = React.useState<InventoryItemType | undefined>();

  const [isVisible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');

  const options = React.useMemo(
    () => inventory.map((item) => ({ name: item, value: item })),
    [inventory],
  );

  const onWrap = React.useCallback(() => {
    if (wrapItem) {
      if (WrappableItems.includes(wrapItem)) {
        console.log('wrapping', wrapItem);
        setDialogContent(
          `You could work on your wrapping skills. But that is indeed one wrapped ${wrapItem.toLowerCase()}.`,
        );

        setVisible(true);
        wrapItemFunc(wrapItem);
      } else {
        switch (wrapItem) {
          case InventoryItems.tape:
            setDialogContent('If you wrap the tape, how are you going to tape the wrapping paper?');
            break;
          default:
            setDialogContent(`Wrapping ${wrapItem.toLowerCase()} makes no sense.`);
            break;
        }
        setVisible(true);
      }
    }
  }, [wrapItem, wrapItemFunc]);

  return (
    <>
      <p>What do you want to wrap?</p>
      <div className="flex gap-2">
        <Dropdown
          value={wrapItem}
          options={options}
          onChange={(e) => setWrapItem(e.value)}
          optionLabel={'name'}
          placeholder="Select a recipe"
          className="w-5"
          pt={{ wrapper: { className: 'max-h-full' } }}
        />
        <Button label="Wrap" disabled={!wrapItem} onClick={onWrap} />
      </div>
      <Dialog
        visible={isVisible}
        onHide={() => setVisible(false)}
        footer={
          <Button label="Back" outlined severity="secondary" onClick={() => setVisible(false)} />
        }
        dismissableMask
        draggable={false}
        resizable={false}
        closable={false}
        className="w-5"
      >
        <p>{dialogContent}</p>
      </Dialog>
    </>
  );
};

export const CommonRoom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();
  const { inventory } = useGameContext();

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
          <Button
            label="Wrap something"
            outlined
            severity="secondary"
            onClick={() => {
              setVisible(true);
              setDialogContent(<WrappingSection />);
            }}
          />,
        ]
      : [];
  }, [canWrap]);

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    ...wrapAction,
    <div className="flex-grow-1" key="spacer"></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('Complaining about Santa...');
      }}
      key="complain"
    />,
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
              'The tables in the common room offer a big working surface to everyone in the dorm.',
            );
          },
        },
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
            setDialogContent(<MonsteraSection closeModal={closeModal} />);
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
            setDialogContent('Nasty Danish morning weather.');
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
            {/* //todo */}
            <p>Common room description</p>
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
      <audio preload="auto" hidden autoPlay loop>
        <source src={commonSound} type="audio/mpeg" />
      </audio>
    </>
  );
};
