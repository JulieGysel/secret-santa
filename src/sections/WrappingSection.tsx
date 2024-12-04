import React from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useGameContext } from '../hooks/GameContext';
import { InventoryItems, InventoryItemType, WrappableItems } from '../types';

export const WrappingSection = () => {
  const { inventory, wrapItem: wrapItemFunc } = useGameContext();
  const [wrapItem, setWrapItem] = React.useState<InventoryItemType | undefined>();

  const [isVisible, setVisible] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');

  const options = React.useMemo(
    () => inventory.map((item) => ({ name: item, value: item })),
    [inventory],
  );

  const onWrap = React.useCallback(() => {
    if (wrapItem) {
      if (WrappableItems.includes(wrapItem)) {
        setDialogContent(
          `You could work on your wrapping skills. But that is indeed one wrapped ${wrapItem.toLowerCase()}.`,
        );

        setVisible(true);
        wrapItemFunc(wrapItem);
      } else {
        switch (wrapItem) {
          case InventoryItems.tape:
          case InventoryItems.scissors:
          case InventoryItems.paper:
            setDialogContent(
              `If you wrap the ${wrapItem.toLowerCase()}, how are you going to wrap anything else?`,
            );
            break;
          case InventoryItems.bakingTray:
            setDialogContent(`Isn't that ${wrapItem.toLowerCase()} common?`);
            break;
          case InventoryItems.utensils:
          case InventoryItems.plates:
            setDialogContent(`Wait, you still need those!`);
            break;
          case InventoryItems.jeans:
            setDialogContent('Nobody is going to want these.');
            break;
          case InventoryItems.handCream:
            setDialogContent('Nobody is going to want this.');
            break;
          default:
            setDialogContent(`Wrapping ${wrapItem.toLowerCase()} makes no sense.`);
            break;
        }
        setVisible(true);
      }
    }
  }, [wrapItem, wrapItemFunc]);

  return (
    <>
      <p>There is only one thing that you can do with all of this stuff.</p>
      <p>Wrap it.</p>
      <div className="flex gap-2">
        <Dropdown
          value={wrapItem}
          options={options}
          onChange={(e) => setWrapItem(e.value)}
          optionLabel={'name'}
          placeholder="Select something to wrap"
          className="w-5"
        />
        <Button label="Wrap" disabled={!wrapItem} onClick={onWrap} />
      </div>
      <Dialog
        visible={isVisible}
        onHide={() => setVisible(false)}
        footer={
          <Button label="Back" outlined severity="secondary" onClick={() => setVisible(false)} />
        }
        dismissableMask
        draggable={false}
        resizable={false}
        closable={false}
        className="w-5"
      >
        <p>{dialogContent}</p>
      </Dialog>
    </>
  );
};
