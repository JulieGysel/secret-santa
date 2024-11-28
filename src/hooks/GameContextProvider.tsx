import React from 'react';
import { GameContext, RoomType } from './GameContext';
import { InventoryItemType } from '../sections/inventory';

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

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState<boolean>(false);
  const [room, setRoom] = React.useState<RoomType>();
  const [progress, setProgress] = React.useState(0);
  const [inventory, setInventory] = React.useState<InventoryItemType[]>([]);
  const [paintingDown, setPaintingDown] = React.useState(true);

  const [tennisGames, setTennisGames] = React.useState<number>();
  const [footballGames, setFootballGames] = React.useState<number>();

  React.useEffect(() => {
    setShowIntro(!getCookie('intro'));

    const inv = getCookie('inventory').split(',');
    if (!(inv.length === 1 && inv[0] === '')) {
      setInventory(inv as InventoryItemType[]);
    }

    const r = getCookie('room') as RoomType;
    if (r) {
      setRoom(r);
    } else {
      setRoom(RoomType.BEDROOM);
      setCookie('room', room as string);
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

  const onHideIntro = () => {
    setCookie('intro', 'false');
    setShowIntro(false);
  };

  const addToInventory = React.useCallback(
    (item: InventoryItemType) => {
      setInventory([...inventory, item]);
      setCookie('inventory', inventory.join(','));
    },
    [inventory],
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

  const value = React.useMemo(
    () => ({
      showIntro,
      onHideIntro,
      room,
      setRoom,
      progress,
      setProgress,
      inventory,
      addToInventory,
      paintingDown,
      setPaintingDown,
      tennisGames,
      setTennisGames,
      footballGames,
      setFootballGames,
    }),
    [
      addToInventory,
      footballGames,
      inventory,
      paintingDown,
      progress,
      room,
      showIntro,
      tennisGames,
    ],
  );

  console.log(value, isLoading);

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
