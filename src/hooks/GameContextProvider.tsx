import React from 'react';
import { GameContext, RoomType } from './GameContext';
import { CookedItemKey, CookedItems, InventoryItemType, WrappedItemsMap } from '../types';

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
  '2 Girls 1 Cup: Christmas Edition',
];

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mute, setMute] = React.useState(false);
  const progressAudioRef = React.useRef<HTMLAudioElement>(null);
  const inventoryAudioRef = React.useRef<HTMLAudioElement>(null);

  const [gameStart, setGameStart] = React.useState<Date>();

  const [isLoading, setLoading] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState<boolean>(true);
  const [room, setRoom] = React.useState<RoomType>();
  const [progress, setProgress] = React.useState(0);

  const [inventory, setInventory] = React.useState<InventoryItemType[]>([]);
  const [usedUp, setUsedUp] = React.useState<InventoryItemType[]>([]);
  const [gifted, setGifted] = React.useState<InventoryItemType[]>([]);

  const [paintingDown, setPaintingDown] = React.useState(true);
  const [tennisGames, setTennisGames] = React.useState<number>();
  const [footballGames, setFootballGames] = React.useState<number>();

  const [movie, setMovie] = React.useState('');
  const [movieWithSanta, setMovieWithSanta] = React.useState(false);
  const [watchedMovieWithSanta, setWatchedMovieWithSanta] = React.useState(false);

  const [praisedSanta, setPraisedSanta] = React.useState(false);

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

    const start = getCookie('gameStart');
    if (start) {
      setGameStart(new Date(start));
    }

    const movSanta = getCookie('movieWithSanta') === 'true';
    if (movSanta) {
      setMovieWithSanta(true);
    }

    const watchedMovSanta = getCookie('watchedMovieWithSanta') === 'true';
    if (watchedMovSanta) {
      setWatchedMovieWithSanta(true);
    }

    const praise = getCookie('praisedSanta') === 'true';
    if (praise) {
      setPraisedSanta(true);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeProgress = React.useCallback(
    (inc: number) => {
      let newProgres = progress + inc;

      if (newProgres > 100) {
        newProgres = 100;
      }

      setProgress(newProgres);
      setCookie('progress', newProgres);

      if (inc) {
        progressAudioRef.current?.play();
      }
    },
    [progress],
  );

  const onHideIntro = () => {
    setCookie('intro', 'false');
    setShowIntro(false);

    const gStart = new Date(Date.now());
    setGameStart(gStart);
    setCookie('gameStart', gStart.toISOString());
  };

  const addToInventory = React.useCallback(
    (item: InventoryItemType) => {
      setInventory([item, ...inventory]);
      setCookie('inventory', [item, ...inventory].join(','));

      inventoryAudioRef.current?.play();
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

  const wrapItem = React.useCallback(
    (item: InventoryItemType) => {
      const newItem = WrappedItemsMap[item];

      const newUsedUp = [...usedUp, item];
      setUsedUp(newUsedUp);
      setCookie('usedUp', newUsedUp.join(','));

      const newInventory = [
        newItem as InventoryItemType,
        ...inventory.filter((inventoryItem) => inventoryItem !== item),
      ];
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

    if (movieWithSanta) {
      setCookie('movieWithSanta', 'true');
    }

    if (watchedMovieWithSanta) {
      setCookie('watchedMovieWithSanta', 'true');
    }

    if (praisedSanta) {
      setCookie('praisedSanta', 'true');
    }
  }, [movieWithSanta, praisedSanta, room, watchedMovieWithSanta]);

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
      gameStart,
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
      wrapItem,

      gifted,
      giftItem,
      paintingDown,
      setPaintingDown,

      tennisGames,
      setTennisGames,
      footballGames,
      setFootballGames,

      movie,
      movieWithSanta,
      setMovieWithSanta,
      watchedMovieWithSanta,
      setWatchedMovieWithSanta,

      praisedSanta,
      setPraisedSanta,

      mute,
      setMute,
      progressAudioRef,
      inventoryAudioRef,
    }),
    [
      gameStart,
      showIntro,
      room,
      progress,
      makeProgress,
      inventory,
      addToInventory,
      usedUp,
      cookRecipe,
      wrapItem,
      gifted,
      giftItem,
      paintingDown,
      tennisGames,
      footballGames,
      movie,
      movieWithSanta,
      watchedMovieWithSanta,
      praisedSanta,
      mute,
    ],
  );

  console.log(isLoading, value);

  return (
    <GameContext.Provider value={value}>
      {isLoading ? (
        <div className="flex justify-content-center align-items-center h-screen">
          <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }} />
        </div>
      ) : (
        children
      )}
    </GameContext.Provider>
  );
};
