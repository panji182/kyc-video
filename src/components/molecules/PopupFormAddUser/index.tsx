'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { UserList } from '@/types/api/UserManagement';
import styles from './index.styles';
import { Roles } from '@/consts';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));

//.number().typeError('Input must be a number')
const validationSchema = yup.object({
  username: yup.string().max(30, 'Too Long!').required('Required !'),
  fullname: yup.string().max(30, 'Too Long!').required('Required !'),
  extid: yup
    .number()
    .typeError('Input must be a number')
    .max(999, 'Max 999')
    .required('Required !'),
});

const initUserInput: UserList = {
  id: '',
  username: '',
  fullname: '',
  extid: '',
  roles: [],
};

const optionsRoles = [
  {
    value: Roles.admin,
    label: 'Administrator',
  },
  {
    value: Roles.operator,
    label: 'Operator',
  },
  {
    value: Roles.reporter,
    label: 'Reporting',
  },
];

type Props = {
  open: boolean;
  editedData: UserList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: UserList) => void;
  onClosePopup: () => void;
};

const PopupFormAddUser = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const formik = useFormik<UserList>({
    initialValues: initUserInput,
    validate: values => {
      const errors = {
        roles: '',
      };
      if (values.roles.length < 1) {
        errors.roles = 'Required !';
      }
      return errors.roles !== '' ? errors : {};
    },
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
      title={editedData ? `Edit User` : `Create User`}
      onClose={() => onClosePopup()}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="username"
              label="Username"
              formInput={true}
              placeholder="Enter Username"
              value={formik.values.username}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              onChange={val => handleInput(val, 'username')}
            />
            {formik.errors.username && formik.touched.username ? (
              <Typography sx={styles.textError}>
                {formik.errors.username}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="fullname"
              label="Fullname"
              formInput={true}
              placeholder="Enter Fullname"
              value={formik.values.fullname}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              onChange={val => handleInput(val, 'fullname')}
            />
            {formik.errors.fullname && formik.touched.fullname ? (
              <Typography sx={styles.textError}>
                {formik.errors.fullname}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="extid"
              label="Ext Id"
              formInput={true}
              placeholder="Enter Ext Id"
              value={formik.values.extid}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.touched.extid && Boolean(formik.errors.extid)}
              onChange={val => handleInput(val, 'extid')}
            />
            {formik.errors.extid && formik.touched.extid ? (
              <Typography sx={styles.textError}>
                {formik.errors.extid}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="roles"
              label="Roles"
              isMultipleSelect={true}
              options={optionsRoles}
              isFormInput={true}
              value={formik.values.roles}
              onBlur={formik.handleBlur}
              error={formik.touched.roles && Boolean(formik.errors.roles)}
              onChange={e => handleInput(e, 'roles')}
            />
            {formik.errors.roles && formik.touched.roles ? (
              <Typography sx={styles.textError}>
                {formik.errors.roles}
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

export default PopupFormAddUser;
