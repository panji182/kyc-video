'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetUserListQuery,
  useGetDetailUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/services/UserManagement';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormAddUser = dynamic(
  () => import('@/components/molecules/PopupFormAddUser')
);

import { toRem } from '@/helpers/globalFunctions';
import { UserList } from '@/types/api/UserManagement';

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
    id: 'username',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Username',
  },
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Fullname',
  },
  {
    id: 'extid',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Ext Id',
  },
  {
    id: 'roles',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Roles',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const ViewUsersPage = () => {
  const [search, setSearch] = useState<string>('');
  const dataQuery = useGetUserListQuery(
    { pageNo: 0, search },
    { refetchOnMountOrArgChange: true }
  );
  const dataRows = useMemo(() => {
    return (dataQuery?.data?.users || []).map(user => {
      return {
        ...user,
        roles: (user.roles || []).reduce((result, role, index) => {
          if (index !== user.roles.length - 1) {
            result += role + ',';
          } else {
            result += role;
          }
          return result;
        }, ''),
      };
    });
  }, [dataQuery?.data?.users]);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [notif, setNotif] = useState<any>(initNotif);
  const detailDataQuery = useGetDetailUserQuery(
    { id: selectedId },
    { refetchOnMountOrArgChange: true }
  );
  const detailData = detailDataQuery?.data || null;
  const [addUser] = useAddNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleOnClick = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleSubmit = async (paramResult: UserList) => {
    if (isEditing) {
      try {
        const resp: any = await updateUser({
          user: paramResult,
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
        const resp = await addUser({
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
      const resp = await deleteUser({ id: selectedId }).unwrap();
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
        User Lists
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create User"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table
        data={dataRows}
        fieldOrderBy={'firstName'}
        rowsPerpageCount={25}
        headCells={headCells}
        idActionName="id"
        isLoading={dataQuery.isLoading}
        onEditAction={handleEditData}
        onDeleteAction={handleDeleteData}
        onQuickSearch={handleQuickSearch}
      />
      <PopupFormAddUser
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

export default ViewUsersPage;
