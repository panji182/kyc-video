'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { toEm, toRem } from '@/helpers/globalFunctions';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import LinkIcon from '@mui/icons-material/Link';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CampaignIcon from '@mui/icons-material/Campaign';
import TheatersIcon from '@mui/icons-material/Theaters';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import c from '@mui/icons-material/Storage';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { paths } from '@/consts';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
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
});

const DrawerHeader = styled('div')(({ theme }) => ({
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

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, {
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
}));

const menuLists = [
  {
    label: 'Server Configuration',
    name: 'server-configuration',
    icon: <SettingsApplicationsIcon />,
    link: paths.home.href,
    subMenus: null,
  },
  {
    label: 'User Management',
    name: 'parent',
    icon: <GroupIcon />,
    link: null,
    subMenus: [
      {
        label: 'View Users',
        name: 'view-users',
        icon: <PanoramaFishEyeIcon />,
        link: paths.viewUsers.href,
      },
      {
        label: 'Role & Permissions',
        name: 'role-and-permissions',
        icon: <PanoramaFishEyeIcon />,
        link: paths.roleAndPermissions.href,
      },
    ],
  },
  {
    label: 'Channel',
    name: 'channel',
    icon: <LinkIcon />,
    link: paths.home.href,
    subMenus: null,
  },
  {
    label: 'Video Jingle',
    name: 'video-jingle',
    icon: <OndemandVideoIcon />,
    link: paths.home.href,
    subMenus: null,
  },
  {
    label: 'Campaign',
    name: 'campaign',
    icon: <CampaignIcon />,
    link: paths.home.href,
    subMenus: null,
  },
  {
    label: 'Recording',
    name: 'recording',
    icon: <TheatersIcon />,
    link: paths.recording.href,
    subMenus: null,
  },
  {
    label: 'Report',
    name: 'parent',
    icon: <ListAltIcon />,
    link: null,
    subMenus: [
      {
        label: 'KYC',
        name: 'kyc',
        icon: <PanoramaFishEyeIcon />,
        link: paths.kycReport.href,
      },
      {
        label: 'Abandon Call',
        name: 'abandon-call',
        icon: <PanoramaFishEyeIcon />,
        link: paths.abandonCallReport.href,
      },
      {
        label: 'Daily Summary',
        name: 'daily-summary',
        icon: <PanoramaFishEyeIcon />,
        link: paths.dailySummaryReport.href,
      },
    ],
  },
];

const userSettings = ['Profile', 'Logout'];

type AdminLayoutProps = {
  children: JSX.Element;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(true);
  const [expandMenus, setExpandMenus] = useState<boolean[]>([]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    setExpandMenus(() => menuLists.map(list => false));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExpandMenuClick = (index: number) => {
    setExpandMenus(prevState => {
      const arr = [...prevState];
      arr[index] = !arr[index];
      return arr;
    });
  };

  const handleRedirect = (link: string | null) => {
    link && router.push(link);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isMenuExist = (path: string, menuName: string) => {
    let exists: boolean = false,
      lastPathName: string;
    if (path !== '/') {
      const arr = path.split('/');
      lastPathName = arr[arr.length - 1];
    } else {
      lastPathName = '';
    }
    if (lastPathName.indexOf(menuName) !== -1) {
      exists = true;
    }
    return exists;
  };

  const isSubMenuExist = (path: string, submenus: any[] | null) => {
    let exists: boolean = false,
      i = 0,
      submn = submenus || [],
      lastPathName: string;
    if (path !== '/') {
      const arr = path.split('/');
      lastPathName = arr[arr.length - 1];
    } else {
      lastPathName = '';
    }
    while (i < submn.length && !exists) {
      let name = submenus ? submn[i].name : '';
      if (lastPathName.indexOf(name) !== -1) {
        exists = true;
      }
      i += 1;
    }
    return exists;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Console
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginRight: '1rem' }}>
            <Typography textAlign="center">Welcome, Remy</Typography>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src="/assets/images/user.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: toRem(45) }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map(usetting => (
                <MenuItem key={usetting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{usetting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: toEm(14),
            },
          }}
        >
          {menuLists.map((list, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  list.subMenus
                    ? handleExpandMenuClick(index)
                    : handleRedirect(list.link);
                }}
                selected={isMenuExist(pathname, list.name)}
              >
                {list.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {list.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={list.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {list.subMenus && (
                  <>
                    {expandMenus[index] ||
                    isSubMenuExist(pathname, list.subMenus) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </>
                )}
              </ListItemButton>
              <Collapse
                in={
                  expandMenus[index] || isSubMenuExist(pathname, list.subMenus)
                }
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {(list.subMenus || []).map((subMenu, indexSb) => (
                    <ListItem
                      key={`submenu${index}${indexSb}`}
                      disablePadding
                      sx={{ display: 'block' }}
                    >
                      <ListItemButton
                        onClick={() => handleRedirect(subMenu.link)}
                        selected={isMenuExist(pathname, subMenu.name)}
                      >
                        {subMenu.icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            {subMenu.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={subMenu.label}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
