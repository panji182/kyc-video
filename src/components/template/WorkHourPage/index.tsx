'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetWorkHourListQuery,
  useGetDetailWorkHourQuery,
  useAddNewWorkHourMutation,
  useUpdateWorkHourMutation,
  useDeleteWorkHourMutation,
} from '@/services/WorkHour';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormAddWorkHour = dynamic(
  () => import('@/components/molecules/PopupFormAddWorkHour')
);

import { toRem } from '@/helpers/globalFunctions';
import { WorkHourList } from '@/types/api/WorkHour';

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
    id: 'workhourname',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Work Hour Name',
  },
  {
    id: 'monday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Monday',
  },
  {
    id: 'tuesday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Tuesday',
  },
  {
    id: 'wednesday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Wednesday',
  },
  {
    id: 'thursday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Thursday',
  },
  {
    id: 'friday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Friday',
  },
  {
    id: 'saturday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Saturday',
  },
  {
    id: 'sunday',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Sunday',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const WorkHourPage = () => {
  const [search, setSearch] = useState<string>('');
  const dataQuery = useGetWorkHourListQuery(
    { pageNo: 0, search },
    { refetchOnMountOrArgChange: true }
  );
  const dataRows = useMemo(() => {
    return (dataQuery?.data?.workinghours || []).map(wh => {
      return {
        ...wh,
        monday: `${wh.monstart || ''} - ${wh.monend || ''}`,
        tuesday: `${wh.tuestart || ''} - ${wh.tueend || ''}`,
        wednesday: `${wh.wedstart || ''} - ${wh.wedend || ''}`,
        thursday: `${wh.thustart || ''} - ${wh.thuend || ''}`,
        friday: `${wh.fristart || ''} - ${wh.friend || ''}`,
        saturday: `${wh.satstart || ''} - ${wh.satend || ''}`,
        sunday: `${wh.sunstart || ''} - ${wh.sunend || ''}`,
      };
    });
  }, [dataQuery?.data?.workinghours]);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [notif, setNotif] = useState<any>(initNotif);
  const detailDataQuery = useGetDetailWorkHourQuery(
    { id: selectedId },
    { refetchOnMountOrArgChange: true }
  );
  const detailData = detailDataQuery?.data || null;
  const [addWorkHour] = useAddNewWorkHourMutation();
  const [updateWorkHour] = useUpdateWorkHourMutation();
  const [deleteWorkHour] = useDeleteWorkHourMutation();

  const handleOnClick = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleSubmit = async (paramResult: WorkHourList) => {
    if (isEditing) {
      try {
        const resp: any = await updateWorkHour({
          workinghours: paramResult,
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
        const resp = await addWorkHour({
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
      const resp = await deleteWorkHour({ id: selectedId }).unwrap();
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
        Work Hour
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Work Hour"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table
        data={dataRows}
        fieldOrderBy={'workhourname'}
        headCells={headCells}
        idActionName="id"
        onEditAction={handleEditData}
        onDeleteAction={handleDeleteData}
        onQuickSearch={handleQuickSearch}
      />
      <PopupFormAddWorkHour
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

export default WorkHourPage;
