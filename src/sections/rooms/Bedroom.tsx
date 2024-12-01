import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import {
  AcceptableGifts,
  FridgeItems,
  getGiftValue,
  GrabItem,
  InventoryItems,
  InventoryItemType,
} from '../inventory';
import { useGameContext } from '../../hooks/GameContext';
import { Dropdown } from 'primereact/dropdown';

const endingLines = [
  <p>Well, except for fucking Santa who's decided to move in for some reason.</p>,
  <p>And Santa is still chilling on your chair.</p>,
  <p>Santa is humming a Christmas carol. It sounds weirdly ominous.</p>,
];

const FridgeItemSection = () => {
  const { inventory, usedUp } = useGameContext();
  const fridgeItems = Object.values(FridgeItems)
    .filter((item) => !inventory.includes(item))
    .filter((item) => !usedUp.includes(item));

  return (
    <>
      <p>The fridge could do with some cleaning. But not right now.</p>
      {fridgeItems.length < 5 ? (
        <p>You are too busy right now.</p>
      ) : (
        <p>When there's less stuff inside perhaps.</p>
      )}
      <div className="flex flex-wrap gap-2">
        {fridgeItems.map((item, i) => (
          <GrabItem item={item} key={`grab-item-${i}`} />
        ))}
      </div>
    </>
  );
};

const GiftSection = () => {
  const [isVisible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [gift, setGift] = React.useState<InventoryItemType>();
  const { inventory, giftItem, makeProgress } = useGameContext();

  const options = React.useMemo(
    () => inventory.map((item) => ({ name: item, value: item })),
    [inventory],
  );

  const onGift = React.useCallback(() => {
    console.log('atempting to gift', gift);
    if (gift && AcceptableGifts.includes(gift)) {
      console.log('gift accepted!');
      setVisible(true);

      setDialogContent(`Santa: “Aww, thank you! I love ${gift.toLocaleLowerCase()}!”`);

      giftItem(gift);
      makeProgress(getGiftValue(gift));

      setGift(undefined);
    } else {
      switch (gift) {
        case InventoryItems.sugar:
          setDialogContent('Santa: “Are you trying to give me diabetes?”');
          break;
        default:
          setDialogContent(`Santa: “What am I supposed to do with ${gift}?”`);
          break;
      }
      setVisible(true);
    }
  }, [gift, giftItem, makeProgress]);

  return (
    <>
      <p>What would you like to give to Santa?</p>
      <div className="flex gap-2">
        <Dropdown
          value={gift}
          options={options}
          placeholder="Choose your gift"
          onChange={(e) => setGift(e.value)}
          optionLabel="name"
          className="w-6"
        />

        <Button label="Gift" disabled={!gift} onClick={onGift} />
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

export const Bedroom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();

  const endLine = React.useMemo(
    () => endingLines[Math.floor(Math.random() * 100) % endingLines.length],
    [],
  );

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <MenuButton
      label="Santa"
      items={[
        { label: 'Talk to Santa' },
        {
          label: 'Give a gift to Santa',
          command: () => {
            setVisible(true);
            setDialogContent(<GiftSection />);
          },
        },
      ]}
    />,
    <div className="flex-grow-1"></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('Santa: “You know I can hear you, mate?”');
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
      label="Bed"
      items={[
        {
          label: 'Go to sleep',
          command: () => {
            setVisible(true);
            setDialogContent('At this hour?');
          },
        },
      ]}
    />,
    <MenuButton
      label="Fridge"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(<FridgeItemSection />);
          },
        },
      ]}
    />,
    <MenuButton
      label="Outside door"
      items={[
        {
          label: 'Look outside',
          command: () => {
            setVisible(true);
            setDialogContent('Nasty Danish morning weather.');
          },
        },
      ]}
    />,
  ];

  return (
    <>
      <Room
        title={'Bedroom'}
        description={
          <>
            <p>
              If you had friends over, you would probably mention that your room is such a mess. But
              everybody would know it's not true at all.
            </p>
            <p>Not much in your room looks out of the ordinary.</p>
            {endLine}
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
