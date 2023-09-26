'use client';

import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));

import { toRem } from '@/helpers/globalFunctions';

const dataRows = [
  {
    channelId: 201,
    name: 'web',
    status: 'Active',
  },
  {
    channelId: 202,
    name: 'mobile',
    status: 'Active',
  },
  {
    channelId: 203,
    name: 'kiosk',
    status: 'Not Active',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'channelId',
    numeric: false,
    disablePadding: false,
    label: 'Channel ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

const ChannelPage = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: '600', mb: toRem(16) }}
        gutterBottom
      >
        Channel
      </Typography>
      <Table
        data={dataRows}
        fieldOrderBy={'channelId'}
        headCells={headCells}
        showEditor={false}
      />
    </>
  );
};

export default ChannelPage;
