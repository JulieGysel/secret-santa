import React from 'react';
import { useGameContext } from '../../hooks/GameContext';
import { MenuButton } from '../../components/MenuButton';
import { InventoryItemType } from './types';
import { MenuProps } from 'primereact/menu';

export const GrabItem = ({
  item,
  additionalActions = [],
}: {
  item: InventoryItemType;
  additionalActions?: MenuProps['model'];
}) => {
  const { addToInventory } = useGameContext();
  return (
    <MenuButton
      label={item}
      items={[...additionalActions, { label: 'Grab', command: () => addToInventory(item) }]}
    />
  );
};
