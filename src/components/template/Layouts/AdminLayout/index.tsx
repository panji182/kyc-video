'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styles, { DrawerHeader, AppBar, Drawer } from './index.styles';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { toEm, toRem } from '@/helpers/globalFunctions';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconDashboard from '@/components/atoms/Icons/IconDashboard';
import IconCampaign from '@/components/atoms/Icons/IconCampaign';
import IconChannel from '@/components/atoms/Icons/IconChannel';
import IconRecording from '@/components/atoms/Icons/IconRecording';
import IconReport from '@/components/atoms/Icons/IconReport';
import IconServerConfiguration from '@/components/atoms/Icons/IconServerConfiguration';
import IconUserManagement from '@/components/atoms/Icons/IconUserManagement';
import IconVideoJingle from '@/components/atoms/Icons/IconVideoJingle';
import IconTimesManagement from '@/components/atoms/Icons/IconTimesManagement';

import { paths } from '@/consts';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const menuLists = [
  {
    label: 'Dashboard',
    name: 'dashboard',
    icon: <IconDashboard />,
    link: paths.dashboard.href,
    subMenus: null,
  },
  {
    label: 'Server Configuration',
    name: 'server-configuration',
    icon: <IconServerConfiguration />,
    link: paths.serverConfiguration.href,
    subMenus: null,
  },
  {
    label: 'User Management',
    name: 'parent',
    icon: <IconUserManagement />,
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
    icon: <IconChannel />,
    link: paths.channel.href,
    subMenus: null,
  },
  {
    label: 'Video Jingle',
    name: 'jingle-video',
    icon: <IconVideoJingle />,
    link: paths.jingleVideo.href,
    subMenus: null,
  },
  {
    label: 'Working Times Management',
    name: 'parent',
    icon: <IconTimesManagement />,
    link: null,
    subMenus: [
      {
        label: 'Work Hour',
        name: 'work-hour',
        icon: <PanoramaFishEyeIcon />,
        link: paths.workHour.href,
      },
      {
        label: 'Holidays',
        name: 'holiday',
        icon: <PanoramaFishEyeIcon />,
        link: paths.holiday.href,
      },
    ],
  },
  {
    label: 'Campaign',
    name: 'campaign',
    icon: <IconCampaign />,
    link: paths.campaign.href,
    subMenus: null,
  },
  {
    label: 'Recording',
    name: 'recording',
    icon: <IconRecording />,
    link: paths.recording.href,
    subMenus: null,
  },
  {
    label: 'Report',
    name: 'parent',
    icon: <IconReport />,
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

const userSettings = ['Profile', 'divider', 'Logout'];

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
  const [search, setSearch] = useState<string>('');
  console.log(search);

  useEffect(() => {
    setExpandMenus(() => menuLists.map(() => false));
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

  const isMenuExist = (path: string | null, menuName: string) => {
    let exists = false,
      lastPathName: string;
    if (path) {
      const arr = path.split('/');
      lastPathName =
        arr[arr.length - 1] !== '' ? arr[arr.length - 1] : 'dashboard';
    } else {
      lastPathName = '';
    }
    if (lastPathName.indexOf(menuName) !== -1) {
      exists = true;
    }
    return exists;
  };

  const isSubMenuExist = (path: string | null, submenus: any[] | null) => {
    let exists = false,
      i = 0,
      lastPathName: string;
    const submn = submenus || [];
    if (path && path !== '/') {
      const arr = path.split('/');
      lastPathName = arr[arr.length - 1];
    } else {
      lastPathName = '';
    }
    while (i < submn.length && !exists) {
      const name = submenus ? submn[i].name : '';
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
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background:
            'linear-gradient(88.34deg, #263544 0%, #405A73 37.81%, #5585B5 71.15%, #79A9D9 100%)',
        }}
      >
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
            <MenuIcon
              sx={{
                color: '#D1D5D8',
                background: '#3150A0',
                borderRadius: '7px',
              }}
            />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Console
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginRight: toRem(16) }}>
            <Typography textAlign="center">Welcome, Remy</Typography>
          </Box>
          <Box>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src="/assets/images/user-women.png" />
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
              {userSettings.map((usetting, index) =>
                usetting !== 'divider' ? (
                  <MenuItem
                    key={usetting + index}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{usetting}</Typography>
                  </MenuItem>
                ) : (
                  <Divider key={index} />
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={styles.scrollStyles}>
        <DrawerHeader
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Avatar alt="user" sx={{ marginRight: toRem(10) }} />
          <Typography
            sx={{
              fontSize: toEm(20),
            }}
          >
            KYC Phincon
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon
                sx={{
                  color: '#D1D5D8',
                  background: '#3150A0',
                  borderRadius: '7px',
                }}
              />
            ) : (
              <ChevronLeftIcon
                sx={{
                  color: '#D1D5D8',
                  background: '#3150A0',
                  borderRadius: '7px',
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ background: '#808080' }} />
        {open && (
          <TextField
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: '#B0B0B0',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            sx={{
              marginTop: toRem(16),
              marginLeft: toRem(16),
              marginRight: toRem(16),
              borderRadius: '10px',
              backgroundColor: 'rgba(65, 68, 72, 0.34)',
              borderBottom: '1px solid #808080',
              '& input': {
                color: '#B0B0B0',
                padding: toRem(8),
              },
              '& fieldset': {
                border: 0,
              },
            }}
            onChange={e => setSearch(e.target.value)}
          />
        )}
        {open && (
          <Typography
            sx={{
              marginTop: toRem(16),
              marginLeft: toRem(16),
              marginRight: toRem(16),
              color: '#B0B0B0',
              fontWeight: 'bold',
            }}
          >
            Menu
          </Typography>
        )}
        <List
          component="div"
          sx={{
            maxHeight: '300px',
            '& .MuiListItemText-primary': {
              fontSize: toEm(14),
            },
          }}
        >
          {menuLists.map((list, index) => (
            <ListItem
              component="div"
              key={index}
              disablePadding
              sx={{ display: 'block' }}
            >
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
                      mr: open ? toRem(16) : 'auto',
                      justifyContent: 'center',
                      color: '#D1D5D8',
                    }}
                  >
                    {list.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={list.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {list.subMenus && open && (
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
                      component="div"
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
                              ml: open ? toRem(8) : 'auto',
                              mr: open ? toRem(24) : 'auto',
                              justifyContent: 'center',
                              '& svg': {
                                fontSize: toEm(16),
                              },
                              color: '#D1D5D8',
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
      <Box
        component="main"
        sx={{
          width: open ? 'calc(100% - 18rem)' : 'calc(100% - 3.4rem)',
          padding: toRem(24),
          paddingBottom: 0,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
