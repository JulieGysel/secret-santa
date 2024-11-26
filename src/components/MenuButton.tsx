import React from 'react';
import { Button } from 'primereact/button';
import { Menu, MenuProps } from 'primereact/menu';

export const MenuButton = ({
  items = [],
  label,
  disabledReason,
}: {
  label: string;
  items: MenuProps['model'];
  disabledReason?: string;
}) => {
  const menuRef = React.useRef(null);

  return (
    <>
      {!!items.length && (
        <Menu model={items} popup ref={menuRef} aria-hidden="false" aria-label="Menu" />
      )}
      <Button
        label={label}
        outlined
        severity="secondary"
        onClick={(e) => menuRef.current?.toggle(e)}
        aria-controls="popup_menu_left"
        aria-haspopup
        disabled={!items.length}
        tooltip={!items.length && disabledReason ? disabledReason : ''}
        tooltipOptions={{ showOnDisabled: true }}
      />
    </>
  );
};
