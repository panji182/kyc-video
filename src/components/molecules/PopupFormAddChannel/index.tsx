'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ChannelList } from '@/types/api/Channel';
import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));

const validationSchema = yup.object({
  channel: yup.string().max(30, 'Too Long!').required('Required !'),
  name: yup.string().max(30, 'Too Long!').required('Required !'),
});

const initChannelInput: ChannelList = {
  id: '',
  channel: '',
  name: '',
};

type Props = {
  open: boolean;
  editedData: ChannelList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: ChannelList) => void;
  onClosePopup: () => void;
};

const PopupFormAddChannel = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const formik = useFormik<ChannelList>({
    initialValues: initChannelInput,
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmited({ ...values });
      onClosePopup();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (editedData) {
      formik.setValues(editedData);
    } else {
      formik.resetForm();
    }
  }, [editedData]);

  const handleInput = (value: string, name: string) => {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const handleClear = () => {
    formik.resetForm();
  };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit Channel` : `Create Channel`}
      onClose={() => onClosePopup()}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="channel"
              label="Channel"
              formInput={true}
              placeholder="Enter Channel"
              value={formik.values.channel}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.channel && Boolean(formik.errors.channel)}
              onChange={val => handleInput(val, 'channel')}
            />
            {formik.errors.channel && formik.touched.channel ? (
              <Typography sx={styles.textError}>
                {formik.errors.channel}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="name"
              label="Name"
              formInput={true}
              placeholder="Enter Name"
              value={formik.values.name}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              onChange={val => handleInput(val, 'name')}
            />
            {formik.errors.name && formik.touched.name ? (
              <Typography sx={styles.textError}>
                {formik.errors.name}
              </Typography>
            ) : null}
          </Grid>
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

export default PopupFormAddChannel;
