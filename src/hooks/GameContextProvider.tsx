import React from 'react';
import { GameContext, RoomType } from './GameContext';
import {
  CookedItemKey,
  CookedItems,
  InventoryItems,
  InventoryItemType,
} from '../sections/inventory';

const setCookie = (key: string, value: string | number) => {
  document.cookie = `${key}=${value};path=/;`;
};

const getCookie = (key: string) => {
  const name = key + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const movies = [
  'The Holdovers',
  'Die Hard',
  'Home Alone',
  'Elf',
  'The Nightmare Before Christmas',
  'Love Actually',
  'The Polar Express',
  'Pretty Woman',
  'Star Wars Holiday Special',
  'Hot Frosty',
  'Harry Potter',
  'How the Grinch Stole Christmas',
  'The Holiday',
  'Gremlins',
  'A Christmas Carol',
  'Frozen',
  'The Grinch',
];

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState<boolean>(false);
  const [room, setRoom] = React.useState<RoomType>();
  const [progress, setProgress] = React.useState(0);

  const [inventory, setInventory] = React.useState<InventoryItemType[]>([]);
  const [usedUp, setUsedUp] = React.useState<InventoryItemType[]>([]);
  const [gifted, setGifted] = React.useState<InventoryItemType[]>([]);

  const [paintingDown, setPaintingDown] = React.useState(true);
  const [tennisGames, setTennisGames] = React.useState<number>();
  const [footballGames, setFootballGames] = React.useState<number>();

  const [movie, setMovie] = React.useState('');

  React.useEffect(() => {
    setShowIntro(!getCookie('intro'));

    const inv = getCookie('inventory').split(',');
    if (!(inv.length === 1 && inv[0] === '')) {
      setInventory(inv as InventoryItemType[]);
    }

    const used = getCookie('usedUp').split(',');
    if (!(used.length === 1 && used[0] === '')) {
      setUsedUp(used as InventoryItemType[]);
    }

    const gifts = getCookie('gifted').split(',');
    if (!(gifts.length === 1 && gifts[0] === '')) {
      setGifted(gifts as InventoryItemType[]);
    }

    const r = getCookie('room') as RoomType;
    if (r) {
      setRoom(r);
    } else {
      setRoom(RoomType.BEDROOM);
      setCookie('room', room as string);
    }

    const prog = Number(getCookie('progress'));
    if (prog) {
      setProgress(prog);
    } else {
      setProgress(0);
      setCookie('progress', 0);
    }

    const tg = Number(getCookie('tennisGames'));
    if (tg) {
      setTennisGames(tg);
    } else {
      setTennisGames(0);
    }

    const fg = Number(getCookie('footballGames'));
    if (fg) {
      setFootballGames(tg);
    } else {
      setFootballGames(0);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeProgress = React.useCallback(
    (inc: number) => {
      setProgress(progress + inc);
      setCookie('progress', progress + inc);
    },
    [progress],
  );

  const onHideIntro = () => {
    setCookie('intro', 'false');
    setShowIntro(false);
  };

  const addToInventory = React.useCallback(
    (item: InventoryItemType) => {
      setInventory([item, ...inventory]);
      setCookie('inventory', [item, ...inventory].join(','));
    },
    [inventory],
  );

  const cookRecipe = React.useCallback(
    (items: InventoryItemType[], recipe: CookedItemKey) => {
      const newUsedUp = [...usedUp, ...items];
      setUsedUp(newUsedUp);
      setCookie('usedUp', newUsedUp.join(','));

      const newInventory = inventory.filter((item) => !items.includes(item));
      newInventory.splice(0, 0, CookedItems[recipe]);
      setInventory(newInventory);
      setCookie('inventory', newInventory.join(','));
    },
    [inventory, usedUp],
  );

  const giftItem = React.useCallback(
    (gift: InventoryItemType) => {
      const newGifted = [...gifted, gift];
      setGifted(newGifted);
      setCookie('gifted', newGifted.join(','));

      const newInventory = inventory.filter((item) => item !== gift);
      setInventory(newInventory);
      setCookie('inventory', newInventory.join(','));
    },
    [gifted, inventory],
  );

  React.useEffect(() => {
    if (room) {
      setCookie('room', room as string);
    }
  }, [room]);

  React.useEffect(() => {
    if (tennisGames) {
      setCookie('tennisGames', tennisGames);
    }
  }, [tennisGames]);

  React.useEffect(() => {
    if (footballGames) {
      setCookie('footballGames', footballGames);
    }
  }, [footballGames]);

  React.useEffect(() => {
    const randomizeValue = () => {
      const nextMovie = movies[Math.floor(Math.random() * 100) % movies.length];
      setMovie(nextMovie);

      console.log('Now playing', nextMovie);

      const clearAfter = Math.random() * 1000 * 10 + 1000 * 15;
      setTimeout(() => {
        setMovie('');
        console.log('No movie playing');
      }, clearAfter); // Clear the value after the random time
    };

    const interval = setInterval(randomizeValue, 1000 * 60); // Trigger every 60 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const value = React.useMemo(
    () => ({
      showIntro,
      onHideIntro,
      room,
      setRoom,
      progress,
      makeProgress,
      inventory,
      addToInventory,
      usedUp,
      cookRecipe,
      giftItem,
      paintingDown,
      setPaintingDown,
      tennisGames,
      setTennisGames,
      footballGames,
      setFootballGames,
      movie,
    }),
    [
      showIntro,
      room,
      progress,
      makeProgress,
      inventory,
      addToInventory,
      usedUp,
      cookRecipe,
      giftItem,
      paintingDown,
      tennisGames,
      footballGames,
      movie,
    ],
  );

  console.log(value);

  return (
    <GameContext.Provider value={value}>
      {isLoading && (
        <div className="flex justify-content-center align-items-center h-screen">
          <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} />
        </div>
      )}
      {children}
    </GameContext.Provider>
  );
};
