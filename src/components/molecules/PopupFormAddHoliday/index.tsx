'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { toRem } from '@/helpers/globalFunctions';
import {
  HolidayList,
  DetailHolidayList,
  EditedHolidays,
} from '@/types/api/Holiday';

import styles from './index.styles';
import AddIcon from '@mui/icons-material/Add';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const HolidayInputs = dynamic(
  () => import('@/components/atoms/Holiday/HolidayInputs')
);

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

const validationSchema = yup.object({
  holiday: yup.object().shape({
    holidayname: yup.string().max(30, 'Too Long!').required('Required !'),
  }),
  detailHolidays: yup.array().of(
    yup.object().shape({
      name: yup.string().max(30, 'Too Long!').required('Required !'),
      date: yup.object().required('Required !'),
    })
  ),
});

const PopupFormAddHoliday = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const formik = useFormik<EditedHolidays>({
    initialValues: {
      holiday: {
        ...initHolidayInput,
      },
      detailHolidays: [...initDetailHoliday],
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmited({
        holiday: values.holiday,
        detailHolidays: values.detailHolidays,
      });
      onClosePopup();
      formik.resetForm();
    },
  });
  const holidayNameTouched =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    formik.touched.holidayname ?? formik.touched.holiday?.holidayname;

  useEffect(() => {
    if (editedData) {
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
      formik.setValues({
        holiday: editedData.holiday,
        detailHolidays: [...detail],
      });
    } else {
      formik.resetForm();
    }
  }, [editedData]);

  const handleHolidayInput = (value: string, name: string) => {
    formik.setValues((prevState: EditedHolidays) => {
      const holiday = { ...prevState.holiday };
      return {
        ...prevState,
        holiday: {
          ...holiday,
          [name]: value,
        },
      };
    });
  };

  const handleClear = () => {
    formik.resetForm();
  };

  const handleAddDetailHoliday = () => {
    formik.setValues((prevState: EditedHolidays) => {
      const detailHolidays = [...prevState.detailHolidays];
      detailHolidays.push({
        id: '',
        name: '',
        date: null,
      });
      return {
        ...prevState,
        detailHolidays,
      };
    });
  };

  return (
    <Modal
      open={open}
      title={editedData ? 'Edit Holiday' : 'Create Holiday'}
      onClose={() => onClosePopup()}
      sx={{
        '&.MuiModal-root>.MuiBox-root': {
          width: '38vw',
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="holidayname"
              label="Holiday Name"
              formInput={true}
              placeholder="Enter Holiday Name"
              value={formik.values.holiday.holidayname}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={
                holidayNameTouched &&
                Boolean(formik.errors.holiday?.holidayname)
              }
              onChange={val => handleHolidayInput(val, 'holidayname')}
            />
            {formik.errors.holiday?.holidayname && holidayNameTouched ? (
              <Typography sx={styles.textError}>
                {formik.errors.holiday?.holidayname}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>Add Holidays</Typography>
          </Grid>
          {(formik.values.detailHolidays || []).map((detailHoliday, index) => {
            let detailHolidaysErrors: any;
            if (formik.errors.detailHolidays) {
              detailHolidaysErrors = formik.errors.detailHolidays[index];
            }
            let detailHolidaysTouched: any;
            if (formik.touched.detailHolidays) {
              detailHolidaysTouched = formik.touched.detailHolidays[index];
            }
            const nameError =
              detailHolidaysErrors?.name && detailHolidaysTouched?.name
                ? detailHolidaysErrors.name
                : '';
            const dateError =
              detailHolidaysErrors?.date && detailHolidaysTouched?.date
                ? detailHolidaysErrors.date
                : '';
            return (
              <HolidayInputs
                key={index}
                index={index}
                name={detailHoliday.name}
                date={detailHoliday.date}
                nameError={nameError}
                dateError={dateError}
                setValues={formik.setValues}
              />
            );
          })}
        </Grid>
        <Stack direction="row" justifyContent="space-between" gap={2}>
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
            <ButtonComp label="Submit" type="submit" variant="contained" />
          </Box>
        </Stack>
      </form>
    </Modal>
  );
};

export default PopupFormAddHoliday;
