// import React from 'react';
import { useGameContext } from '../hooks/GameContext';
import { MenuButton } from './MenuButton';
import { InventoryItemType } from '../types';
import { MenuProps } from 'primereact/menu';

export const GrabItem = ({
  item,
  customItems,
  mystery = false,
}: {
  item: InventoryItemType;
  customItems?: MenuProps['model'];
  mystery?: boolean;
}) => {
  const { addToInventory } = useGameContext();
  return (
    <MenuButton
      label={mystery ? 'Mystery item' : item}
      items={customItems || [{ label: 'Grab', command: () => addToInventory(item) }]}
    />
  );
};
