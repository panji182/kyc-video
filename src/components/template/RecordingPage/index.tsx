'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const ExportButton = dynamic(
  () => import('@/components/molecules/ExportButton')
);
const PopupAdvancedSearchRecording = dynamic(
  () => import('@/components/molecules/PopupAdvancedSearchRecording')
);

import { toRem } from '@/helpers/globalFunctions';

import SearchIcon from '@mui/icons-material/Search';

const dataRows = [
  {
    id: 1,
    agentId: 14,
    customerId: 11,
    startTime: '2023-09-13T10:14:00',
    endTime: '2023-09-13T11:00:00',
    duration: 200,
    server: 'http://192.168.1.2',
    path: '/kyc/videos',
    filename: 'customer002',
    fileExt: '.mp4',
    customerChannelType: 'web',
  },
  {
    id: 2,
    agentId: 15,
    customerId: 12,
    startTime: '2023-09-13T12:14:00',
    endTime: '2023-09-13T13:00:00',
    duration: 150,
    server: 'http://192.168.1.2',
    path: '/kyc/videos',
    filename: 'customer003',
    fileExt: '.mp4',
    customerChannelType: 'mobile',
  },
  {
    id: 3,
    agentId: 16,
    customerId: 13,
    startTime: '2023-09-13T14:14:00',
    endTime: '2023-09-13T15:00:00',
    duration: 100,
    server: 'http://192.168.1.2',
    path: '/kyc/videos',
    filename: 'customer004',
    fileExt: '.mp4',
    customerChannelType: 'web',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Conversation ID',
  },
  {
    id: 'agentId',
    numeric: true,
    disablePadding: false,
    label: 'Agent ID',
  },
  {
    id: 'customerId',
    numeric: true,
    disablePadding: false,
    label: 'Customer ID',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'server',
    numeric: false,
    disablePadding: false,
    label: 'Server',
  },
  {
    id: 'path',
    numeric: false,
    disablePadding: false,
    label: 'Path',
  },
  {
    id: 'filename',
    numeric: false,
    disablePadding: false,
    label: 'File Name',
  },
  {
    id: 'fileExt',
    numeric: false,
    disablePadding: false,
    label: 'File Ext',
  },
  {
    id: 'customerChannelType',
    numeric: false,
    disablePadding: false,
    label: 'Customer Channel Type',
  },
];

const RecordingPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleExportCSV = () => {
    alert('CSV Data Exported !');
  };

  const handleExportPDF = () => {
    alert('PDF Data Exported !');
  };

  const handleShowAdvancedSearch = () => {
    setOpen(true);
  };

  const handleSearchResult = (paramResult: any) => {
    console.log(21, paramResult);
  };

  const handlePlayVideo = (id: any) => {
    alert(`Video with id ${id} is played !`);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Recording
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <ExportButton
          handleExportCSV={handleExportCSV}
          handleExportPDF={handleExportPDF}
        />
        <Button
          label="Advanced Search"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleShowAdvancedSearch}
        />
      </Stack>
      <Table
        data={dataRows}
        fieldOrderBy={'agentId'}
        headCells={headCells}
        showEditor={false}
        idFieldName={'id'}
        customActionButton={(id: any) => (
          <IconButton
            aria-label="playVideo"
            color="primary"
            onClick={() => handlePlayVideo(id)}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        )}
      />
      <PopupAdvancedSearchRecording
        open={open}
        onSearched={handleSearchResult}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default RecordingPage;
