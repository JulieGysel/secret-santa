import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useGameContext } from '../hooks/GameContext';

export const Intro = () => {
  const { showIntro, onHideIntro } = useGameContext();
  const [visible, setVisible] = React.useState(showIntro);

  React.useEffect(() => {
    if (!showIntro) {
      setVisible(false);
    }
  }, [showIntro]);

  return (
    <Dialog
      footer={
        <div>
          <Button
            label="Back"
            outlined
            severity="secondary"
            onClick={() => {
              console.log('hiding');
              onHideIntro();
              setVisible(!visible);
            }}
          />
          <Button label="Next" severity="secondary" />
        </div>
      }
      visible={visible}
      draggable={false}
      resizable={false}
      pt={{ mask: { className: 'surface-ground' } }}
      className="w-5"
      onHide={() => {
        setVisible(!visible);
      }}
      closable={false}
    >
      <p>It is the middle of the night. The weather outside the dorm is not unusual for early</p>
      <p>December. (...) You are sleeping in your bed. Until suddenly…</p>
    </Dialog>
  );
};
