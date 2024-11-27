import React from 'react';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ChipProps, Chip } from 'primereact/chip';

export const Chat = () => {
  const chipTemplate = (props: ChipProps) => (
    <>
      {props.label}
      {props.children}
    </>
  );

  return (
    <Card
      title={'Pølsefest'}
      footer={
        <div className="flex justify-content-end">
          <Button
            rounded
            icon="pi pi-send"
            iconPos="right"
            aria-label="Send a message"
            tooltip="Send a message"
            tooltipOptions={{ position: 'left' }}
          />
        </div>
      }
      pt={{ content: { className: 'flex flex-column gap-3 h-full' } }}
    >
      <div className="flex gap-1">
        <Avatar label="A" shape="circle" className="mr-2" />
        <Chip label="This is a test message." className="p-overlay-badge" template={chipTemplate}>
          <Badge value={'❤'} className="p-overlay-badge" severity={'danger'} />
        </Chip>
      </div>

      <div className="flex flex-row-reverse	gap-1">
        <Avatar label="B" shape="circle" className="mr-2" />
        <Chip label="This is another test message." pt={{ root: { className: 'bg-primary' } }} />
      </div>
    </Card>
  );
};
