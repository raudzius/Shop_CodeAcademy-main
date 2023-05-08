import {
 Drawer, styled, type Breakpoint, type CSSObject,
} from '@mui/material';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  '& .MuiDrawer-paper': {
    padding: theme.spacing(3, 2),
    ...(Object.entries(theme.common.drawerWidth) as [Breakpoint, number][]).reduce<CSSObject>(
      (prevProps, [brName, width]) => ({
        ...prevProps,
        [theme.breakpoints.up(brName)]: { width },
      }),
      {},
    ),
  },
}));

export default SidebarContainer;
