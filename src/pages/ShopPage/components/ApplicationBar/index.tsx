import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const ApplicationBar: React.FC = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Mini variant drawer
      </Typography>
    </Toolbar>
  </AppBar>
  );

export default ApplicationBar;
