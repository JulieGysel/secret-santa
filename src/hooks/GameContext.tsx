import React from 'react';
import { InventoryItemType, CookedItemKey } from '../types';

export enum RoomType {
  BEDROOM = 'Bedroom',
  COMMON = 'Common Room',
  TVROOM = 'TV Room',
  KITCHEN = 'Kitchen',
  BASEMENT = 'Basement',
}

export type GameContextType = {
  gameStart: Date | undefined;
  showIntro: boolean;
  onHideIntro: VoidFunction;
  room: RoomType | undefined;
  setRoom: React.Dispatch<React.SetStateAction<RoomType | undefined>>;
  progress: number;
  makeProgress: (inc: number) => void;
  inventory: InventoryItemType[];
  addToInventory: (item: InventoryItemType) => void;
  usedUp: InventoryItemType[];
  cookRecipe: (items: InventoryItemType[], recipe: CookedItemKey) => void;
  wrapItem: (item: InventoryItemType) => void;

  gifted: InventoryItemType[];
  giftItem: (gift: InventoryItemType) => void;

  paintingDown: boolean;
  setPaintingDown: (down: boolean) => void;

  tennisGames: number | undefined;
  setTennisGames: (games: number) => void;
  footballGames: number | undefined;
  setFootballGames: (games: number) => void;

  movie: string;
  movieWithSanta: boolean;
  setMovieWithSanta: (watch: boolean) => void;

  watchedMovieWithSanta: boolean;
  setWatchedMovieWithSanta: (watch: boolean) => void;

  praisedSanta: boolean;
  setPraisedSanta: (praise: boolean) => void;

  mute: boolean;
  setMute: (mute: boolean) => void;
  progressAudioRef: React.RefObject<HTMLAudioElement>;
  inventoryAudioRef: React.RefObject<HTMLAudioElement>;
};

export const GameContext = React.createContext<GameContextType | null>(null);

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) throw Error('useGameContext can only be used inside an GameContextProvider');
  return context;
};
