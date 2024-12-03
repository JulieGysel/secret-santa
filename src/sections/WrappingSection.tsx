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
            setDialogContent('If you wrap the tape, how are you going to tape the wrapping paper?');
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
      <p>What do you want to wrap?</p>
      <div className="flex gap-2">
        <Dropdown
          value={wrapItem}
          options={options}
          onChange={(e) => setWrapItem(e.value)}
          optionLabel={'name'}
          placeholder="Select a recipe"
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
