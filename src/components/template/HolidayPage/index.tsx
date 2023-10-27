'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetHolidayListQuery,
  useGetDetailHolidayQuery,
  useAddNewHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useLazyGetDetailHolidayListQuery,
  useAddNewDetailHolidayMutation,
  useUpdateDetailHolidayMutation,
} from '@/services/Holiday';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormAddHoliday = dynamic(
  () => import('@/components/molecules/PopupFormAddHoliday')
);

import { toRem } from '@/helpers/globalFunctions';
import {
  HolidayList,
  DetailHolidayList,
  EditedHolidays,
} from '@/types/api/Holiday';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Name',
  },
  {
    id: 'holidayName',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Holiday Name',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Date',
  },
  {
    id: 'idHoliday',
    numeric: false,
    disablePadding: false,
    show: false,
    label: '',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const HolidayPage = () => {
  const [search, setSearch] = useState<string>('');
  const dataQuery = useGetHolidayListQuery(
    { pageNo: 0, search },
    { refetchOnMountOrArgChange: true }
  );
  const dataRows = dataQuery?.data?.holidays || [];
  const [detailHolidayList] = useLazyGetDetailHolidayListQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any | null>(null);
  const [notif, setNotif] = useState<any>(initNotif);
  const detailDataQuery = useGetDetailHolidayQuery(
    { id: selectedId },
    { refetchOnMountOrArgChange: true }
  );
  const [detailData, setDetailData] = useState<EditedHolidays | null>(null);
  const [addHoliday] = useAddNewHolidayMutation();
  const [updateHoliday] = useUpdateHolidayMutation();
  const [deleteHoliday] = useDeleteHolidayMutation();
  const [addDetailHoliday] = useAddNewDetailHolidayMutation();
  const [updateDetailHoliday] = useUpdateDetailHolidayMutation();

  useEffect(() => {
    dataRows.forEach(async d => {
      const finalResult: any[] = [];
      finalResult.push({
        id: d.id,
        name: d.holidayname,
        holidayName: null,
        date: null,
        idHoliday: d.id,
      });
      const detailDataProm: any = await detailHolidayList({
        holidayId: d.id,
      }).unwrap();
      (detailDataProm.holidays || []).forEach((detailProm: any) => {
        finalResult.push({
          id: null,
          name: null,
          holidayName: detailProm.name,
          date: detailProm.date,
          idHoliday: null,
        });
      });
      setData((prevState: any[]) => {
        let prev = [...prevState];
        prev = prev.concat(finalResult);
        return prev;
      });
    });
  }, [dataRows]);

  const getDetailData = async (detailHoliday?: HolidayList) => {
    const finalResult: DetailHolidayList[] = [];
    const detailDataProm: any = await detailHolidayList({
      holidayId: detailHoliday ? detailHoliday.id : '',
    }).unwrap();
    (detailDataProm.holidays || []).forEach((detailProm: any) => {
      finalResult.push({ ...detailProm });
    });
    setDetailData({
      holiday: detailHoliday || {
        id: '',
        holidayname: '',
      },
      detailHolidays: finalResult,
    });
  };

  useEffect(() => {
    getDetailData(detailDataQuery?.data);
  }, [detailDataQuery?.data]);

  const handleOnClick = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleSubmit = async (paramResult: EditedHolidays) => {
    if (isEditing) {
      try {
        const resp: any = await updateHoliday({
          holiday: paramResult.holiday,
        }).unwrap();
        const respDetail: any = await updateDetailHoliday({
          holidayid: paramResult.holiday.id,
          holidays: paramResult.detailHolidays,
        }).unwrap();
        setNotif({
          show: true,
          message: resp.message,
          severity: resp.status === 'Success' ? 'success' : 'error',
        });
        setNotif({
          show: true,
          message: respDetail.message,
          severity: respDetail.status === 'Success' ? 'success' : 'error',
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
        const resp = await addHoliday({
          ...paramResult.holiday,
        }).unwrap();
        console.log(196, {
          holidayid: paramResult.holiday.id,
          holidays: paramResult.detailHolidays,
        });
        const respDetail = await addDetailHoliday({
          holidayid: paramResult.holiday.id,
          holidays: paramResult.detailHolidays,
        }).unwrap();
        setNotif({
          show: true,
          message: resp.message,
          severity: resp.status === 'Success' ? 'success' : 'error',
        });
        setNotif({
          show: true,
          message: respDetail.message,
          severity: respDetail.status === 'Success' ? 'success' : 'error',
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
    setSelectedId(data.idHoliday);
    setOpen(true);
  };

  const handleDeleteData = (id: any) => {
    setSelectedId(id);
    setConfirmDelete(true);
  };

  const handleOkDelete = async () => {
    try {
      const resp = await deleteHoliday({ id: selectedId }).unwrap();
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
        Holiday
      </Typography>
      <Stack direction="row" mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Create Holiday"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnClick}
        />
      </Stack>
      <Table
        data={data}
        fieldOrderBy={''}
        rowsPerpageCount={25}
        headCells={headCells}
        idActionName="id"
        onQuickSearch={handleQuickSearch}
        customActionButton={(fields: any) => {
          return fields.name ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => handleEditData(fields)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleDeleteData(fields.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : null;
        }}
      />
      <PopupFormAddHoliday
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

export default HolidayPage;
