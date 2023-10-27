'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetVideoJingleListQuery,
  useGetDetailVideoJingleQuery,
  useAddNewVideoJingleMutation,
  useUpdateVideoJingleMutation,
  useDeleteVideoJingleMutation,
} from '@/services/VideoJingle';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormAddVideoJingle = dynamic(
  () => import('@/components/molecules/PopupFormAddVideoJingle')
);

import { toRem } from '@/helpers/globalFunctions';
import { VideoJingleList } from '@/types/api/VideoJingle';

import AddIcon from '@mui/icons-material/Add';

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Id',
  },
  {
    id: 'jinglename',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Jingle Name',
  },
  {
    id: 'jingletype',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Jingle Type',
  },
  {
    id: 'urlvideo',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Video Url',
  },
  {
    id: 'urlaudio',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Audio Url',
  },
  {
    id: 'urlimage',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Image Url',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const VideoJinglePage = () => {
  const [search, setSearch] = useState<string>('');
  const dataQuery = useGetVideoJingleListQuery(
    { pageNo: 0, search },
    { refetchOnMountOrArgChange: true }
  );
  const dataRows = dataQuery?.data?.jingles || [];
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [notif, setNotif] = useState<any>(initNotif);
  const detailDataQuery = useGetDetailVideoJingleQuery(
    { id: selectedId },
    { refetchOnMountOrArgChange: true }
  );
  const detailData = detailDataQuery?.data || null;
  const [addVideoJingle] = useAddNewVideoJingleMutation();
  const [updateVideoJingle] = useUpdateVideoJingleMutation();
  const [deleteVideoJingle] = useDeleteVideoJingleMutation();

  const handleOnClick = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleSubmit = async (paramResult: VideoJingleList) => {
    if (isEditing) {
      try {
        const resp: any = await updateVideoJingle({
          jingles: paramResult,
        }).unwrap();
        setNotif({
          show: true,
          message: resp.message,
          severity: resp.status === 'Success' ? 'success' : 'error',
        });
      } catch (err: any) {
        setNotif({
          show: true,
          message: err.error,
          severity: 'error',
        });
      }
    } else {
      try {
        const resp = await addVideoJingle({
          ...paramResult,
        }).unwrap();
        setNotif({
          show: true,
          message: resp.message,
          severity: resp.status === 'Success' ? 'success' : 'error',
        });
      } catch (err: any) {
        setNotif({
          show: true,
          message: err.error,
          severity: 'error',
        });
      }
    }
  };

  const handleEditData = async (data: any) => {
    setIsEditing(true);
    setSelectedId(data.id);
    setOpen(true);
  };

  const handleDeleteData = (id: any) => {
    setSelectedId(id);
    setConfirmDelete(true);
  };

  const handleOkDelete = async () => {
    try {
      const resp = await deleteVideoJingle({ id: selectedId }).unwrap();
      setNotif({
        show: true,
        message: resp.message,
        severity: resp.status === 'Success' ? 'success' : 'error',
      });
    } catch (err: any) {
      setNotif({
        show: true,
        message: err.error,
        severity: 'error',
      });
    }
  };

  const handleCancelDelete = () => {
    console.log('Cancel Delete !');
  };

  const handleQuickSearch = (searchStr: string) => {
    setSearch(searchStr);
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
      <Table
        data={dataRows}
        fieldOrderBy={'jinglename'}
        rowsPerpageCount={25}
        headCells={headCells}
        idActionName="id"
        onEditAction={handleEditData}
        onDeleteAction={handleDeleteData}
        onQuickSearch={handleQuickSearch}
      />
      <PopupFormAddVideoJingle
        open={open}
        editedData={isEditing ? detailData : null}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
      <Dialog
        open={confirmDelete}
        title={'Confirm Delete'}
        description={'Are you sure want to delete !?'}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        onClose={() => setConfirmDelete(false)}
      />
      <Snackbar
        open={notif.show}
        message={notif.message}
        severity={notif.severity}
        vertical="top"
        horizontal="right"
        onClose={() =>
          setNotif((prevState: any) => ({
            ...prevState,
            show: false,
          }))
        }
      />
    </>
  );
};

export default VideoJinglePage;
