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
const PopupAdvancedSearchAbandonCall = dynamic(
  () => import('@/components/molecules/PopupAdvancedSearchAbandonCall')
);

import { toRem } from '@/helpers/globalFunctions';

import SearchIcon from '@mui/icons-material/Search';

const dataRows = [
  {
    customerId: 1,
    customerChannelType: 'web',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:00:00',
    duration: 15,
    reason: 'kendala internet dari company',
  },
  {
    customerId: 2,
    customerChannelType: 'mobile',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:00:00',
    duration: 16,
    reason: 'kuota customer habis',
  },
  {
    customerId: 3,
    customerChannelType: 'kiosk',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:00:00',
    duration: 17,
    reason: 'kendala internet dari customer',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'customerId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Customer Id',
  },
  {
    id: 'customerChannelType',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Customer Channel Type',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'End Time',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Duration',
  },
  {
    id: 'reason',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Reason',
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
        Abandon Call Report
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
        fieldOrderBy={'customerId'}
        rowsPerpageCount={25}
        isLoading={false}
        headCells={headCells}
      />
      <PopupAdvancedSearchAbandonCall
        open={open}
        onSearched={handleSearchResult}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default ViewUsersPage;
