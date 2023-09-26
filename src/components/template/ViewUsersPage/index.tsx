'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';

import { TableComp as Table } from '@/components/atoms/Table';
import { ButtonComp as Button } from '@/components/atoms/Button';
import { PopupAdvancedSearch } from '@/components/molecules/PopupAdvancedSearch';

import { toRem } from '@/helpers/globalFunctions';

import AddIcon from '@mui/icons-material/Add';

const ViewUsersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create User"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table />
      <PopupAdvancedSearch open={open} onClosePopup={() => setOpen(false)} />
    </>
  );
};

export default ViewUsersPage;
