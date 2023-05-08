import { IconButton } from '@mui/material';
import React from 'react';
import { ChevronLeft, Menu } from '@mui/icons-material';
import DrawerContext from '../contexts/DrawerContext';

const DrawerButton: React.FC = () => {
  const { open, toggleDrawer } = React.useContext(DrawerContext);

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={toggleDrawer}
      size="large"
      sx={{
        position: 'fixed',
        bottom: 15,
        right: 15,
        bgcolor: 'primary.main',
        borderRadius: 1,
        color: 'common.white',
        ':hover': {
          bgcolor: 'primary.dark',
        },
        zIndex: 'drawerButton',
      }}
    >
      {open ? <ChevronLeft /> : <Menu />}
    </IconButton>
  );
};

export default DrawerButton;
