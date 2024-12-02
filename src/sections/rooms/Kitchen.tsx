import React from 'react';
import { Room } from '../Room';
import { Dialog } from 'primereact/dialog';
import { MenuButton } from '../../components/MenuButton';
import { Button } from 'primereact/button';
import { RoomSwitch } from '../RoomSwitch';
import { useGameContext } from '../../hooks/GameContext';
import {
  CookedItemKey,
  CookedItems,
  CookedItemType,
  CupboardItems,
  GrabItem,
  InventoryItems,
  InventoryItemType,
  Miscelaneous,
  ReusableItems,
} from '../inventory';
import { Dropdown } from 'primereact/dropdown';

import kitchenSound from '../../audio/kitchen.mp3';

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
  const { inventory } = useGameContext();
  const cupboardItems = Object.values(CupboardItems).filter((item) => !inventory.includes(item));

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

type Recipe = { name: CookedItemType; value: CookedItemKey; requires: InventoryItemType[] };

const recipeList: { [key in CookedItemKey]: Recipe } = {
  cookedAppleSlices: {
    value: 'cookedAppleSlices',
    name: CookedItems.cookedAppleSlices,
    requires: [
      InventoryItems.bakingTray,
      InventoryItems.appleSlices,
      InventoryItems.jam,
      InventoryItems.sugar,
    ],
  },
  cookies: {
    value: 'cookies',
    name: CookedItems.cookies,
    requires: [
      InventoryItems.bowl,
      InventoryItems.spatula,
      InventoryItems.bakingTray,

      InventoryItems.cookieRecipe,
      InventoryItems.eggs,
      InventoryItems.butter,
      InventoryItems.flour,
      InventoryItems.sugar,
      InventoryItems.cinnamon,
    ],
  },
  eggnog: {
    value: 'eggnog',
    name: CookedItems.eggnog,
    requires: [
      InventoryItems.pan,

      InventoryItems.cream,
      InventoryItems.milk,
      InventoryItems.eggs,
      InventoryItems.rum,
      InventoryItems.cinnamon,
    ],
  },
};

const CookingSection = ({ closeModal }: { closeModal: VoidFunction }) => {
  const { inventory, cookRecipe } = useGameContext();
  const options = Object.values(recipeList).map(({ name, value, requires }) => ({
    value,
    name,
    disabled: !requires.every((ingredient) => inventory.includes(ingredient)),
  }));

  const [currentRecipe, setCurrentRecipe] = React.useState();

  const itemTemplate = (option: Recipe) => {
    return (
      <div className="flex flex-column">
        <div>{option.name}</div>
        <div className="text-xs">
          Requires:{' '}
          {recipeList[option.value].requires
            .map((ingredient) => ingredient.toLowerCase())
            .join(', ')}
        </div>
      </div>
    );
  };

  const onCook = React.useCallback(() => {
    if (currentRecipe) {
      console.log('cooking ', currentRecipe);
      const usedItems = (recipeList[currentRecipe] as Recipe).requires.filter(
        (item) => !Object.values(ReusableItems).includes(item),
      );

      console.log('using up', usedItems);
      cookRecipe(usedItems, currentRecipe);
      setCurrentRecipe(undefined);
      closeModal();
    }
  }, [currentRecipe, cookRecipe, closeModal]);

  return (
    <>
      <p>What do you want to cook today?</p>
      <div className="flex gap-2">
        <Dropdown
          value={currentRecipe}
          options={options}
          onChange={(e) => setCurrentRecipe(e.value)}
          optionLabel={'name'}
          placeholder="Select a recipe"
          className="w-5"
          itemTemplate={itemTemplate}
          pt={{ wrapper: { className: 'max-h-full' } }}
        />
        <Button label="Cook" disabled={!currentRecipe} onClick={onCook} />
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
        description={
          <>
            <p>Roughtly ten people share each of the six kitchens here at the dorm.</p>
            <p>
              Everybody get's their own cupboard and has access to a sink, a big stove, and oven.
            </p>
            <p>
              Ideally, the cleaning efforts would be equally divided between each of the ten people.
              But we all know that someone always does more work somebody else.
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
