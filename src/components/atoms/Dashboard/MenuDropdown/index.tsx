import React from 'react';
import Box from '@mui/material/Box';
import { toRem } from '@/helpers/globalFunctions';

import { FilterDropdown } from '@/types/atoms/filterButton';

type Props = {
  open: boolean;
  menuList: FilterDropdown[];
  selectedItem: FilterDropdown;
  // eslint-disable-next-line no-unused-vars
  onMenuClick: (e: FilterDropdown) => void;
};

const MenuDropdown = ({ open, menuList, selectedItem, onMenuClick }: Props) => {
  const handleMenuClick = (data: FilterDropdown) => {
    onMenuClick(data);
  };
  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            width: '156px',
            top: 0,
            left: '15%',
            border: '0.5px solid #90A5DB;',
            backgroundColor: '#E3F4F4',
            zIndex: 999,
            borderRadius: '5px',
            paddingLeft: toRem(10),
            paddingTop: toRem(10),
          }}
        >
          {menuList.map((d: any, index) => (
            <Box
              component="p"
              key={index}
              onClick={() => handleMenuClick(d)}
              sx={{
                paddingBottom: toRem(10),
                lineHeight: '18px',
                fontSize: toRem(18),
              }}
            >
              <Box
                sx={{
                  color: d.value !== selectedItem.value ? '#302D2D' : '#3150A0',
                  fontWeight: d.value === selectedItem.value ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {d.label}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default MenuDropdown;
