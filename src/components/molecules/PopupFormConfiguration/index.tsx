'use client';

import React, { useState, useEffect, useContext } from 'react';
import { updatedDataContext } from '@/components/template/ServerConfigurationPage';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';

import { toRem } from '@/helpers/globalFunctions';
import { ServerConfiguration } from '@/types/template/ServerConfiguration';

import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

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
  const [serverConfigInput, setServerConfigInput] =
    useState<ServerConfiguration>(initServerConfigInput);
  const { editedData } = useContext(updatedDataContext);

  useEffect(() => {
    mode === 'Edit' &&
      Object.keys(editedData).length > 0 &&
      editedData.section &&
      setServerConfigInput({
        section: editedData.section,
        key: editedData.key,
        value: editedData.value,
      });
    mode === 'New' && setServerConfigInput({ ...initServerConfigInput });
  }, [mode, editedData]);

  const handleServerConfigInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setServerConfigInput((prevState: ServerConfiguration) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    onClosePopup();
  };

  const handleSubmit = () => {
    onSubmited({ ...serverConfigInput });
    onClosePopup();
  };

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
      <>
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
                value={serverConfigInput.section}
                variant="outlined"
                onChange={e => handleServerConfigInput(e)}
              />
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
                value={serverConfigInput.key}
                variant="outlined"
                onChange={e => handleServerConfigInput(e)}
              />
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
                value={serverConfigInput.value}
                variant="outlined"
                onChange={e => handleServerConfigInput(e)}
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
          <ButtonComp label="OK" variant="contained" onClick={handleSubmit} />
        </Stack>
      </>
    </Modal>
  );
};

export default PopupFormConfiguration;
