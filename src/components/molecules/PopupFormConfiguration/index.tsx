'use client';

import React, { useEffect, useContext } from 'react';
import { updatedDataContext } from '@/components/template/ServerConfigurationPage';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { toRem } from '@/helpers/globalFunctions';
import { ServerConfiguration } from '@/types/template/ServerConfiguration';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const validationSchema = yup.object({
  section: yup.string().max(30, 'Too Long!').required('Required !'),
  key: yup.string().max(30, 'Too Long!').required('Required !'),
});

const initServerConfigInput: ServerConfiguration = {
  section: '',
  key: '',
  value: '',
};

type Props = {
  open: boolean;
  mode: string;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: ServerConfiguration) => void;
  onClosePopup: () => void;
};

const PopupFormConfiguration = ({
  open,
  mode,
  onSubmited,
  onClosePopup,
}: Props) => {
  // const [serverConfigInput, setServerConfigInput] =
  //   useState<ServerConfiguration>(initServerConfigInput);
  const { editedData } = useContext(updatedDataContext);

  const formik = useFormik<ServerConfiguration>({
    initialValues: initServerConfigInput,
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmited({ ...values });
      onClosePopup();
      formik.resetForm();
    },
  });

  useEffect(() => {
    mode === 'Edit' &&
      Object.keys(editedData).length > 0 &&
      editedData.section &&
      formik.setValues({
        section: editedData.section,
        key: editedData.key,
        value: editedData.value,
      });
    // setServerConfigInput({
    //   section: editedData.section,
    //   key: editedData.key,
    //   value: editedData.value,
    // });
    mode === 'New' && formik.setValues({ ...initServerConfigInput });
  }, [mode, editedData]);

  // const handleServerConfigInput = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { value, name } = e.target;

  //   setServerConfigInput((prevState: ServerConfiguration) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleCancel = () => {
    onClosePopup();
  };

  // const handleSubmit = () => {};

  return (
    <Modal
      open={open}
      title={mode}
      onClose={() => onClosePopup()}
      sx={{
        '&.MuiModal-root>.MuiBox-root': {
          width: toRem(350),
          maxHeight: '77vh',
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={styles.wrapBottomSpace}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl sx={styles.fullWidth}>
              <FormLabel
                id="section"
                sx={{ ...styles.bottomSpace, ...styles.fontBold }}
              >
                Section*
              </FormLabel>
              <TextField
                id="section"
                name="section"
                fullWidth
                value={formik.values.section}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.section && Boolean(formik.errors.section)}
                // onChange={e => handleServerConfigInput(e)}
              />
              {formik.errors.section && formik.touched.section ? (
                <Typography sx={styles.textError}>
                  {formik.errors.section}
                </Typography>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl sx={styles.fullWidth}>
              <FormLabel
                id="key"
                sx={{ ...styles.bottomSpace, ...styles.fontBold }}
              >
                Key*
              </FormLabel>
              <TextField
                id="key"
                name="key"
                fullWidth
                value={formik.values.key}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.key && Boolean(formik.errors.key)}
                // onChange={e => handleServerConfigInput(e)}
              />
              {formik.errors.key && formik.touched.key ? (
                <Typography sx={styles.textError}>
                  {formik.errors.key}
                </Typography>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl sx={styles.fullWidth}>
              <FormLabel
                id="value"
                sx={{ ...styles.bottomSpace, ...styles.fontBold }}
              >
                Value
              </FormLabel>
              <TextField
                id="value"
                name="value"
                fullWidth
                value={formik.values.value}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // onChange={e => handleServerConfigInput(e)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <ButtonComp
            label="Cancel"
            variant="contained"
            color="error"
            onClick={handleCancel}
          />
          <ButtonComp
            label="OK"
            type="submit"
            variant="contained"
            // onClick={handleSubmit}
          />
        </Stack>
      </form>
    </Modal>
  );
};

export default PopupFormConfiguration;
