import React, { memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';

import { WorkHourList } from '@/types/api/WorkHour';

import styles from './index.styles';

const TimePicker = dynamic(() => import('@/components/atoms/TimePicker'));

type Props = {
  label: string;
  name: string;
  fromTime: string | Dayjs | null;
  toTime: string | Dayjs | null;
  fromTimeError?: string;
  toTimeError?: string;
  setValues: (
    // eslint-disable-next-line no-unused-vars
    values: React.SetStateAction<WorkHourList>,
    // eslint-disable-next-line no-unused-vars
    shouldValidate?: boolean
  ) => void;
};

const WorkHourInputs = memo(
  ({
    label,
    name,
    fromTime,
    toTime,
    fromTimeError,
    toTimeError,
    setValues,
  }: Props) => {
    const minTime = useMemo(() => {
      const hour = dayjs(fromTime).hour();
      const minute = dayjs(fromTime).minute();
      return dayjs().set('hour', hour).set('minute', minute).set('second', 0);
    }, [fromTime]);
    const maxTime = useMemo(() => {
      const hour = dayjs(toTime).hour();
      const minute = dayjs(toTime).minute();
      return dayjs().set('hour', hour).set('minute', minute).set('second', 0);
    }, [toTime]);

    const handleInputFrom = (value: Dayjs | null) => {
      setValues((prevState: WorkHourList) => ({
        ...prevState,
        [`${name}start`]: value,
      }));
    };

    const handleInputTo = (value: Dayjs | null) => {
      setValues((prevState: WorkHourList) => ({
        ...prevState,
        [`${name}end`]: value,
      }));
    };

    return (
      <>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TimePicker
            label="From"
            value={fromTime}
            onChange={newValue => handleInputFrom(newValue)}
            maxTime={maxTime}
          />
          {fromTimeError ? (
            <Typography sx={styles.textError}>{fromTimeError}</Typography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TimePicker
            label="To"
            value={toTime}
            onChange={newValue => handleInputTo(newValue)}
            minTime={minTime}
          />
          {toTimeError ? (
            <Typography sx={styles.textError}>{toTimeError}</Typography>
          ) : null}
        </Grid>
      </>
    );
  }
);

WorkHourInputs.displayName = 'WorkHourInputs';

export default WorkHourInputs;
