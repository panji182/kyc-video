'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { VideoJingleList } from '@/types/api/VideoJingle';
import { toRem } from '@/helpers/globalFunctions';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const initVideoJingleInput: VideoJingleList = {
  id: '',
  jinglename: '',
  jingletype: '',
  urlvideo: '',
  urlaudio: '',
  urlimage: '',
};

type Props = {
  open: boolean;
  editedData: VideoJingleList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: VideoJingleList) => void;
  onClosePopup: () => void;
};

const optionsJingleType = [
  {
    value: 'video',
    label: 'Video',
  },
  {
    value: 'imageaudio',
    label: 'Image + Audio',
  },
];

const PopupFormAddVideoJingle = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const [videoJingleInput, setVideoJingleInput] =
    useState<VideoJingleList>(initVideoJingleInput);

  useEffect(() => {
    if (editedData) {
      setVideoJingleInput(editedData);
    } else {
      setVideoJingleInput(initVideoJingleInput);
    }
  }, [editedData]);

  const handleInput = (value: string, name: string) => {
    setVideoJingleInput((prevState: VideoJingleList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: string, name: string) => {
    setVideoJingleInput((prevState: VideoJingleList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setVideoJingleInput({ ...initVideoJingleInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...videoJingleInput });
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
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="id"
              label="Enter Id"
              formInput={true}
              placeholder="Id"
              value={videoJingleInput.id}
              variant="outlined"
              onChange={val => handleInput(val, 'id')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="jinglename"
              label="Enter Jingle Name"
              formInput={true}
              placeholder="Jingle Name"
              value={videoJingleInput.jinglename}
              variant="outlined"
              onChange={val => handleInput(val, 'jinglename')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="jingletype"
              label="Enter Jingle Type"
              options={optionsJingleType}
              isFormInput={true}
              value={videoJingleInput.jingletype}
              onChange={val => handleSelect(val, 'jingletype')}
              sx={{ margin: 0 }}
            />
          </Grid>
          {videoJingleInput.jingletype === 'video' && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextInput
                id="video"
                label="Enter Video Url"
                formInput={true}
                placeholder="Video Url"
                value={videoJingleInput.urlvideo}
                variant="outlined"
                onChange={val => handleInput(val, 'urlvideo')}
              />
            </Grid>
          )}
          {videoJingleInput.jingletype === 'imageaudio' && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextInput
                  id="image"
                  label="Enter Image Url"
                  formInput={true}
                  placeholder="Image Url"
                  value={videoJingleInput.urlimage}
                  variant="outlined"
                  onChange={val => handleInput(val, 'urlimage')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextInput
                  id="audio"
                  label="Enter Audio Url"
                  formInput={true}
                  placeholder="Audio Url"
                  value={videoJingleInput.urlaudio}
                  variant="outlined"
                  onChange={val => handleInput(val, 'urlaudio')}
                />
              </Grid>
            </>
          )}
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

export default PopupFormAddVideoJingle;
