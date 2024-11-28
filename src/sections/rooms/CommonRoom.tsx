import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import { FreeStuff, GrabItem, Miscelaneous } from '../inventory';

const FreeStuffSection = () => {
  const { inventory } = useGameContext();
  const fridgeItems = Object.values(FreeStuff).filter((item) => !inventory.includes(item));

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

const MonsteraSection = () => {
  const { inventory, paintingDown, setPaintingDown } = useGameContext();

  const paintingPos = paintingDown
    ? "The controversial painging is stood by the monstera's plant pot."
    : 'The controversial painging is hanging on the wall next to it.';

  return (
    <>
      <p>The Monstera is a big plant.</p>

      {!inventory.includes(Miscelaneous.painting) ? (
        <>
          <p>{paintingPos}</p>
          <div className="flex flex-wrap gap-2">
            <GrabItem
              item={Miscelaneous.painting}
              additionalActions={[
                {
                  label: paintingDown ? 'Put up' : 'Put down',
                  command: () => setPaintingDown(!paintingDown),
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

export const CommonRoom = () => {
  const [visible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<string | React.ReactNode>();

  const closeModal = () => {
    setVisible(false);
    setDialogContent(undefined);
  };

  const roomActions = [
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
    </>
  );
};
