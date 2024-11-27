import React from 'react';

export enum RoomType {
  BEDROOM = 'Bedroom',
  TVROOM = 'TV Room',
  COMMON = 'Common Room',
  BASEMENT = 'Basement',
  KITCHEN = 'Kitchen',
}

export type GameContextType = {
  showIntro: boolean;
  onHideIntro: VoidFunction;
  room: RoomType;
  setRoom: (room: string) => void;
  progress: number;
  setProgress: (progress: number) => void;
};

export const GameContext = React.createContext<GameContextType | null>(null);

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) throw Error('useGameContext can only be used inside an GameContextProvider');
  return context;
};
