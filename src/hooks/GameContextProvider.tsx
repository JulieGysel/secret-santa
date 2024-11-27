import React from 'react';
import { GameContext, RoomType } from './GameContext';
import { InventoryItem } from '../sections/inventory';

const setCookie = (key: string, value: string) => {
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
  const [showIntro, setShowIntro] = React.useState<boolean>(true);
  const [room, setRoom] = React.useState<RoomType>(RoomType.BEDROOM);
  const [progress, setProgress] = React.useState(0);
  const [inventory, setInventory] = React.useState<InventoryItem[]>([]);

  React.useEffect(() => {
    console.log(getCookie('intro'));
    setShowIntro(!getCookie('intro'));

    const inv = getCookie('inventory').split(',') as InventoryItem[];
    setInventory(inv);
    setLoading(false);
  }, []);

  const onHideIntro = () => {
    setCookie('intro', 'false');
    setShowIntro(false);
  };

  const addToInventory = React.useCallback(
    (item: InventoryItem) => {
      setInventory([...inventory, item]);
      setCookie('inventory', inventory.join(','));
    },
    [inventory],
  );

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
    }),
    [addToInventory, inventory, progress, room, showIntro],
  );

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
