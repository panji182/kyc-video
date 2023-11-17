'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetChannelListQuery,
  useGetDetailChannelQuery,
  useAddNewChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from '@/services/Channel';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormAddChannel = dynamic(
  () => import('@/components/molecules/PopupFormAddChannel')
);

import { toRem } from '@/helpers/globalFunctions';
import { ChannelList } from '@/types/api/Channel';

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
    id: 'channel',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Channel',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Name',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const ChannelPage = () => {
  const [search, setSearch] = useState<string>('');
  const dataQuery = useGetChannelListQuery(
    { pageNo: 0, search },
    { refetchOnMountOrArgChange: true }
  );
  const dataRows = dataQuery?.data?.channels || [];
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [notif, setNotif] = useState<any>(initNotif);
  const detailDataQuery = useGetDetailChannelQuery(
    { id: selectedId },
    { refetchOnMountOrArgChange: true }
  );
  const detailData = detailDataQuery?.data || null;
  const [addChannel] = useAddNewChannelMutation();
  const [updateChannel] = useUpdateChannelMutation();
  const [deleteChannel] = useDeleteChannelMutation();

  const handleOnClick = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleSubmit = async (paramResult: ChannelList) => {
    if (isEditing) {
      try {
        const resp: any = await updateChannel({
          channel: paramResult,
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
        const resp = await addChannel({
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
      const resp = await deleteChannel({ id: selectedId }).unwrap();
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
      <Typography
        variant="h5"
        sx={{ fontWeight: '600', mb: toRem(16) }}
        gutterBottom
      >
        Channel
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Channel"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table
        data={dataRows}
        fieldOrderBy={'channel'}
        rowsPerpageCount={25}
        headCells={headCells}
        idActionName="id"
        isLoading={dataQuery.isLoading}
        onEditAction={handleEditData}
        onDeleteAction={handleDeleteData}
        onQuickSearch={handleQuickSearch}
      />
      <PopupFormAddChannel
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

export default ChannelPage;
