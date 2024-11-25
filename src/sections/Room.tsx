import React from 'react';
import { Card } from 'primereact/card';
import { MenuButton } from '../components/MenuButton';

export const Room = () => {
  return (
    <Card title="Room" className="h-full">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div className="flex gap-2">
        <MenuButton label="Bed" items={[{ label: 'Sleep' }]} />
        <MenuButton label="Fridge" items={[{ label: 'Look inside' }]} />
        <MenuButton label="Outside door" items={[{ label: 'Look outside' }]} />
      </div>
    </Card>
  );
};
