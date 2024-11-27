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
    <Card title={title} className="h-full" footer={<div className="flex gap-2">{roomActions}</div>}>
      <>{description}</>
      <div className="flex gap-2">{roomItems}</div>
    </Card>
  );
};
