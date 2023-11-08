import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';

import { EditedHolidays } from '@/types/api/Holiday';

import styles from './index.styles';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const DatePicker = dynamic(() => import('@/components/atoms/DatePicker'));

type Props = {
  index: number;
  name: string;
  date: string | Dayjs | null;
  nameError?: string;
  dateError?: string;
  setValues: (
    // eslint-disable-next-line no-unused-vars
    values: React.SetStateAction<EditedHolidays>,
    // eslint-disable-next-line no-unused-vars
    shouldValidate?: boolean
  ) => void;
};

const HolidayInputs = memo(
  ({ index, name, date, nameError, dateError, setValues }: Props) => {
    const handleInput = (
      index: number,
      value: string | Dayjs | null,
      name: string
    ) => {
      setValues((prevState: EditedHolidays) => {
        const detailHolidays = [...prevState.detailHolidays];
        detailHolidays[index] = {
          ...detailHolidays[index],
          [name]: value,
        };
        return {
          ...prevState,
          detailHolidays,
        };
      });
    };

    const handleDelete = (index: number) => {
      setValues((prevState: EditedHolidays) => {
        const detailHolidays = [...prevState.detailHolidays];
        detailHolidays.splice(index, 1);
        return {
          ...prevState,
          detailHolidays,
        };
      });
    };

    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextInput
            id="name"
            label="Name"
            formInput={true}
            placeholder="Enter Name"
            value={name}
            variant="outlined"
            onChange={val => handleInput(index, val, 'name')}
          />
          {nameError ? (
            <Typography sx={styles.textError}>{nameError}</Typography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={{ position: 'relative' }}>
            <DatePicker
              label="Date"
              value={date}
              onChange={newValue => handleInput(index, newValue, 'date')}
              slotProps={{ popper: { placement: 'top-start' } }}
            />
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
                  }}
                >
                  <ButtonComp
                    buttonIcon={<DeleteIcon />}
                    onClick={() => handleDelete(index)}
                    sx={{ color: '#d32f2f' }}
                  />
                </Stack>
              </Box>
            )}
          </Box>
          {dateError ? (
            <Typography sx={styles.textError}>{dateError}</Typography>
          ) : null}
        </Grid>
      </>
    );
  }
);

HolidayInputs.displayName = 'HolidayInputs';

export default HolidayInputs;
