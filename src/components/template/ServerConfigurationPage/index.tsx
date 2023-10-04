'use client';

import { useState, createContext } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HeadCell } from '@/types/atoms/table';

const CollapsableTable = dynamic(
  () => import('@/components/atoms/CollapsableTable')
);
const Button = dynamic(() => import('@/components/atoms/Button'));
const Dialog = dynamic(() => import('@/components/atoms/Dialog'));
const PopupFormConfiguration = dynamic(
  () => import('@/components/molecules/PopupFormConfiguration')
);

import { toRem } from '@/helpers/globalFunctions';
import { ServerConfiguration } from '@/types/template/ServerConfiguration';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export const updatedDataContext = createContext<any>({});

const dataRows = [
  {
    id: 1,
    name: 'Section2\\Key1',
    section: 'Section2',
    key: 'Key1',
    value: 'config1',
  },
  {
    id: 2,
    name: 'Section2\\Key2',
    section: 'Section2',
    key: 'Key2',
    value: 'config2',
  },
  {
    id: 3,
    name: 'Section1\\Key1',
    section: 'Section1',
    key: 'Key1',
    value: 'config1',
  },
  {
    id: 4,
    name: 'Section1\\Key2',
    section: 'Section1',
    key: 'Key2',
    value: 'config2',
  },
];

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'section',
    numeric: false,
    disablePadding: false,
    label: 'Section',
  },
  {
    id: 'key',
    numeric: false,
    disablePadding: false,
    label: 'Key',
  },
  {
    id: 'value',
    numeric: false,
    disablePadding: false,
    label: 'Value',
  },
];

const ServerConfiguration = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [datas, setDatas] = useState<any[]>(dataRows);
  const [editedData, setEditedData] = useState<any>({});
  const [formMode, setFormMode] = useState<string>('New');
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [resetTable, setResetTable] = useState<number>(0);

  const handleOnDelete = () => {
    setConfirmDelete(true);
  };

  const handleOnAdd = () => {
    setFormMode('New');
    setOpen(true);
  };

  const handleOnCancel = () => {
    alert('Canceled !!');
  };

  const handleOnSave = () => {
    alert('Data saved !!');
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
        if (currDataIdx) {
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
      result.push(d.id);
      return result;
    }, []);
    setDatas(datas.filter(d => !selectDelete.includes(d.id)));
    setResetTable(Math.random());
  };

  const handleCancelDelete = () => {
    console.log('Cancel Deleted !');
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
          headCells={headCells}
          onGetSelectedData={handleGetSelectedData}
        />
        <Stack direction="row" mb={toRem(24)} justifyContent="space-between">
          <Button
            label="Cancel"
            variant="contained"
            color="error"
            onClick={handleOnCancel}
          />
          <Button
            label="Save"
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={handleOnSave}
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
    </>
  );
};

export default ServerConfiguration;
