'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { JingleVideoInput } from '@/types/molecules/JingleVideo';
import { toRem } from '@/helpers/globalFunctions';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const initJingleVideoInput: JingleVideoInput = {
  name: '',
  type: '',
  video: '',
  image: '',
  audio: '',
  status: 'notactive',
};

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: JingleVideoInput) => void;
  onClosePopup: () => void;
};

const optionsJingleType = [
  {
    value: 'video',
    label: 'Video',
  },
  {
    value: 'imageAudio',
    label: 'Image + Audio',
  },
];

const optionsStatus = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'notactive',
    label: 'Not Active',
  },
];

const PopupFormAddJingleVideo = ({ open, onSubmited, onClosePopup }: Props) => {
  const [jingleVideoInput, setJingleVideoInput] =
    useState<JingleVideoInput>(initJingleVideoInput);

  const handleInput = (value: string, name: string) => {
    setJingleVideoInput((prevState: JingleVideoInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: string, name: string) => {
    setJingleVideoInput((prevState: JingleVideoInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setJingleVideoInput({ ...initJingleVideoInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...jingleVideoInput });
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={'Create Video Jingle'}
      onClose={() => onClosePopup()}
    >
      <>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="name"
              label="Enter Name"
              formInput={true}
              placeholder="Name"
              value={jingleVideoInput.name}
              variant="outlined"
              onChange={val => handleInput(val, 'name')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="type"
              label="Jingle Type"
              options={optionsJingleType}
              isFormInput={true}
              value={jingleVideoInput.type}
              onChange={val => handleSelect(val, 'type')}
              sx={{ margin: 0 }}
            />
          </Grid>
          {jingleVideoInput.type === 'video' && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextInput
                id="video"
                label="Enter Video Url"
                formInput={true}
                placeholder="Video Url"
                value={jingleVideoInput.video}
                variant="outlined"
                onChange={val => handleInput(val, 'video')}
              />
            </Grid>
          )}
          {jingleVideoInput.type === 'imageAudio' && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextInput
                  id="image"
                  label="Enter Image Url"
                  formInput={true}
                  placeholder="Image Url"
                  value={jingleVideoInput.image}
                  variant="outlined"
                  onChange={val => handleInput(val, 'image')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextInput
                  id="video"
                  label="Enter Audio Url"
                  formInput={true}
                  placeholder="Audio Url"
                  value={jingleVideoInput.audio}
                  variant="outlined"
                  onChange={val => handleInput(val, 'audio')}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="status"
              label="Status"
              options={optionsStatus}
              isFormInput={true}
              value={jingleVideoInput.status}
              onChange={val => handleSelect(val, 'status')}
              sx={{ margin: 0 }}
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

export default PopupFormAddJingleVideo;
