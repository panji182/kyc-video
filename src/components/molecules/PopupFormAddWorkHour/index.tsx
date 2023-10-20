'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';

import { toRem } from '@/helpers/globalFunctions';
import { WorkHourList } from '@/types/api/WorkHour';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const TimePicker = dynamic(() => import('@/components/atoms/TimePicker'));

interface daysType {
  name: string;
  label: string;
}

const days: daysType[] = [
  {
    name: 'mon',
    label: 'Monday',
  },
  {
    name: 'tue',
    label: 'Tuesday',
  },
  {
    name: 'wed',
    label: 'Wednesday',
  },
  {
    name: 'thu',
    label: 'Thursday',
  },
  {
    name: 'fri',
    label: 'Friday',
  },
  {
    name: 'sat',
    label: 'Saturday',
  },
  {
    name: 'sun',
    label: 'Sunday',
  },
];

const initWorkHourInput: WorkHourList = {
  id: '',
  workhourname: '',
  monstart: null,
  monend: null,
  tuestart: null,
  tueend: null,
  wedstart: null,
  wedend: null,
  thustart: null,
  thuend: null,
  fristart: null,
  friend: null,
  satstart: null,
  satend: null,
  sunstart: null,
  sunend: null,
};

type Props = {
  open: boolean;
  editedData: WorkHourList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: WorkHourList) => void;
  onClosePopup: () => void;
};

const PopupFormAddWorkHour = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const [workHourInput, setWorkHourInput] =
    useState<WorkHourList>(initWorkHourInput);

  useEffect(() => {
    if (editedData) {
      setWorkHourInput(() => {
        const weekDayValues = days.reduce((result: any, day) => {
          if (!result[`${day.name}start`]) result[`${day.name}start`] = null;
          if (!result[`${day.name}end`]) result[`${day.name}end`] = null;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const start: string =
            editedData[`${day.name}start` as keyof WorkHourList] ?? '';
          const startSplit = start.split(':');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const end: string =
            editedData[`${day.name}end` as keyof WorkHourList] ?? '';
          const endSplit = end.split(':');
          if (editedData[`${day.name}start` as keyof WorkHourList])
            result[`${day.name}start`] = dayjs()
              .set('hour', +startSplit[0])
              .set('minute', +startSplit[1])
              .set('second', 0);
          if (editedData[`${day.name}end` as keyof WorkHourList])
            result[`${day.name}end`] = dayjs()
              .set('hour', +endSplit[0])
              .set('minute', +endSplit[1])
              .set('second', 0);
          return result;
        }, {});
        return {
          id: editedData.id,
          workhourname: editedData.workhourname,
          ...weekDayValues,
        };
      });
    } else {
      setWorkHourInput(initWorkHourInput);
    }
  }, [editedData]);

  const handleClear = () => {
    setWorkHourInput({ ...initWorkHourInput });
  };

  const handleInput = (value: string | Dayjs | null, name: string) => {
    setWorkHourInput((prevState: WorkHourList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmited({ ...workHourInput });
    handleClear();
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit Work Hour` : `Create Work Hour`}
      onClose={() => onClosePopup()}
    >
      <>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="id"
              label="Id"
              formInput={true}
              placeholder="Enter Id"
              value={workHourInput.id}
              variant="outlined"
              onChange={val => handleInput(val, 'id')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="workhourname"
              label="Work Hour Name"
              formInput={true}
              placeholder="Enter Work Hour Name"
              value={workHourInput.workhourname}
              variant="outlined"
              onChange={val => handleInput(val, 'workhourname')}
            />
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
                      workHourInput[`${day.name}start` as keyof WorkHourList]
                    }
                    onChange={newValue =>
                      handleInput(newValue, `${day.name}start`)
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
                      workHourInput[`${day.name}end` as keyof WorkHourList]
                    }
                    onChange={newValue =>
                      handleInput(newValue, `${day.name}end`)
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
