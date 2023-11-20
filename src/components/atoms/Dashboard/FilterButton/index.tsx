import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const MenuDropdown = dynamic(
  () => import('@/components/atoms/Dashboard/MenuDropdown')
);

import { FilterDropdown, sortType } from '@/types/atoms/filterButton';
import { toRem } from '@/helpers/globalFunctions';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import IconSort from '@/components/atoms/Icons/IconSort';

type Props = {
  filterDropdown: FilterDropdown[];
  variant: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClickFilter: (e: FilterDropdown) => void;
  // eslint-disable-next-line no-unused-vars
  onClickSort: (e: sortType) => void;
};

const FilterButton = memo(
  ({
    filterDropdown,
    variant,
    onClickFilter,
    onClickSort,
    ...props
  }: Props) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = React.useState<FilterDropdown>({
      label: 'Default',
      value: 'default',
    });
    const [sorted, setSorted] = React.useState<string>('asc');
    const handleShowFilter = () => {
      setOpen(prevState => !prevState);
    };
    const handleMenuClick = (selected: FilterDropdown) => {
      setSelectedFilter(selected);
      onClickFilter(selected);
      setOpen(false);
    };
    const handleSortClick = () => {
      setSorted((prevState: string) => {
        const sortResult = prevState === 'asc' ? 'desc' : 'asc';
        onClickSort(sortResult);
        return sortResult;
      });
    };

    return (
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={theme => ({
            ml: toRem(32),
            height: '34px',
            [theme.breakpoints.only('xs')]: {
              ml: 0,
            },
          })}
        >
          <Button
            variant={variant}
            startIcon={<IconSort />}
            color={'primary'}
            onClick={handleShowFilter}
            sx={{
              color: '#fff',
              backgroundColor: '#3150A0',
              fontSize: toRem(18),
              textTransform: 'capitalize',
            }}
            {...props}
          >
            {selectedFilter.label}
          </Button>
          <IconButton
            {...props}
            onClick={handleSortClick}
            title={sorted === 'asc' ? 'Ascending' : 'Descending'}
            sx={{
              position: 'relative',
              color: '#fff',
              backgroundColor: '#3150A0',
              borderRadius: '0 4px 4px 0',
              '&:hover': {
                color: '#fff',
                backgroundColor: '#3150A0',
              },
              '&:before': {
                position: 'absolute',
                content: '""',
                width: '1px',
                height: '24px',
                left: 0,
                top: '16%',
                backgroundColor: '#fff',
              },
            }}
          >
            {sorted === 'asc' ? <SouthIcon /> : <NorthIcon />}
          </IconButton>
        </ButtonGroup>
        <MenuDropdown
          open={open}
          selectedItem={selectedFilter}
          menuList={filterDropdown}
          onMenuClick={handleMenuClick}
        />
      </Box>
    );
  }
);

FilterButton.displayName = 'FilterButton';

export default FilterButton;
