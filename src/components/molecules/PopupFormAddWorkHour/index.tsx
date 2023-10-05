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
import { WorkHourInput } from '@/types/molecules/WorkHour';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TimePicker = dynamic(() => import('@/components/atoms/TimePicker'));

interface daysType {
  name: string;
  label: string;
}

const days: daysType[] = [
  {
    name: 'monday',
    label: 'Monday',
  },
  {
    name: 'tuesday',
    label: 'Tuesday',
  },
  {
    name: 'wednesday',
    label: 'Wednesday',
  },
  {
    name: 'thursday',
    label: 'Thursday',
  },
  {
    name: 'friday',
    label: 'Friday',
  },
  {
    name: 'saturday',
    label: 'Saturday',
  },
  {
    name: 'sunday',
    label: 'Sunday',
  },
];

const initWorkHourInput: WorkHourInput = {
  name: '',
  mondayFrom: null,
  mondayTo: null,
  tuesdayFrom: null,
  tuesdayTo: null,
  wednesdayFrom: null,
  wednesdayTo: null,
  thursdayFrom: null,
  thursdayTo: null,
  fridayFrom: null,
  fridayTo: null,
  saturdayFrom: null,
  saturdayTo: null,
  sundayFrom: null,
  sundayTo: null,
};

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: WorkHourInput) => void;
  onClosePopup: () => void;
};

const PopupFormAddWorkHour = ({ open, onSubmited, onClosePopup }: Props) => {
  const [workHourInput, setWorkHourInput] =
    useState<WorkHourInput>(initWorkHourInput);

  const handleWorkHourInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setWorkHourInput((prevState: WorkHourInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setWorkHourInput({ ...initWorkHourInput });
  };

  const handleInput = (value: string | Dayjs | null, name: string) => {
    setWorkHourInput((prevState: WorkHourInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmited({ ...workHourInput });
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={'Create Work Hour'}
      onClose={() => onClosePopup()}
    >
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
                value={workHourInput.name}
                variant="outlined"
                onChange={e => handleWorkHourInput(e)}
              />
            </FormControl>
          </Grid>
          {days.map((day: daysType) => (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>{day.label}</Typography>
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
                  <TimePicker
                    value={
                      workHourInput[`${day.name}From` as keyof WorkHourInput]
                    }
                    onChange={newValue =>
                      handleInput(newValue, `${day.name}From`)
                    }
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
                  <TimePicker
                    value={
                      workHourInput[`${day.name}To` as keyof WorkHourInput]
                    }
                    onChange={newValue =>
                      handleInput(newValue, `${day.name}To`)
                    }
                  />
                </FormControl>
              </Grid>
            </>
          ))}
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

export default PopupFormAddWorkHour;
