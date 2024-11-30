export enum FridgeItems {
  eggs = 'Eggs',
  milk = 'Milk',
  cream = 'Cream',
  butter = 'Butter',
  jam = 'Jam',
  ham = 'Ham',
  cheese = 'Cheese',
  mayo = 'Mayonnaise',
  beer = 'Beer',
  carrots = 'Carrots',
}

type FridgeItemKey = keyof typeof FridgeItems;
export type FridgeItemType = (typeof FridgeItems)[FridgeItemKey];

export enum FreeStuff {
  pan = 'Pan',
  tshirt = 'T-Shirt',
  scissors = 'Scissors',
  vase = 'Vase',
}

type FreeStuffKey = keyof typeof FreeStuff;
export type FreeStuffType = (typeof FreeStuff)[FreeStuffKey];

export enum Miscelaneous {
  painting = 'Painting',
  rum = 'Half a bottle of rum',
  bakingTray = 'Baking tray',
  paper = 'Wrapping paper',
  cookieRecipe = 'Cookie recipe',
}

type MiscelaneousKey = keyof typeof Miscelaneous;
export type MiscelaneousType = (typeof Miscelaneous)[MiscelaneousKey];

export enum FreezerItems {
  bread = 'Bread',
  veg = 'Frozen vegetables',
  appleSlices = 'Æbleskiver (frozen)',
  meat = 'Frozen meat',
  iceLolly = 'Ice Lolly (grape flavoured)',
  ice = 'Ice cubes',
}

type FreezerItemKey = keyof typeof FreezerItems;
export type FreezerItemType = (typeof FreezerItems)[FreezerItemKey];

export enum CupboardItems {
  flour = 'Flour',
  sugar = 'Sugar',
  bowl = 'Bowl',
  spatula = 'Spatula',
  plates = 'Plates',
  utensils = 'Utensils',
}

type CupboardItemKey = keyof typeof CupboardItems;
export type CupboardItemType = (typeof CupboardItems)[CupboardItemKey];

export enum CookedItems {
  cookedAppleSlices = 'Æbleskiver',
  cookies = 'Cookies',
  eggnog = 'Eggnog',
}

export type CookedItemKey = keyof typeof CookedItems;
export type CookedItemType = (typeof CookedItems)[CookedItemKey];

export const InventoryItems = {
  ...FridgeItems,
  ...FreeStuff,
  ...Miscelaneous,
  ...FreezerItems,
  ...CupboardItems,
  ...CookedItems,
};

export type InventoryItemType =
  | FridgeItemType
  | FreeStuff
  | MiscelaneousType
  | FreezerItemType
  | CupboardItemType
  | CookedItemType;

export const ReusableItems: InventoryItemType[] = [
  Miscelaneous.bakingTray,
  FreeStuff.pan,
  FreeStuff.scissors,
  CupboardItems.bowl,
  CupboardItems.spatula,
  CupboardItems.sugar,
  CupboardItems.flour,
  FridgeItems.eggs,
];

export const AcceptableGifts: InventoryItemType[] = [
  CookedItems.cookedAppleSlices,
  CookedItems.cookies,
  CookedItems.eggnog,
  FridgeItems.carrots,
  FridgeItems.beer,
];

export const getGiftValue = (item: InventoryItemType) => {
  switch (item) {
    case InventoryItems.cookedAppleSlices:
    case InventoryItems.eggnog:
      return 5;
    case InventoryItems.cookieRecipe:
      return 20;
    default:
      return 0;
  }
};
