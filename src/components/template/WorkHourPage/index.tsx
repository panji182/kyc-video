'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddWorkHour = dynamic(
  () => import('@/components/molecules/PopupFormAddWorkHour')
);

import { toRem } from '@/helpers/globalFunctions';
import { WorkHourInput } from '@/types/molecules/WorkHour';

import AddIcon from '@mui/icons-material/Add';

const dataRows = [
  {
    name: 'work hour contract',
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
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
    id: 'monday',
    numeric: false,
    disablePadding: false,
    label: 'Monday',
  },
  {
    id: 'tuesday',
    numeric: false,
    disablePadding: false,
    label: 'Tuesday',
  },
  {
    id: 'wednesday',
    numeric: false,
    disablePadding: false,
    label: 'Wednesday',
  },
  {
    id: 'thursday',
    numeric: false,
    disablePadding: false,
    label: 'Thursday',
  },
  {
    id: 'friday',
    numeric: false,
    disablePadding: false,
    label: 'Friday',
  },
  {
    id: 'saturday',
    numeric: false,
    disablePadding: false,
    label: 'Saturday',
  },
  {
    id: 'sunday',
    numeric: false,
    disablePadding: false,
    label: 'Sunday',
  },
];

const WorkHourPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: WorkHourInput) => {
    console.log(21, paramResult);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Work Hour
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Work Hour"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table data={dataRows} fieldOrderBy={'name'} headCells={headCells} />
      <PopupFormAddWorkHour
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default WorkHourPage;
