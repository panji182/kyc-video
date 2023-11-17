'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddCampaign = dynamic(
  () => import('@/components/molecules/PopupFormAddCampaign')
);

import { toRem } from '@/helpers/globalFunctions';
import { CampaignInput } from '@/types/template/Campaign';

import AddIcon from '@mui/icons-material/Add';

const dataRows = [
  {
    name: 'Sosialisasi ewallet',
    type: 'default',
    dateStart: null,
    dateEnd: null,
    timeStart: '09:00:00',
    timeEnd: '18:00:00',
  },
  {
    name: 'New Company Rules',
    type: 'default',
    dateStart: null,
    dateEnd: null,
    timeStart: '09:00:00',
    timeEnd: '18:00:00',
  },
  {
    name: 'Flash Sale',
    type: 'special',
    dateStart: '2023-09-20',
    dateEnd: '2023-09-25',
    timeStart: '08:00:00',
    timeEnd: '17:00:00',
  },
  {
    name: 'Lebaran Sale',
    type: 'special',
    dateStart: '2023-09-20',
    dateEnd: '2023-09-25',
    timeStart: '08:00:00',
    timeEnd: '17:00:00',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Name',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Campaign Type',
  },
  {
    id: 'dateStart',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Date Start',
  },
  {
    id: 'dateEnd',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Date End',
  },
  {
    id: 'timeStart',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Time Start',
  },
  {
    id: 'timeEnd',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Time End',
  },
];

const CampaignPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: CampaignInput) => {
    console.log(101, paramResult);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Campaign
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Campaign"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table
        data={dataRows}
        fieldOrderBy={'name'}
        rowsPerpageCount={25}
        isLoading={false}
        headCells={headCells}
      />
      <PopupFormAddCampaign
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default CampaignPage;
