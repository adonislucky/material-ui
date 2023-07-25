import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';

export default function SelectedMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const createHandleClose = (index) => () => {
    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };

  return (
    <Dropdown>
      <MenuButton startDecorator={<Apps />}>Apps</MenuButton>
      <Menu>
        <MenuItem
          {...(selectedIndex === 0 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(0)}
        >
          Random project
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 1 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(1)}
        >
          Production - web
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 2 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(2)}
        >
          Staging - web
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
