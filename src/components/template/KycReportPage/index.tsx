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
const PopupAdvancedSearchKyc = dynamic(
  () => import('@/components/molecules/PopupAdvancedSearchKyc')
);
const CsvDownloader = dynamic(() => import('@/components/atoms/CsvDownloader'));

import {
  toRem,
  columnProps,
  jsPdfProps,
  exportToPDF,
} from '@/helpers/globalFunctions';

import SearchIcon from '@mui/icons-material/Search';

const dataRows = [
  {
    conversationId: 1,
    agentId: 14,
    customerChannelType: 'web',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:00:00',
    duration: 15,
    wt: 100,
    ht: 100,
    customerId: 16,
    kycName: 'adrian',
    kycTelp: '+628388274665',
    kycEmail: 'adrian@gmail.com',
    kycNotes: 'aman',
    kycStatus: 'verified',
  },
  {
    conversationId: 2,
    agentId: 13,
    customerChannelType: 'mobile',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:20:00',
    duration: 45,
    wt: 201,
    ht: 202,
    customerId: 17,
    kycName: 'adriano',
    kycTelp: '+628388274666',
    kycEmail: 'adriano@gmail.com',
    kycNotes: 'aman',
    kycStatus: 'verified',
  },
  {
    conversationId: 3,
    agentId: 16,
    customerChannelType: 'web',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:00:00',
    duration: 46,
    wt: 103,
    ht: 104,
    customerId: 19,
    kycName: 'adriani',
    kycTelp: '+628388274668',
    kycEmail: 'adriani@gmail.com',
    kycNotes: 'aman',
    kycStatus: 'verified',
  },
  {
    conversationId: 4,
    agentId: 17,
    customerChannelType: 'mobile',
    startTime: '2023-09-13T08:14:00',
    endTime: '2023-09-13T09:20:00',
    duration: 47,
    wt: 203,
    ht: 204,
    customerId: 20,
    kycName: 'yusman',
    kycTelp: '+628388274669',
    kycEmail: 'yusman@gmail.com',
    kycNotes: 'aman',
    kycStatus: 'verified',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'conversationId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Conversation Id',
  },
  {
    id: 'agentId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'agent Id',
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
    id: 'wt',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Waiting Time',
  },
  {
    id: 'ht',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Half Time',
  },
  {
    id: 'customerId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Customer Id',
  },
  {
    id: 'kycName',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'KYC Name',
  },
  {
    id: 'kycTelp',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'KYC Telpon',
  },
  {
    id: 'kycEmail',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'KYC Email',
  },
  {
    id: 'kycNotes',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'KYC Notes',
  },
  {
    id: 'kycStatus',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'KYC Status',
  },
];

const KycReportPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleExportCSV = () => {
    const btnCsvDownloader = document.getElementById('csvDownloader');
    btnCsvDownloader && btnCsvDownloader.click();
  };

  const handleExportPDF = () => {
    const configPdf: jsPdfProps = {
      orientation: 'l',
      unit: 'pt',
      format: 'a4',
    };
    const columnsPdf: columnProps = {
      columnLabels: [
        'Conversation Id',
        'Agent Id',
        'Customer Channel Type',
        'Start Time',
        'End Time',
        'Duration',
        'WT',
        'HT',
        'Customer Id',
        'Kyc Name',
        'Kyc Telp',
        'Kyc Email',
        'Kyc Notes',
        'Kyc Status',
      ],
      columnFields: [
        'conversationId',
        'agentId',
        'customerChannelType',
        'startTime',
        'endTime',
        'duration',
        'wt',
        'ht',
        'customerId',
        'kycName',
        'kycTelp',
        'kycEmail',
        'kycNotes',
        'kycStatus',
      ],
    };
    exportToPDF(
      'KYC Report Lists',
      configPdf,
      columnsPdf,
      dataRows,
      'kyc_report_lists'
    );
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
        KYC Report
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
        fieldOrderBy={'conversationId'}
        rowsPerpageCount={25}
        isLoading={false}
        headCells={headCells}
      />
      <PopupAdvancedSearchKyc
        open={open}
        onSearched={handleSearchResult}
        onClosePopup={() => setOpen(false)}
      />
      <CsvDownloader
        id="csvDownloader"
        data={dataRows}
        filename="kyc_report_lists.csv"
        delimiter=";"
      />
    </>
  );
};

export default KycReportPage;
