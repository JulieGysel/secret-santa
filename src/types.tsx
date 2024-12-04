export enum FridgeItems {
  milk = 'Milk',
  carrots = 'Carrots',
  butter = 'Butter',
  jam = 'Jam',
  ham = 'Ham',
  eggs = 'Eggs',
  cheese = 'Cheese',
  mayo = 'Mayonnaise',
  beer = 'Beer',
  cream = 'Cream',
}

type FridgeItemKey = keyof typeof FridgeItems;
export type FridgeItemType = (typeof FridgeItems)[FridgeItemKey];

export enum FreeStuff {
  handCream = 'Hand Cream',
  pan = 'Pan',
  tshirt = 'T-Shirt',
  jeans = 'Old Jeans',
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
  tape = 'Tape',
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
  salt = 'Salt',
  flour = 'Flour',
  bowl = 'Bowl',
  spatula = 'Spatula',
  plates = 'Plates',
  sugar = 'Sugar',
  utensils = 'Utensils',
  cinnamon = 'Cinnamon',
}

type CupboardItemKey = keyof typeof CupboardItems;
export type CupboardItemType = (typeof CupboardItems)[CupboardItemKey];

export enum CookedItems {
  cookedAppleSlices = 'Æbleskiver',
  cookies = 'Cinnamon cookies',
  eggnog = 'Eggnog',
}

export type CookedItemKey = keyof typeof CookedItems;
export type CookedItemType = (typeof CookedItems)[CookedItemKey];

export enum WrappedItems {
  wrappedVase = 'Wrapped vase',
  wrappedPainting = 'Wrapped painting',
  wrappedTshirt = 'Wrapped t-shirt',
}

export type WrappedItemKey = keyof typeof WrappedItems;
export type WrappedItemType = (typeof WrappedItems)[WrappedItemKey];

export const InventoryItems = {
  ...FridgeItems,
  ...FreeStuff,
  ...Miscelaneous,
  ...FreezerItems,
  ...CupboardItems,
  ...CookedItems,
  ...WrappedItems,
};

export type InventoryItemType =
  | FridgeItemType
  | FreeStuff
  | MiscelaneousType
  | FreezerItemType
  | CupboardItemType
  | CookedItemType
  | WrappedItemType;

export const ReusableItems: InventoryItemType[] = [
  InventoryItems.sugar,
  InventoryItems.eggs,
  InventoryItems.cinnamon,

  InventoryItems.scissors,
  InventoryItems.paper,
];

export const AcceptableGifts: InventoryItemType[] = [
  InventoryItems.cookedAppleSlices,
  InventoryItems.cookies,
  InventoryItems.eggnog,
  InventoryItems.carrots,
  InventoryItems.beer,
  InventoryItems.iceLolly,

  InventoryItems.wrappedPainting,
  InventoryItems.wrappedVase,
  InventoryItems.wrappedTshirt,
];

export const WrappableItems: InventoryItemType[] = [
  InventoryItems.painting,
  InventoryItems.vase,
  InventoryItems.tshirt,
];

export const WrappedItemsMap: {
  [key: string]: InventoryItemType;
} = {
  [InventoryItems.painting]: InventoryItems.wrappedPainting,
  [InventoryItems.vase]: InventoryItems.wrappedVase,
  [InventoryItems.tshirt]: InventoryItems.wrappedTshirt,
};

export const getGiftValue = (item: InventoryItemType) => {
  switch (item) {
    case InventoryItems.wrappedPainting:
      return 30;
    case InventoryItems.cookies:
      return 20;
    case InventoryItems.cookedAppleSlices:
      return 10;
    case InventoryItems.wrappedVase:
    case InventoryItems.eggnog:
      return 5;
    default:
      return 0;
  }
};
