import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { MenuButton } from '../../components/MenuButton';
import { RoomSwitch } from '../RoomSwitch';
import {
  AcceptableGifts,
  FridgeItems,
  getGiftValue,
  InventoryItems,
  InventoryItemType,
} from '../../types';
import { GrabItem, Room } from '../../components';
import { useGameContext } from '../../hooks/GameContext';

import bedroomSound from '../../audio/bedroom.mp3';
import { TalkSection } from '../TalkSection';
import { MenuItem } from 'primereact/menuitem';
import { Window } from '../Window';

const endingLines = [
  <p>Well, except for fucking Santa who's decided to move in for some reason.</p>,
  <p>And Santa is still chilling on your chair.</p>,
  <p>Santa is humming a Christmas carol. It sounds weirdly ominous.</p>,
];

const FridgeItemSection = () => {
  const { inventory, usedUp, gifted } = useGameContext();

  const fridgeItems = React.useMemo(() => {
    const filter = inventory.concat(usedUp).concat(gifted);
    return Object.values(FridgeItems).filter((item) => !filter.includes(item));
  }, [gifted, inventory, usedUp]);

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
    if (gift && AcceptableGifts.includes(gift)) {
      setVisible(true);

      switch (gift) {
        case InventoryItems.cookedAppleSlices:
        case InventoryItems.cookies:
        case InventoryItems.eggnog:
          setDialogContent(`Santa: “Aww, thank you! I love ${gift.toLocaleLowerCase()}!”`);
          break;
        case InventoryItems.carrots:
          setDialogContent('Santa: “I will take a carrot, thank you.“');
          break;
        case InventoryItems.beer:
          setDialogContent('Santa: “I will take a beer, thank you.“');
          break;
        case InventoryItems.iceLolly:
          setDialogContent('Santa: “Thanks. I like Ice lolies.“');
          break;
        case InventoryItems.wrappedPainting:
          setDialogContent('Santa: “Oh look at that... Ho. Ho. Ho“');
          break;
        case InventoryItems.wrappedVase:
        case InventoryItems.wrappedTshirt:
          setDialogContent('Santa: “This is what I always wanted! How did you know that?“');
          break;
        case InventoryItems.sandwich:
          setDialogContent("Santa: “I can't say no a good sandwich.“");
          break;
      }

      giftItem(gift);
      makeProgress(getGiftValue(gift));

      setGift(undefined);
    } else {
      switch (gift) {
        case InventoryItems.sugar:
          setDialogContent('Santa: “Are you trying to give me diabetes?”');
          break;
        case InventoryItems.ice:
          setDialogContent('Santa: “Just like that? No alcohol with them?”');
          break;
        case InventoryItems.cinnamon:
        case InventoryItems.salt:
          setDialogContent("Santa: “No, no, no. I'm way too old for this shit.”");
          break;
        case InventoryItems.scissors:
          setDialogContent('Santa: “Can I stab someone with these?”');
          break;
        case InventoryItems.eggs:
          setDialogContent('Santa: “Are we going to throw them at somebody?”');
          break;
        case InventoryItems.handCream:
          setDialogContent('Santa: “Is that lube?”');
          break;
        case InventoryItems.painting:
        case InventoryItems.vase:
        case InventoryItems.tshirt:
          setDialogContent('Santa: “Meh. Not even gift wrapped?”');
          break;
        case InventoryItems.jeans:
          setDialogContent("Santa: “These ain't gonna fit me.”");
          break;
        default:
          setDialogContent(`Santa: “What am I supposed to do with ${gift?.toLowerCase()}?”`);
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
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { mute, inventory } = useGameContext();

  const endLine = React.useMemo(
    () => endingLines[Math.floor(Math.random() * 100) % endingLines.length],
    [],
  );

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = React.useMemo(
    () => [
      <MenuButton
        label="Santa"
        items={
          [
            {
              label: 'Talk to Santa',
              command: () => {
                setVisible(true);
                setDialogContent(<TalkSection />);
              },
            },
            inventory.length && {
              label: 'Give a gift to Santa',
              command: () => {
                setVisible(true);
                setDialogContent(<GiftSection />);
              },
            },
          ].filter(Boolean) as MenuItem[]
        }
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
    ],
    [inventory.length],
  );

  const roomItems = [
    <MenuButton
      label="Bed"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(
              <>
                <p>The bed is just like you left it this morning.</p>
                <p>
                  Hopefully you can get rid of Santa soon so you can sleep in your own bed today.
                </p>
              </>,
            );
          },
        },
      ]}
    />,
    <MenuButton
      label="Table"
      items={[
        {
          label: 'Explore',
          command: () => {
            setVisible(true);
            setDialogContent(
              "It's very tempting to just sit down at your table and waste some time watching YouTube videos or something. But Santa is occupying your chair so that really isn't an option.",
            );
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
            setDialogContent(<Window />);
          },
        },
      ]}
    />,
  ];

  React.useEffect(() => {
    const rand = 1000 * 10 + Math.floor(1000 * Math.random()) * 50;
    const interval = setInterval(() => audioRef.current?.play(), rand);
    return () => clearInterval(interval);
  }, []);

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
            <p>
              Your bed looks just like you left it in the morning. Your table is standing next to
              the walls. And the fridge is softly humming. Not much in your room looks out of the
              ordinary.
            </p>
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
      <audio ref={audioRef} preload="auto" hidden muted={mute}>
        <source src={bedroomSound} type="audio/mpeg" />
      </audio>
    </>
  );
};
