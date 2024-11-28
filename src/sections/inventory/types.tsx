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
  rum = 'Half empty bottle of rum',
  sheetPan = 'Sheet pan',
  paper = 'Wrapping paper',
}

type MiscelaneousKey = keyof typeof Miscelaneous;
export type MiscelaneousType = (typeof Miscelaneous)[MiscelaneousKey];

export enum FreezerItems {
  bread = 'Bread',
  veg = 'Frozen vegetables',
  appleSlices = 'Æbleskiver',
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

export const InventoryItems = {
  ...FridgeItems,
  ...FreeStuff,
  ...Miscelaneous,
  ...FreezerItems,
  ...CupboardItems,
};

export type InventoryItemType =
  | FridgeItemType
  | FreeStuff
  | MiscelaneousType
  | FreezerItemType
  | CupboardItemType;
