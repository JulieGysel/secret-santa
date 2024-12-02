import React from 'react';
import {
  CookedItemKey,
  CookedItems,
  CookedItemType,
  InventoryItems,
  InventoryItemType,
  ReusableItems,
} from '../types';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useGameContext } from '../hooks/GameContext';

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

export const CookingSection = ({ closeModal }: { closeModal: VoidFunction }) => {
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
        />
        <Button label="Cook" disabled={!currentRecipe} onClick={onCook} />
      </div>
    </>
  );
};
