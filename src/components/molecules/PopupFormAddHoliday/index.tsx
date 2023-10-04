'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';

import { toRem } from '@/helpers/globalFunctions';
import { HolidayInput } from '@/types/molecules/Holiday';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const DatePicker = dynamic(() => import('@/components/atoms/DatePicker'));

const initHolidayInput: HolidayInput = {
  name: '',
  startDate: null,
  endDate: null,
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

  const handleHolidayInput = (
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

  const handleInput = (value: string | Dayjs | null, name: string) => {
    setHolidayInput((prevState: HolidayInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmited({ ...holidayInput });
    onClosePopup();
  };

  return (
    <Modal open={open} title={'Create Holiday'} onClose={() => onClosePopup()}>
      <>
        <Grid container spacing={1} sx={styles.bottomSpace}>
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
                onChange={e => handleHolidayInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>Range</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl
              sx={{
                marginLeft: toRem(8),
                marginRight: toRem(8),
                maxWidth: toRem(200),
              }}
            >
              <FormLabel sx={{ mb: toRem(8) }}>From</FormLabel>
              <DatePicker
                value={holidayInput.startDate}
                onChange={newValue => handleInput(newValue, 'startDate')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl
              sx={{
                marginLeft: toRem(8),
                marginRight: toRem(8),
                maxWidth: toRem(200),
              }}
            >
              <FormLabel sx={{ mb: toRem(8) }}>To</FormLabel>
              <DatePicker
                value={holidayInput.endDate}
                onChange={newValue => handleInput(newValue, 'endDate')}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <ButtonComp
            label="Clear"
            variant="contained"
            color="error"
            onClick={handleClear}
          />
          <ButtonComp
            label="Submit"
            variant="contained"
            onClick={handleSubmit}
          />
        </Stack>
      </>
    </Modal>
  );
};

export default PopupFormAddHoliday;
