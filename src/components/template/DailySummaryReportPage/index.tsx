'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const ExportButton = dynamic(
  () => import('@/components/molecules/ExportButton')
);
const PopupAdvancedSearchDailySummary = dynamic(
  () => import('@/components/molecules/PopupAdvancedSearchDailySummary')
);

import { toRem } from '@/helpers/globalFunctions';

import SearchIcon from '@mui/icons-material/Search';

const dataRows = [
  {
    startDate: '2023-09-13T08:14:00',
    channel: 'web',
    interactionWaiting: 25,
    interactionHandled: 140,
    interactionAbandon: 68,
    interactionAwtTime: 40,
    agentReady: 12,
    agentNotReady: 2,
    agentLogin: 10,
    agentAhtTime: 5,
  },
  {
    startDate: '2023-09-13T10:25:00',
    channel: 'mobile',
    interactionWaiting: 26,
    interactionHandled: 141,
    interactionAbandon: 69,
    interactionAwtTime: 41,
    agentReady: 13,
    agentNotReady: 3,
    agentLogin: 11,
    agentAhtTime: 6,
  },
  {
    startDate: '2023-09-13T11:02:00',
    channel: 'kiosk',
    interactionWaiting: 27,
    interactionHandled: 142,
    interactionAbandon: 70,
    interactionAwtTime: 42,
    agentReady: 14,
    agentNotReady: 4,
    agentLogin: 12,
    agentAhtTime: 7,
  },
];

const headCells: HeadCell[] = [
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Start Date',
  },
  {
    id: 'channel',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Channel',
  },
  {
    id: 'interactionWaiting',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Interaction Waiting',
  },
  {
    id: 'interactionHandled',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Interaction Handled',
  },
  {
    id: 'interactionAbandon',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Interaction Abandon',
  },
  {
    id: 'interactionAwtTime',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Interaction Awaiting Time',
  },
  {
    id: 'agentReady',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Agent Ready',
  },
  {
    id: 'agentNotReady',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Agent Not Ready',
  },
  {
    id: 'agentLogin',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Agent Login',
  },
  {
    id: 'agentAhtTime',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Agent Aht Time',
  },
];

const ViewUsersPage = () => {
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

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Daily Summary Report
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
        fieldOrderBy={'channel'}
        rowsPerpageCount={25}
        headCells={headCells}
      />
      <PopupAdvancedSearchDailySummary
        open={open}
        onSearched={handleSearchResult}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default ViewUsersPage;
