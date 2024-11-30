// import React from 'react';
import { useGameContext } from '../../hooks/GameContext';
import { MenuButton } from '../../components/MenuButton';
import { InventoryItemType } from './types';
import { MenuProps } from 'primereact/menu';

export const GrabItem = ({
  item,
  customItems,
}: {
  item: InventoryItemType;
  customItems?: MenuProps['model'];
}) => {
  const { addToInventory } = useGameContext();
  return (
    <MenuButton
      label={item}
      items={customItems || [{ label: 'Grab', command: () => addToInventory(item) }]}
    />
  );
};
