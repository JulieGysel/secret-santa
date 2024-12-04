import React from 'react';
import { GameContext, RoomType, StatsType } from './GameContext';
import { CookedItemKey, CookedItems, InventoryItemType, WrappedItemsMap } from '../types';
import { getCookie, setCookie } from '../helpers';

const movies = [
  'The Holdovers',
  'Die Hard',
  'Home Alone',
  'Elf',
  'The Nightmare Before Christmas',
  'Love Actually',
  'The Polar Express',
  'Pretty Woman',
  'Star Wars: Holiday Special',
  'Star Wars: A New Hope',
  'Star Wars: Empire Strikes Back',
  'Star Wars: Return of the Jedi',
  'Star Wars: The Phantom Menace',
  'Star Wars: Attack of the Clones',
  'Star Wars: Revenge of the Sith',
  'Hot Frosty',
  "Harry Potter and the Philosopher's Stone",
  'Harry Potter and the Chamber of Secrets',
  'Harry Potter and the Prisoner of Azkaban',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix',
  'Harry Potter and the Half-Blood Prince',
  'Harry Potter and the Deathly Hallows – Part 1',
  'Harry Potter and the Deathly Hallows – Part 2',
  'How the Grinch Stole Christmas',
  'The Holiday',
  'Gremlins',
  'A Christmas Carol',
  'Frozen',
  'The Grinch',
  '2 Girls 1 Cup: Christmas Edition',
  'Notting Hill',
  'Doctor Who: Husbands of River Song',
  'Doctor Who: The Christmas Invasion',
  'Doctor Who: The Runaway Bride',
  'Doctor Who: A Christmas Carol',
  'Doctor Who: Last Christmas',
  'Doctor Who: The Church on Ruby Road',
  'Doctor Who: Joy to the Worls',
  'Paddington',
  'The Fellowship of the Ring',
  'The Two Towers',
  'The Return of the King',
  'World War Z',
  'Klaus',
  'Violent Night',
];

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mute, setMute] = React.useState(false);
  const progressAudioRef = React.useRef<HTMLAudioElement>(null);
  const inventoryAudioRef = React.useRef<HTMLAudioElement>(null);

  const [gameStart, setGameStart] = React.useState<Date>();
  const [gameEnd, setGameEnd] = React.useState<Date>();

  const [isLoading, setLoading] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState<boolean>(true);
  const [showOutro, setShowOutro] = React.useState<boolean>(false);

  const [room, setRoom] = React.useState<RoomType>();
  const [progress, setProgress] = React.useState(0);

  const [inventory, setInventory] = React.useState<InventoryItemType[]>([]);
  const [usedUp, setUsedUp] = React.useState<InventoryItemType[]>([]);
  const [gifted, setGifted] = React.useState<InventoryItemType[]>([]);

  const [paintingDown, setPaintingDown] = React.useState(true);

  const [snow, setSnow] = React.useState(false);
  const [movie, setMovie] = React.useState('');
  const [movieWithSanta, setMovieWithSanta] = React.useState(false);
  const [watchedMovieWithSanta, setWatchedMovieWithSanta] = React.useState(false);

  const [praisedSanta, setPraisedSanta] = React.useState(false);
  const [showedSnow, setShowedSnow] = React.useState(false);
  const [stats, setStats] = React.useState<StatsType>({
    moviesWatched: 0,
    moviesWatchedWithSanta: 0,
    peopleLetIn: 0,
    tennisGamesPlayed: 0,
    tennisGamesWon: 0,
    footballGamesPlayed: 0,
    footballGamesWon: 0,
    boardGamesPlayed: 0,
  });

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

    const snow = getCookie('showSnow') === 'true';
    if (snow) {
      setShowedSnow(true);
    }

    const st = getCookie('stats');
    if (st) {
      setStats(JSON.parse(st));
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
    const randomizeValue = () => {
      const nextMovie = movies[Math.floor(Math.random() * 100) % movies.length];
      setMovie(nextMovie);

      const clearAfter = Math.random() * 1000 * 10 + 1000 * 15;
      setTimeout(() => {
        setMovie('');
      }, clearAfter); // Clear the value after the random time
    };

    const interval = setInterval(randomizeValue, 1000 * 60); // Trigger every 60 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const randomizeValue = () => {
      setSnow(true);

      const clearAfter = Math.random() * 1000 * 10 + 1000 * 15;
      setTimeout(() => {
        setSnow(false);
      }, clearAfter);
    };

    const interval = setInterval(randomizeValue, 1000 * 60 * 2);

    return () => clearInterval(interval);
  }, []);

  const updateStats = React.useCallback(
    (update: Partial<StatsType>) => {
      const newStats = { ...stats, ...update };
      setStats(newStats);
      setCookie('stats', JSON.stringify(newStats));
    },
    [stats],
  );

  React.useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowOutro(true);
        setGameEnd(new Date(Date.now()));
        setMute(true);
      }, 1000 * 5);
    }
  }, [progress]);

  const value = React.useMemo(
    () => ({
      gameStart,
      gameEnd,
      showIntro,
      onHideIntro,
      showOutro,

      stats,
      updateStats,

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

      snow,
      movie,
      movieWithSanta,
      setMovieWithSanta,
      watchedMovieWithSanta,
      setWatchedMovieWithSanta,

      praisedSanta,
      setPraisedSanta,
      showedSnow,
      setShowedSnow,

      mute,
      setMute,
      progressAudioRef,
      inventoryAudioRef,
    }),
    [
      gameStart,
      gameEnd,
      showIntro,
      showOutro,
      stats,
      updateStats,
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
      snow,
      movie,
      movieWithSanta,
      watchedMovieWithSanta,
      praisedSanta,
      showedSnow,
      mute,
    ],
  );

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
