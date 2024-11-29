import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useGameContext } from '../hooks/GameContext';

export const Inventory = () => {
  const { inventory } = useGameContext();

  return (
    <Card
      title={'Inventory'}
      pt={{ content: { className: 'white-space-nowrap	overflow-x-auto' } }}
      className="flex-grow-0"
    >
      {inventory.map((item, i) => (
        <Button
          label={item}
          disabled
          severity="secondary"
          outlined
          className="mx-1"
          key={`inventory-item-${i}`}
        />
      ))}
    </Card>
  );
};
