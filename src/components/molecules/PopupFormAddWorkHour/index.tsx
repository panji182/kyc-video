'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { WorkHourList } from '@/types/api/WorkHour';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const WorkHourInputs = dynamic(
  () => import('@/components/atoms/WorkHour/WorkHourInputs')
);

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

const validationSchema = yup.object({
  workhourname: yup.string().max(30, 'Too Long!').required('Required !'),
  monstart: yup.object().required('Required !'),
  monend: yup.object().required('Required !'),
  tuestart: yup.object().required('Required !'),
  tueend: yup.object().required('Required !'),
  wedstart: yup.object().required('Required !'),
  wedend: yup.object().required('Required !'),
  thustart: yup.object().required('Required !'),
  thuend: yup.object().required('Required !'),
  fristart: yup.object().required('Required !'),
  friend: yup.object().required('Required !'),
  satstart: yup.object().required('Required !'),
  satend: yup.object().required('Required !'),
  sunstart: yup.object().required('Required !'),
  sunend: yup.object().required('Required !'),
});

const PopupFormAddWorkHour = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const formik = useFormik<WorkHourList>({
    initialValues: initWorkHourInput,
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmited({ ...values });
      onClosePopup();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (editedData) {
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
      formik.setValues({
        id: editedData.id,
        workhourname: editedData.workhourname,
        ...weekDayValues,
      });
    } else {
      formik.resetForm();
    }
  }, [editedData]);

  const handleClear = () => {
    formik.resetForm();
  };

  const handleInput = (value: string | Dayjs | null, name: string) => {
    formik.setValues((prevState: WorkHourList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = () => {
  //   onSubmited({ ...workHourInput });
  //   handleClear();
  //   onClosePopup();
  // };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit Work Hour` : `Create Work Hour`}
      onClose={() => onClosePopup()}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="workhourname"
              label="Work Hour Name"
              formInput={true}
              placeholder="Enter Work Hour Name"
              value={formik.values.workhourname}
              variant="outlined"
              onChange={val => handleInput(val, 'workhourname')}
            />
            {formik.errors.workhourname && formik.touched.workhourname ? (
              <Typography sx={styles.textError}>
                {formik.errors.workhourname}
              </Typography>
            ) : null}
          </Grid>
          {days.map((day: daysType, index) => {
            const fromTimeError =
              formik.errors[`${day.name}start` as keyof WorkHourList] &&
              formik.touched[`${day.name}start` as keyof WorkHourList]
                ? formik.errors[`${day.name}start` as keyof WorkHourList]
                : '';
            const toTimeError =
              formik.errors[`${day.name}end` as keyof WorkHourList] &&
              formik.touched[`${day.name}end` as keyof WorkHourList]
                ? formik.errors[`${day.name}end` as keyof WorkHourList]
                : '';
            return (
              <WorkHourInputs
                key={index}
                label={day.label}
                name={day.name}
                fromTime={
                  formik.values[`${day.name}start` as keyof WorkHourList]
                }
                toTime={formik.values[`${day.name}end` as keyof WorkHourList]}
                fromTimeError={fromTimeError}
                toTimeError={toTimeError}
                setValues={formik.setValues}
              />
            );
          })}
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <ButtonComp
            label="Clear"
            variant="contained"
            color="error"
            onClick={handleClear}
          />
          <ButtonComp label="Submit" type="submit" variant="contained" />
        </Stack>
      </form>
    </Modal>
  );
};

export default PopupFormAddWorkHour;
