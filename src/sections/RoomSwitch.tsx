// import React from 'react';
import { Button } from 'primereact/button';
import { RoomType, useGameContext } from '../hooks/GameContext';

export const RoomSwitch = ({ closeModal }: { closeModal: VoidFunction }) => {
  const { setRoom } = useGameContext();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(RoomType).map((roomType, i) => (
        <Button
          label={roomType}
          outlined
          severity="secondary"
          onClick={() => {
            setRoom(roomType);
            closeModal();
          }}
          key={`room-button-${i}`}
        />
      ))}
    </div>
  );
};
