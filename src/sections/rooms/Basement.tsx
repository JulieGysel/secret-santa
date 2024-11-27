import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';

export const Basement = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();

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
        setDialogContent('');
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
    <MenuButton label="Freezer" items={[{ label: 'Look inside' }]} />,
    <MenuButton
      label="Table tennis"
      items={[
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setDialogContent('Playing table tennis.');
          },
        },
      ]}
    />,
    <MenuButton
      label="Table footbal"
      items={[
        {
          label: 'Play a game',
          command: () => {
            setVisible(true);
            setDialogContent('Playing footbal.');
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
            setDialogContent('Looking around.');
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
            <p>
              If you had friends over, you would probably mention that your room is such a mess. But
              everybody would know it's not true at all.
            </p>
            <p>Not much in your room looks out of the ordinary.</p>
            <p>Well, except for fucking Santa who's decided to move in for some reason.</p>
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
