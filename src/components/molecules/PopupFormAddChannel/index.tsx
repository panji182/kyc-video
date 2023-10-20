'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { ChannelList } from '@/types/api/Channel';
import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));

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
  const [channelInput, setChannelInput] =
    useState<ChannelList>(initChannelInput);

  useEffect(() => {
    if (editedData) {
      setChannelInput(editedData);
    } else {
      setChannelInput(initChannelInput);
    }
  }, [editedData]);

  const handleInput = (value: string, name: string) => {
    setChannelInput((prevState: ChannelList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setChannelInput({ ...initChannelInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...channelInput });
    handleClear();
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit Channel` : `Create Channel`}
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
              value={channelInput.id}
              variant="outlined"
              onChange={val => handleInput(val, 'id')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="channel"
              label="Channel"
              formInput={true}
              placeholder="Enter Channel"
              value={channelInput.channel}
              variant="outlined"
              onChange={val => handleInput(val, 'channel')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="name"
              label="Name"
              formInput={true}
              placeholder="Enter Name"
              value={channelInput.name}
              variant="outlined"
              onChange={val => handleInput(val, 'name')}
            />
          </Grid>
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

export default PopupFormAddChannel;
