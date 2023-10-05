'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddJingleVideo = dynamic(
  () => import('@/components/molecules/PopupFormAddJingleVideo')
);

import { toRem } from '@/helpers/globalFunctions';
import { JingleVideoInput } from '@/types/molecules/JingleVideo';

import AddIcon from '@mui/icons-material/Add';

const dataRows = [
  {
    name: 'Campaign 1',
    type: 'video',
    video: 'campaign1.mp4',
    image: null,
    audio: null,
    status: 'Active',
  },
  {
    name: 'Campaign 2',
    type: 'Image + Audio',
    video: null,
    image: 'campaign2.jpg',
    audio: 'campaign2.wav',
    status: 'Not Active',
  },
  {
    name: 'Campaign 3',
    type: 'video',
    video: 'campaign3.mp4',
    image: null,
    audio: null,
    status: 'Not Active',
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
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Jingle Type',
  },
  {
    id: 'video',
    numeric: false,
    disablePadding: false,
    label: 'Video',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'audio',
    numeric: false,
    disablePadding: false,
    label: 'Audio',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

const JingleVideoPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: JingleVideoInput) => {
    console.log(21, paramResult);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Video Jingle
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Video Jingle"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table data={dataRows} fieldOrderBy={'name'} headCells={headCells} />
      <PopupFormAddJingleVideo
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default JingleVideoPage;
