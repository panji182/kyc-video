'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';

import { toRem } from '@/helpers/globalFunctions';
import {
  HolidayList,
  DetailHolidayList,
  EditedHolidays,
} from '@/types/api/Holiday';

import styles from './index.styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const DatePicker = dynamic(() => import('@/components/atoms/DatePicker'));

const initHolidayInput: HolidayList = {
  id: '',
  holidayname: '',
};

const initDetailHoliday: DetailHolidayList[] = [
  {
    id: '',
    name: '',
    date: null,
  },
];

type Props = {
  open: boolean;
  editedData: EditedHolidays | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: EditedHolidays) => void;
  onClosePopup: () => void;
};

const PopupFormAddHoliday = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const [holidayInput, setHolidayInput] =
    useState<HolidayList>(initHolidayInput);
  const [detailHolidayInput, setDetailHolidayInput] =
    useState<DetailHolidayList[]>(initDetailHoliday);

  useEffect(() => {
    if (editedData) {
      setHolidayInput(editedData.holiday);
      setDetailHolidayInput(() => {
        const detail: DetailHolidayList[] = editedData.detailHolidays
          ? editedData.detailHolidays.map(det => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const date: string = det.date || '';
              const dateEdited = date.split('-');
              return {
                ...det,
                date: dayjs()
                  .set('date', +dateEdited[2])
                  .set('month', +dateEdited[1])
                  .set('year', +dateEdited[0]),
              };
            })
          : [
              {
                id: '',
                name: '',
                date: null,
              },
            ];
        return detail;
      });
    } else {
      setHolidayInput(initHolidayInput);
      setDetailHolidayInput(initDetailHoliday);
    }
  }, [editedData]);

  // const handleHolidayInput = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { value, name } = e.target;

  //   setHolidayInput((prevState: HolidayList) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleHolidayInput = (value: string, name: string) => {
    setHolidayInput((prevState: HolidayList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setHolidayInput({ ...initHolidayInput });
    setDetailHolidayInput(initDetailHoliday);
  };

  const handleDetailHolidayInput = (
    index: number,
    value: string | Dayjs | null,
    name: string
  ) => {
    setDetailHolidayInput((prevState: DetailHolidayList[]) => {
      const arr = [...prevState];
      arr[index] = {
        ...arr[index],
        [name]: value,
      };
      return arr;
    });
  };

  const handleSubmit = () => {
    onSubmited({
      holiday: holidayInput,
      detailHolidays: detailHolidayInput,
    });
    handleClear();
    onClosePopup();
  };

  const handleAddDetailHoliday = () => {
    setDetailHolidayInput((prevState: DetailHolidayList[]) => {
      const arr = [...prevState];
      arr.push({
        id: '',
        name: '',
        date: null,
      });
      return arr;
    });
  };

  const handleDeleteDetailHoliday = (index: number) => {
    setDetailHolidayInput((prevState: DetailHolidayList[]) => {
      const arr = [...prevState];
      arr.splice(index, 1);
      return arr;
    });
  };

  return (
    <Modal
      open={open}
      title={editedData ? 'Edit Holiday' : 'Create Holiday'}
      onClose={() => onClosePopup()}
      sx={(theme: any) => ({
        '&.MuiModal-root>.MuiBox-root': {
          width: toRem(750),
        },
        [theme.breakpoints.down('md')]: {
          '&.MuiModal-root>.MuiBox-root': {
            width: '80%',
          },
        },
      })}
    >
      <>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextInput
              id="id"
              label="Id"
              formInput={true}
              placeholder="Enter Id"
              value={holidayInput.id}
              variant="outlined"
              onChange={val => handleHolidayInput(val, 'id')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextInput
              id="holidayname"
              label="Holiday Name"
              formInput={true}
              placeholder="Enter Holiday Name"
              value={holidayInput.holidayname}
              variant="outlined"
              onChange={val => handleHolidayInput(val, 'holidayname')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>Add Holidays</Typography>
          </Grid>
          {(detailHolidayInput || []).map((detailHoliday, index) => (
            <>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextInput
                  id="id"
                  label="Id"
                  formInput={true}
                  placeholder="Enter Id"
                  value={detailHoliday.id}
                  variant="outlined"
                  onChange={val => handleDetailHolidayInput(index, val, 'id')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextInput
                  id="name"
                  label="Name"
                  formInput={true}
                  placeholder="Enter Name"
                  value={detailHoliday.name}
                  variant="outlined"
                  onChange={val => handleDetailHolidayInput(index, val, 'name')}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                sx={styles.containerButtonDeleteRow}
              >
                <FormControl
                  sx={{
                    margin: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(16) }}>Date</FormLabel>
                  <DatePicker
                    value={detailHoliday.date}
                    onChange={newValue =>
                      handleDetailHolidayInput(index, newValue, 'date')
                    }
                    slotProps={{ popper: { placement: 'top-start' } }}
                  />
                </FormControl>
                {index !== 0 && (
                  <Box
                    sx={(theme: any) => ({
                      ...styles.buttonDeleteRowBox,
                      [theme.breakpoints.down('md')]: {
                        ...styles.buttonDeleteRowBoxResponsive,
                      },
                    })}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        height: '100%',
                        marginTop: toRem(16),
                      }}
                    >
                      <ButtonComp
                        buttonIcon={<DeleteIcon />}
                        onClick={() => handleDeleteDetailHoliday(index)}
                        sx={{ color: '#d32f2f' }}
                      />
                    </Stack>
                  </Box>
                )}
              </Grid>
            </>
          ))}
        </Grid>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <ButtonComp
              label="Add"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDetailHoliday}
            />
          </Box>
          <Box>
            <ButtonComp
              label="Clear"
              variant="contained"
              color="error"
              onClick={handleClear}
              sx={{ marginRight: toRem(16) }}
            />
            <ButtonComp
              label="Submit"
              variant="contained"
              onClick={handleSubmit}
            />
          </Box>
        </Stack>
      </>
    </Modal>
  );
};

export default PopupFormAddHoliday;
