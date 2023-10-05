import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  color: '#fff',
  background:
    'linear-gradient(188.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  color: '#fff',
  background:
    'linear-gradient(188.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  '.Mui-selected': {
    background: 'rgba(49, 80, 160, .45) !important',
    borderLeft: '4px solid #E6E6E7',
    color: '#fff',
  },
}));

const styles = {
  scrollStyles: {
    '& .MuiPaper-elevation::-webkit-scrollbar': {
      width: '8px',
    },
    '& .MuiPaper-elevation::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '& .MuiPaper-elevation::-webkit-scrollbar-thumb': {
      background: '#808080',
    },
    '& .MuiPaper-elevation::-webkit-scrollbar-thumb:hover': {
      background: '#808080',
    },
    '& > div': {
      scrollbarColor: '#808080 #f1f1f1',
      scrollbarWidth: 'thin',
    },
  },
};

export default styles;
