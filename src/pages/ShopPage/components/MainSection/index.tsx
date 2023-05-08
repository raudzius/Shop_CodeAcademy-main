import React from 'react';
import {
 Box, Divider, Grid, Typography,
} from '@mui/material';
import DrawerHeader from '../DrawerHeader';
import ShopContext from '../../contexts/ShopContext';
import CupCard from './components/CupCard';

type MainSectionProps = {
  isExtendedLayout: boolean;
};

const MainSection: React.FC<MainSectionProps> = ({ isExtendedLayout }) => {
  const { cups } = React.useContext(ShopContext);

  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        p: 3,
        ...(isExtendedLayout && { ml: `${theme.common.drawerWidth.md}px` }),
      })}
    >
      <DrawerHeader />
      <Typography component="h1" variant="h5">
        All Products
      </Typography>
      <Divider sx={{ my: 2, mb: 3 }} />
      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {cups.map((cup) => (
          <CupCard
            key={cup.id}
            id={cup.id}
            title={cup.title}
            description={cup.description}
            images={cup.images}
            price={cup.price}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default MainSection;
