import React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { toRem } from '@/helpers/globalFunctions';

const Button = dynamic(() => import('@/components/atoms/Button'));

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

type Props = {
  handleExportCSV: () => void;
  handleExportPDF: () => void;
};

const ExportButton = ({ handleExportCSV, handleExportPDF }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box>
      <Button
        label="Export"
        variant="contained"
        startIcon={<SystemUpdateAltIcon />}
        sx={{
          marginRight: toRem(24),
        }}
        onClick={handleOpenUserMenu}
      />
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
        {['CSV', 'PDF'].map(usetting => (
          <MenuItem
            key={usetting}
            onClick={() => {
              usetting === 'CSV' ? handleExportCSV() : handleExportPDF();
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">{usetting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ExportButton;
