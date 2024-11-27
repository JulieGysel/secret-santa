import React from 'react';
import { useGameContext } from '../../hooks/GameContext';
import { MenuButton } from '../../components/MenuButton';
import { InventoryItem } from './types';

export const FridgeItem = ({ item }: { item: InventoryItem }) => {
  const { addToInventory } = useGameContext();
  return (
    <MenuButton label={item} items={[{ label: 'Grab', command: () => addToInventory(item) }]} />
  );
};
