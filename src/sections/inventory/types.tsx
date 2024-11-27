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
export type FridgeItemType = typeof FridgeItems;

export const InventoryItems = {
  ...FridgeItems,
};

export type InventoryItem = typeof InventoryItems;
