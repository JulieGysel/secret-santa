import React from 'react';
import { Button } from 'primereact/button';
import { Menu, MenuProps } from 'primereact/menu';

export const MenuButton = ({ items = [], label }: { label: string; items: MenuProps['model'] }) => {
  const menuRef = React.useRef(null);

  return (
    <>
      <Menu model={items} popup ref={menuRef} />
      <Button
        label={label}
        outlined
        severity="secondary"
        onClick={(e) => menuRef.current && menuRef.current.toggle(e)}
      />
    </>
  );
};
