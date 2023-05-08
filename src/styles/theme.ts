import { createTheme } from '@mui/material';

const theme = createTheme({
  common: {
    drawerWidth: {
      xs: 297,
      md: 340,
    },
  },
  zIndex: {
    drawer: 1100,
    drawerButton: 1150,
    appBar: 1200,
  },
});

export default theme;
