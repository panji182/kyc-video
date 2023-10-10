'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HeadCell } from '@/types/atoms/table';

const Table = dynamic(() => import('@/components/atoms/Table'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const PopupFormAddHoliday = dynamic(
  () => import('@/components/molecules/PopupFormAddHoliday')
);

import { toRem } from '@/helpers/globalFunctions';
import { HolidayInput } from '@/types/molecules/Holiday';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const dataRows = [
  {
    name: 'Bandung Holiday',
    holidayName: 'Mualid Nabi',
    startDate: '2023-09-28',
    endDate: '2023-09-28',
  },
  {
    name: 'Bandung Holiday',
    holidayName: 'Hari buruh Nasional',
    startDate: '2023-09-01',
    endDate: '2023-09-01',
  },
  {
    name: 'Bali Holiday',
    holidayName: 'Hari Raya Galungan',
    startDate: '2023-09-08',
    endDate: '2023-09-09',
  },
  {
    name: 'Bali Holiday',
    holidayName: 'Hari Raya Nyepi',
    startDate: '2023-09-20',
    endDate: '2023-09-25',
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
    id: 'holidayName',
    numeric: false,
    disablePadding: false,
    label: 'Holiday Name',
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Holiday',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Holiday',
  },
];

const HolidayPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClick = () => {
    setOpen(true);
  };

  const handleSubmit = (paramResult: HolidayInput) => {
    console.log(21, paramResult);
  };

  const rowGrouping = (p_data: any[]) => {
    const groupObject = p_data.reduce((result: any, d) => {
      if (!result[d.name]) result[d.name] = [];
      result[d.name].push(d);
      return result;
    }, {});
    let finalResult: any[] = [];
    Object.keys(groupObject).forEach(d => {
      finalResult.push({
        name: d,
        holidayName: null,
        startDate: null,
        endDate: null,
      });
      const rows = groupObject[d].map((row: any) => ({
        name: null,
        holidayName: row.holidayName,
        startDate: row.startDate,
        endDate: row.endDate,
      }));
      finalResult = finalResult.concat(rows);
    });
    return finalResult;
  };
  const data = rowGrouping(dataRows);

  const handleEdit = (holidayName: string) => {
    console.log(114, `${holidayName} is edited !`);
  };

  const handleDelete = (holidayName: any) => {
    console.log(118, `${holidayName} is deleted !`);
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
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
        headCells={headCells}
        isSortable={false}
        customActionButton={(fields: any) => {
          return !fields.name ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => handleEdit(fields.holidayName)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleDelete(fields.holidayName)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : null;
        }}
      />
      <PopupFormAddHoliday
        open={open}
        onSubmited={handleSubmit}
        onClosePopup={() => setOpen(false)}
      />
    </>
  );
};

export default HolidayPage;
