import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import { CupboardItems, GrabItem, Miscelaneous } from '../inventory';

const Trash = () => {
  const { inventory } = useGameContext();
  const wrappingPaperAvailable = !inventory.includes(Miscelaneous.paper);

  return (
    <>
      <p>You sweet, helpful person!</p>
      {wrappingPaperAvailable && (
        <div className="flex flex-wrap gap-2">
          <GrabItem item={Miscelaneous.paper} />
        </div>
      )}
    </>
  );
};

const Oven = () => {
  const { inventory } = useGameContext();
  const panAvailable = !inventory.includes(Miscelaneous.sheetPan);

  return (
    <>
      {/* todo */}
      <p>It's an oven.</p>
      {panAvailable && (
        <div className="flex flex-wrap gap-2">
          <GrabItem item={Miscelaneous.sheetPan} />
        </div>
      )}
    </>
  );
};

const Cupboard = () => {
  const { inventory } = useGameContext();
  const cupboardItems = Object.values(CupboardItems).filter((item) => !inventory.includes(item));

  return (
    <>
      {cupboardItems.length < 3 ? (
        <p>Your cupboard is strangely empty.</p>
      ) : (
        <p>There is some stuff in your cupboard.</p>
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
  const { inventory } = useGameContext();
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
        setDialogContent('You think you can cook?');
      }}
    />,
    <div className="flex-grow-1"></div>,
    <Button
      label="Complain about Santa"
      outlined
      severity="danger"
      onClick={() => {
        setVisible(true);
        setDialogContent('Complaining...');
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
            setDialogContent('You think you will find something useful in the trash?');
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
            setDialogContent("It's a kitchen sink.");
          },
        },
        {
          label: 'Clean',
          command: () => {
            setVisible(true);
            setDialogContent(
              'Somehow, the kitchen sink is never clean enough. But thank you for your attempt.',
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
            setDialogContent('Nasty Danish morning weather.');
          },
        },
      ]}
    />,
  ];

  return (
    <>
      <Room
        title={'Kitchen'}
        // todo
        description={<p>Kitchen description.</p>}
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
