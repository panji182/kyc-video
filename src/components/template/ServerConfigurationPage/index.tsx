'use client';

import { useState, useEffect, createContext, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import isEqual from 'lodash/isEqual';
import differenceBy from 'lodash/differenceBy';
import { HeadCell } from '@/types/atoms/table';
import {
  useGetServerConfigurationListQuery,
  useAddNewServerConfigurationMutation,
  useUpdateServerConfigurationMutation,
} from '@/services/ServerConfiguration';
import { adminLayoutContext } from '@/components/template/Layouts/AdminLayout';

const CollapsableTable = dynamic(
  () => import('@/components/atoms/CollapsableTable')
);
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const Snackbar = dynamic(() => import('@/components/atoms/SnackBar'));
const PopupFormConfiguration = dynamic(
  () => import('@/components/molecules/PopupFormConfiguration')
);

import { toRem } from '@/helpers/globalFunctions';
import { ServerConfiguration } from '@/types/template/ServerConfiguration';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export const updatedDataContext = createContext<any>({});

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    show: false,
    label: '',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Name',
  },
  {
    id: 'section',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Section',
  },
  {
    id: 'key',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Key',
  },
  {
    id: 'value',
    numeric: false,
    disablePadding: false,
    show: true,
    label: 'Value',
  },
];

const initNotif = {
  show: false,
  message: '',
  severity: 'success',
};

const ServerConfiguration = () => {
  const dataQuery = useGetServerConfigurationListQuery({ pageNo: 0 });
  const dataRows = dataQuery?.data?.config || [];
  const [open, setOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);
  const [notif, setNotif] = useState<any>(initNotif);
  const [datas, setDatas] = useState<any[]>([]);
  const originalData = useRef<any[]>([]);
  const [editedData, setEditedData] = useState<any>({});
  const [formMode, setFormMode] = useState<string>('New');
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [resetTable, setResetTable] = useState<number>(0);
  const { setAlertPage } = useContext(adminLayoutContext);

  const [addServerConfiguration] = useAddNewServerConfigurationMutation();
  const [updateServerConfiguration] = useUpdateServerConfigurationMutation();

  useEffect(() => {
    const mappedRows = dataRows.map((d, index) => ({
      id: index + 1,
      name: `${d.section}\\${d.optionname}`,
      section: d.section,
      key: d.optionname,
      value: d.optionvalue,
    }));
    if (mappedRows.length > 0) {
      setDatas(mappedRows);
      originalData.current = [...mappedRows];
    }
  }, [dataRows]);

  useEffect(() => {
    if (!isEqual(datas, originalData.current)) {
      setAlertPage(true);
    } else {
      setAlertPage(false);
    }
  }, [datas]);

  const handleOnDelete = () => {
    setConfirmDelete(true);
  };

  const handleOnAdd = () => {
    setFormMode('New');
    setOpen(true);
  };

  const handleCancel = () => {
    setConfirmCancel(true);
  };

  const handleSave = async () => {
    if (
      !isEqual(datas, originalData.current) &&
      datas.length > originalData.current.length
    ) {
      const newData = differenceBy(datas, originalData.current, 'name');
      try {
        const resp = await addServerConfiguration({
          config: newData.map(d => ({
            section: d.section,
            optionname: d.key,
            optionvalue: d.value,
          })),
        }).unwrap();
        originalData.current = [...datas];
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
    } else if (!isEqual(datas, originalData.current)) {
      try {
        const resp = await updateServerConfiguration({
          config: datas.map(d => ({
            section: d.section,
            optionname: d.key,
            optionvalue: d.value,
          })),
        }).unwrap();
        originalData.current = [...datas];
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
      setNotif({
        show: true,
        message: 'No updated configuration to save !',
        severity: 'error',
      });
    }
  };

  const handleGetSelectedData = (selected: any[]) => {
    setSelectedData(selected);
  };

  const handleSubmit = (paramResult: ServerConfiguration) => {
    if (formMode === 'New') {
      setDatas((prevState: any[]) => {
        const prev = [...prevState];
        prev.push({
          id: prev.length + 1,
          name: `${paramResult.section}\\${paramResult.key}`,
          section: paramResult.section,
          key: paramResult.key,
          value: paramResult.value,
        });

        return prev;
      });
    } else {
      setDatas((prevState: any[]) => {
        const prev = [...prevState];
        const currDataIdx = prev.findIndex(d => d.id === editedData.id);
        if (currDataIdx !== -1) {
          prev[currDataIdx] = {
            ...prev[currDataIdx],
            name: `${paramResult.section}\\${paramResult.key}`,
            section: paramResult.section,
            key: paramResult.key,
            value: paramResult.value,
          };
        }

        return prev;
      });
    }
    setResetTable(Math.random());
  };

  const handleOkDelete = () => {
    const selectDelete = selectedData.reduce((result, d) => {
      result.push(d.name);
      return result;
    }, []);
    setDatas((prevState: any[]) =>
      prevState.filter((d: any) => !selectDelete.includes(d.name))
    );
    setResetTable(Math.random());
  };

  const handleCancelDelete = () => {
    console.log('Canceling Delete !');
  };

  const handleOkCancelConfig = () => {
    setDatas(originalData.current);
    setResetTable(Math.random());
  };

  const handleCancelConfig = () => {
    console.log('Canceling Cancel Config !');
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Server Configuration
      </Typography>
      <Stack direction="row" gap={2} mb={toRem(24)} justifyContent="flex-end">
        <Button
          label="Delete"
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={selectedData.length < 1}
          onClick={handleOnDelete}
        />
        <Button
          label="Add"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOnAdd}
        />
      </Stack>
      <updatedDataContext.Provider
        value={{
          editedData,
          setEditedData,
          setOpenEditor: setOpen,
          usedMode: setFormMode,
        }}
      >
        <CollapsableTable
          key={resetTable}
          data={datas}
          fieldOrderBy={'name'}
          rowsPerpageCount={25}
          headCells={headCells}
          onGetSelectedData={handleGetSelectedData}
        />
        <Stack direction="row" mb={toRem(24)} justifyContent="space-between">
          <Button
            label="Cancel"
            variant="contained"
            color="error"
            onClick={handleCancel}
          />
          <Button
            label="Save"
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={handleSave}
          />
        </Stack>
        <PopupFormConfiguration
          open={open}
          mode={formMode}
          onSubmited={handleSubmit}
          onClosePopup={() => setOpen(false)}
        />
      </updatedDataContext.Provider>
      <Dialog
        open={confirmDelete}
        title={'Confirm Delete'}
        description={'Are you sure want to delete selected item !?'}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        onClose={() => setConfirmDelete(false)}
      />
      <Dialog
        open={confirmCancel}
        title={'Confirm Cancel'}
        description={
          'Are you sure want to Cancel !?, all your added, edited, and deleted configuration(s) will be restored !'
        }
        onOk={handleOkCancelConfig}
        onCancel={handleCancelConfig}
        onClose={() => setConfirmCancel(false)}
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

export default ServerConfiguration;
