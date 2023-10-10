'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';

import { toRem } from '@/helpers/globalFunctions';
import { HolidayInput } from '@/types/molecules/Holiday';

import styles from './index.styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const DatePicker = dynamic(() => import('@/components/atoms/DatePicker'));

const initHolidayInput: HolidayInput = {
  name: '',
  holidays: [
    {
      name: '',
      startDate: null,
      endDate: null,
    },
  ],
};

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: HolidayInput) => void;
  onClosePopup: () => void;
};

const PopupFormAddHoliday = ({ open, onSubmited, onClosePopup }: Props) => {
  const [holidayInput, setHolidayInput] =
    useState<HolidayInput>(initHolidayInput);

  const handleNameInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setHolidayInput((prevState: HolidayInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setHolidayInput({ ...initHolidayInput });
  };

  const handleArrHolidaysInput = (
    index: number,
    value: string | Dayjs | null,
    name: string
  ) => {
    setHolidayInput((prevState: HolidayInput) => {
      const prev = { ...prevState };
      const arr = [...prevState.holidays];
      arr[index] = {
        ...arr[index],
        [name]: value,
      };
      return {
        ...prev,
        holidays: arr,
      };
    });
  };

  const handleSubmit = () => {
    onSubmited({ ...holidayInput });
    onClosePopup();
  };

  const handleAddHoliday = () => {
    setHolidayInput((prevState: HolidayInput) => {
      const prev = { ...prevState };
      const arr = [...prevState.holidays];
      arr.push({
        name: '',
        startDate: null,
        endDate: null,
      });
      return {
        ...prev,
        holidays: arr,
      };
    });
  };

  const handleDeleteHoliday = (index: number) => {
    setHolidayInput((prevState: HolidayInput) => {
      const prev = { ...prevState };
      const arr = [...prevState.holidays];
      arr.splice(index, 1);
      return {
        ...prev,
        holidays: arr,
      };
    });
  };

  return (
    <Modal
      open={open}
      title={'Create Holiday'}
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="name" sx={styles.bottomSpace}>
                Name
              </FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Enter Name"
                value={holidayInput.name}
                variant="outlined"
                onChange={e => handleNameInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>Add Holidays</Typography>
          </Grid>
          {holidayInput.holidays.map((holiday, index) => (
            <>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl>
                  <FormLabel id="name" sx={styles.bottomSpace}>
                    Name
                  </FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Enter Holiday Name"
                    value={holiday.name}
                    variant="outlined"
                    onChange={e =>
                      handleArrHolidaysInput(index, e.target.value, 'name')
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>From</FormLabel>
                  <DatePicker
                    value={holiday.startDate}
                    onChange={newValue =>
                      handleArrHolidaysInput(index, newValue, 'startDate')
                    }
                    slotProps={{ popper: { placement: 'top-start' } }}
                  />
                </FormControl>
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
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>To</FormLabel>
                  <DatePicker
                    value={holiday.endDate}
                    onChange={newValue =>
                      handleArrHolidaysInput(index, newValue, 'endDate')
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
                        onClick={() => handleDeleteHoliday(index)}
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
              onClick={handleAddHoliday}
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
