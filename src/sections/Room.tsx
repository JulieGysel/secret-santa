import React from 'react';
import { Card } from 'primereact/card';

export const Room = ({
  title,
  description,
  roomActions,
  roomItems,
}: {
  title: string;
  description: React.ReactNode;
  roomActions: React.ReactNode[];
  roomItems: React.ReactNode[];
}) => {
  return (
    <Card title={title} className="h-full">
      <>{description}</>
      <div className="flex flex-column gap-2">
        <div className="flex gap-2">{roomItems}</div>
        <div className="flex gap-2">{roomActions}</div>
      </div>
    </Card>
  );
};
