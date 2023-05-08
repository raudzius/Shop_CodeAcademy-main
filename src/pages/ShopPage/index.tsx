import * as React from 'react';
import { Box, useMediaQuery, type Theme } from '@mui/material';
import ApplicationBar from './components/ApplicationBar';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import { DrawerProvider } from './contexts/DrawerContext';
import { ShopContextProvider } from './contexts/ShopContext';
import DrawerButton from './components/DrawerButton';

const ShopPage = () => {
  const isExtendedLayout = useMediaQuery<Theme>((theme) => theme.breakpoints.up('xl'));

  return (
    <ShopContextProvider>
      <DrawerProvider>
        <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
          <ApplicationBar />
          <Sidebar isExtendedLayout={isExtendedLayout} />
          <MainSection isExtendedLayout={isExtendedLayout} />
          {!isExtendedLayout && <DrawerButton />}
        </Box>
      </DrawerProvider>
    </ShopContextProvider>
  );
};

export default ShopPage;
