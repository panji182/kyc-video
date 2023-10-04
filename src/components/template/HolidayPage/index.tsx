'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddHoliday = dynamic(
  () => import('@/components/molecules/PopupFormAddHoliday')
);

import { toRem } from '@/helpers/globalFunctions';
import { HolidayInput } from '@/types/molecules/Holiday';

import AddIcon from '@mui/icons-material/Add';

const dataRows = [
  {
    name: 'work hour contract',
    startDate: '2023-09-01',
    endDate: '2023-09-30',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Holiday',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Holiday',
  },
];

const HolidayPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: HolidayInput) => {
    console.log(21, paramResult);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Holiday
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Holiday"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table data={dataRows} fieldOrderBy={'name'} headCells={headCells} />
      <PopupFormAddHoliday
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default HolidayPage;
