import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { FridgeItem, FridgeItems, FridgeItemType } from '../inventory';
import { useGameContext } from '../../hooks/GameContext';

const endingLines = [
  <p>Well, except for fucking Santa who's decided to move in for some reason.</p>,
  <p>And Santa is still chilling on your chair.</p>,
  <p>Santa is humming a Christmas carol. It sounds weirdly ominous.</p>,
];

const FridgeItemSection = () => {
  console.log(Object.values(FridgeItems));
  const { inventory } = useGameContext();
  return (
    <>
      <p>
        The fridge could do with some cleaning. But not right now. When there's less stuff inside
        perhaps.
      </p>
      <div className="flex flex-wrap gap-2">
        {Object.values(FridgeItems)
          .filter((item) => !inventory.includes(item as unknown as FridgeItemType))
          .map((item, i) => (
            <FridgeItem item={item as unknown as FridgeItemType} key={`fridge-item-${i}`} />
          ))}
      </div>
    </>
  );
};

export const Bedroom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
    <MenuButton
      label="Talk to Santa"
      items={[
        { label: 'Praise Santa' },
        { label: 'Let Santa complain' },
        { label: 'Invite to watch a movie' },
        { label: "Point out it's snowing" },
        { label: 'Give something to Santa' },
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
          label: 'Look inside',
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

  const endLine = endingLines[Math.floor(Math.random() * 100) % endingLines.length];

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
