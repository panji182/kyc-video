'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { HeadCell } from '@/types/atoms/table';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import styles from './index.styles';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const ExportButton = dynamic(
  () => import('@/components/molecules/ExportButton')
);
const PopupAdvancedSearchRecording = dynamic(
  () => import('@/components/molecules/PopupAdvancedSearchRecording')
);
const VideoPlayer = dynamic(() => import('@/components/molecules/VideoPlayer'));
const PopupInformation = dynamic(
  () => import('@/components/atoms/Recording/PopupInformation')
);
const PopupRecordingLog = dynamic(
  () => import('@/components/atoms/Recording/PopupRecordingLog')
);
const Modal = dynamic(() => import('@/components/atoms/Modal'));
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
    interactionId: 1,
    agentId: 14,
    customerName: 'Nurul',
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
    interactionId: 2,
    agentId: 15,
    customerName: 'Rahmat',
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
    interactionId: 3,
    agentId: 16,
    customerName: 'Zulfikar',
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
    id: 'interactionId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Interaction ID',
  },
  {
    id: 'agentId',
    numeric: true,
    disablePadding: false,
    show: true,
    label: 'Agent ID',
  },
  {
    id: 'customerName',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Customer Name',
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
    id: 'server',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Server',
  },
  {
    id: 'path',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Path',
  },
  {
    id: 'filename',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'File Name',
  },
  {
    id: 'fileExt',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'File Ext',
  },
  {
    id: 'customerChannelType',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Customer Channel Type',
  },
];

const RecordingPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPopupDetail, setOpenPopupDetail] = useState<boolean>(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState<boolean>(false);

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
        'Interaction Id',
        'Agent Id',
        'Customer Name',
        'Start Time',
        'End Time',
        'Duration',
        'Server',
        'Path',
        'Filename',
        'File Ext',
        'Customer Channel Type',
      ],
      columnFields: [
        'interactionId',
        'agentId',
        'customerName',
        'startTime',
        'endTime',
        'duration',
        'server',
        'path',
        'filename',
        'fileExt',
        'customerChannelType',
      ],
    };
    exportToPDF(
      'Recording Lists',
      configPdf,
      columnsPdf,
      dataRows,
      'recording_lists'
    );
  };

  const handleShowAdvancedSearch = () => {
    setOpen(true);
  };

  const handleSearchResult = (paramResult: any) => {
    console.log(21, paramResult);
  };

  const handlePlayVideo = (fields: any, index?: number) => {
    console.log(
      157,
      `Video with interactionId ${fields.interactionId} is played ${index} !`
    );
    setOpenVideoPlayer(true);
  };

  const handleClickData = (data: any) => {
    console.log(176, data);
    setOpenPopupDetail(true);
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
        rowsPerpageCount={25}
        headCells={headCells}
        isLoading={false}
        onClickData={handleClickData}
        customActionButton={(fields: any, index?: number) => (
          <IconButton
            aria-label="playVideo"
            color="primary"
            onClick={() => handlePlayVideo(fields, index)}
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
      <VideoPlayer
        open={openVideoPlayer}
        title="Customer Video KYC Rahmat"
        src="https://www.w3schools.com/tags/movie.mp4"
        videoType="video/mp4"
        onClosePopup={() => setOpenVideoPlayer(false)}
      />
      <Modal
        open={openPopupDetail}
        onClose={() => setOpenPopupDetail(false)}
        sx={{
          '&.MuiModal-root>.MuiBox-root': {
            width: '80vw',
            background: '#EEF1FF',
          },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} xl={6} sx={styles.pt1rem}>
            <PopupInformation
              role={'Customer'}
              roleName="Ahmad"
              deviceName="Android"
              ipAddress="192.168.1.1"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6} sx={styles.pt1rem}>
            <PopupInformation
              role={'Agent'}
              roleName="Yuni"
              deviceName="Ios"
              ipAddress="192.168.1.3"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={12}>
            <PopupRecordingLog activityData={[]} />
          </Grid>
        </Grid>
      </Modal>
      <CsvDownloader
        id="csvDownloader"
        data={dataRows}
        filename="recording_lists.csv"
        delimiter=";"
      />
    </>
  );
};

export default RecordingPage;
